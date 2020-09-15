import json
from sqlalchemy import create_engine
import pandas as pd

cfg_path = './WeatherForecast/sql_server.cfg'

with open(cfg_path, 'r') as f:
    cfg = json.load(f)

db = cfg['db']
tablename = cfg['tablename']
engine_string = 'mysql+pymysql://' + cfg['user'] + ':' + cfg['pw'] + '@' + cfg['url'] + '/' + db
engine = create_engine(engine_string)

command = '''
SELECT *
FROM s116
;
'''

df = pd.read_sql_query(command, engine)
df.to_csv('./WeatherForecast/weather.csv', index=False)
