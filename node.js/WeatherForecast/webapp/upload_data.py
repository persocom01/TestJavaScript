import json
from sqlalchemy import create_engine
from sqlalchemy.exc import InternalError
from sqlalchemy.exc import IntegrityError
import re
import csv
import os
import pandas as pd

# Change the paths and sql_server.cfg to adjust this code.
cfg_path = '../sql_server.cfg'
file = './tmp/csv_file.csv'

with open(cfg_path, 'r') as f:
    cfg = json.load(f)

db = cfg['db']
tablename = cfg['tablename']
engine_string = 'mysql+pymysql://' + cfg['user'] + ':' + cfg['pw'] + '@' + cfg['url'] + '/' + db
engine = create_engine(engine_string)
con = engine.connect()

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


# Inserts data from a csv file individually so as to be error tolerant by
# skipping rows with invalid values.
def individual_insert(file, updatekey=None, **kwargs):
    df = pd.read_csv(file, **kwargs)
    rows = [x for x in df.itertuples(index=False, name=None)]
    cols = ', '.join(df.columns)
    tab = '  '
    i = 0
    for r in rows:
        command = f'INSERT INTO {tablename}({cols}) VALUES '
        # Fix null values.
        pattern = r"([^\w'])nan([^\w'])"
        replacement = r'\1NULL\2'
        fixed_r = re.sub(pattern, replacement, f'{r}')
        command += f'{fixed_r}\n'
        if updatekey:
            command += f'ON DUPLICATE KEY UPDATE\n{tab}'
            for c in df.columns:
                if c not in updatekey:
                    command += f'{c}=VALUES({c})\n{tab},'
            command = command[:-(3)] + ';\n'
        try:
            con.execute(command)
        except (InternalError, IntegrityError):
            i += 1
            continue
    return i


# Cleans headers and uploads file to database.
csv_clean_colnames(file)
i = individual_insert(file, updatekey=['year', 'month', 'day'], encoding='cp1252')

print(f'file uploaded, {i} row(s) failed to upload')
