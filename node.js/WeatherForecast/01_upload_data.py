import json
from sqlalchemy import create_engine
from sqlalchemy.exc import InternalError
from sqlalchemy.exc import IntegrityError
import glob
import re
import csv
import os
from pathlib import Path
import pandas as pd

# Change the paths and sql_server.cfg to adjust this code.
cfg_path = './WeatherForecast/sql_server.cfg'
file_paths = './WeatherForecast/data/train/*.csv'

with open(cfg_path, 'r') as f:
    cfg = json.load(f)

db = cfg['db']
tablename = cfg['tablename']
engine_string = 'mysql+pymysql://' + cfg['user'] + ':' + cfg['pw'] + '@' + cfg['url']
engine = create_engine(engine_string)
con = engine.connect()

# Create database.
command = f'CREATE DATABASE {db};'
con.execute(command)

engine_string = engine_string + '/' + db
engine = create_engine(engine_string)
con = engine.connect()

# Create table.
command = f'CREATE TABLE {tablename}(' + '''
    station VARCHAR(50)
    ,year INT
    ,month INT
    ,day INT
    ,daily_rainfall_total_mm DOUBLE NOT NULL
    ,highest_30_min_rainfall_mm DOUBLE NOT NULL
    ,highest_60_min_rainfall_mm DOUBLE NOT NULL
    ,highest_120_min_rainfall_mm DOUBLE NOT NULL
    ,mean_temperature_c DOUBLE NOT NULL
    ,maximum_temperature_c DOUBLE NOT NULL
    ,minimum_temperature_c DOUBLE NOT NULL
    ,mean_wind_speed_kmh DOUBLE NOT NULL
    ,max_wind_speed_kmh DOUBLE NOT NULL
    ,PRIMARY KEY(year, month, day)
);
'''
con.execute(command)


# Cleans column names for easier processing later.
def csv_clean_colnames(file, sep=''):
    '''
    Given the path to a csv file, this function cleans the column names by
    converting removing leading and trailing white spaces, converting all
    letters to lowercase, replacing all remaining whitespaces with
    underscores, removing brackets and other special characters. The csv
    file is then replaced with a copy of itself with the cleaned column
    names.

    params:
        file        path of file wholse column names are to be cleaned.
        sep         The character(s) used to replace brackets and special
                    characters.
    '''

    def remove_special_characters(text, sep=sep):
        pattern = r'[^a-zA-Z0-9!"#$%&\'()*+, -./:; <= >?@[\]^_`{|}~]'
        return re.sub(pattern, sep, text)

    # Opens the csv file and writes the cleaned version to a .tmp file.
    tempfile = file + '.tmp'
    with open(file, 'r') as infile, open(tempfile, 'w', newline='') as outfile:
        r = csv.reader(infile, delimiter=',', quotechar='"')
        colnames = next(r)
        colnames = [remove_special_characters(x.strip().lower().replace(' ', '_').replace('(', sep).replace(')', sep).replace('/', sep)) for x in colnames]

        w = csv.writer(outfile)
        w.writerow(colnames)
        for row in r:
            w.writerow(row)

    # Delete original and replace it with the cleaned file.
    os.remove(file)
    os.rename(tempfile, file)


# Inserts data from a csv file into an sql table.
def csv_insert(file, updatekey=None, tablename=None, chunksize=None, sizelim=1073741824, **kwargs):
    '''
    Convenience function that uploads file data into a premade database
    table.

    params:
        file        path of file to be uploaded.
        updatekey   given the table's primary key, the function updates all
                    values in the table with those from the file except the
                    primary key. If sqlalchemy is used, tables values are
                    updated by default, but the primary key is set using
                    this value.
        tablename   if None, tablename = filename.
        chunksize   determines the number of rows read from the csv file to
                    insert into the database at a time. This is
                    specifically meant to deal with memory issues. As such,
                    when chunksize != None and printable == True, the
                    commands will be written to chunk_insert.txt instead of
                    being returned for printing.
        sizelim     determines the file size, in bytes, before a default
                    chunksize of 100000 is imposed if chunksize is not
                    already specified.
        **kwargs    Other arguments to be passed on to pandas read_csv.
    '''
    # Automatically set chunksize if file exceeds sizelim.
    if Path(file).stat().st_size >= sizelim and chunksize is None:
        chunksize = 100000

    def alchemy_insert(df, updatekey=None, tablename=None):
        df.to_sql(tablename, engine, index=False, if_exists='append')
        if updatekey:
            command = f'ALTER TABLE {tablename} ADD PRIMARY KEY({updatekey});'
            engine.execute(command)

    if chunksize:
        reader = pd.read_csv(file, chunksize=chunksize, **kwargs)
        for chunk in reader:
            df = pd.DataFrame(chunk)
            alchemy_insert(df, updatekey=updatekey, tablename=tablename)
        return f'data loaded into table {tablename}.'

    else:
        df = pd.read_csv(file, **kwargs)
        alchemy_insert(df, updatekey=updatekey, tablename=tablename)
        return f'data loaded into table {tablename}.'


# Inserts data from a csv file individually so as to be error tolerant by
# skipping rows with invalid values.
def individual_insert(file, **kwargs):
    df = pd.read_csv(file, **kwargs)
    rows = [x for x in df.itertuples(index=False, name=None)]
    cols = ', '.join(df.columns)
    for r in rows:
        command = f'INSERT INTO {tablename}({cols}) VALUES '
        # Fix null values.
        pattern = r"([^\w'])nan([^\w'])"
        replacement = r'\1NULL\2'
        fixed_r = re.sub(pattern, replacement, f'{r}')
        command += f'{fixed_r}'
        try:
            con.execute(command)
        except (InternalError, IntegrityError):
            continue


# Repeats code to all files in a folder.
files = glob.glob(file_paths)
for file in files:
    csv_clean_colnames(file)
    try:
        csv_insert(file, updatekey=None, tablename=tablename, chunksize=None, sizelim=1073741824, encoding='cp1252')
    except (InternalError, IntegrityError):
        individual_insert(file, encoding='cp1252')
