import requests
import pandas as pd
import datetime

station_id = 'S116'


def get_rainfall_features(station_id, date=None):
    api = 'https://api.data.gov.sg/v1/environment/rainfall'
    if date is None:
        yesterday = datetime.date.today() - datetime.timedelta(days=1)
        request_string = api + '?date=' + yesterday.strftime('%Y-%m-%d')
    else:
        request_string = api + '?date=' + date

    # Get data from api.
    r = requests.get(request_string)
    if r.status_code == 200:
        data = r.json()

    def get_reading(readings, station_id):
        for r in readings:
            if r['station_id'] == station_id:
                return r['value']
        return float('NaN')

    # Construct dataframe.
    timestamps = [x['timestamp'] for x in data['items']]
    rainfalls = [get_reading(x['readings'], station_id) for x in data['items']]
    df = pd.DataFrame()
    df['timestamp'] = pd.to_datetime(timestamps)
    df['rainfall'] = rainfalls
    df['rainfall'] = df['rainfall'].fillna(0)

    rainfalls_30m = []
    rainfalls_60m = []
    rainfalls_120m = []
    for i, row in df.iterrows():
        if row['rainfall'] > 0:
            t1 = row['timestamp']
            t2 = t1 + datetime.timedelta(seconds=1799)
            rainfalls_30m.append(sum(df['rainfall'][(df['timestamp'] >= t1) & (df['timestamp'] <= t2)]))
            t2 = t1 + datetime.timedelta(seconds=3599)
            rainfalls_60m.append(sum(df['rainfall'][(df['timestamp'] >= t1) & (df['timestamp'] <= t2)]))
            t2 = t1 + datetime.timedelta(seconds=7199)
            rainfalls_120m.append(sum(df['rainfall'][(df['timestamp'] >= t1) & (df['timestamp'] <= t2)]))

    if df['rainfall'].sum() == 0:
        rainfall_features = {
            'daily_rainfall_total_mm': 0,
            'highest_30_min_rainfall_mm': 0,
            'highest_60_min_rainfall_mm': 0,
            'highest_120_min_rainfall_mm': 0
        }
    else:
        rainfall_features = {
            'daily_rainfall_total_mm': round(df['rainfall'].sum(), 1),
            'highest_30_min_rainfall_mm': round(max(rainfalls_30m), 1),
            'highest_60_min_rainfall_mm': round(max(rainfalls_60m), 1),
            'highest_120_min_rainfall_mm': round(max(rainfalls_120m), 1)
        }
    return rainfall_features


def get_temperature_features(station_id, date=None):
    api = 'https://api.data.gov.sg/v1/environment/air-temperature'
    if date is None:
        yesterday = datetime.date.today() - datetime.timedelta(days=1)
        request_string = api + '?date=' + yesterday.strftime('%Y-%m-%d')
    else:
        request_string = api + '?date=' + date

    # Get data from api.
    r = requests.get(request_string)
    if r.status_code == 200:
        data = r.json()

    def get_reading(readings, station_id):
        for r in readings:
            if r['station_id'] == station_id:
                return r['value']
        return float('NaN')

    timestamps = [x['timestamp'] for x in data['items']]
    temperatures = [get_reading(x['readings'], station_id) for x in data['items']]
    df = pd.DataFrame()
    df['timestamp'] = pd.to_datetime(timestamps)
    df['temperature'] = temperatures
    # Some timestamps are missing, so the data has to be resampled.
    df = df.resample('1T', on='timestamp').mean()
    df = (df.ffill()+df.bfill())/2
    df = df.bfill().ffill()

    temperature_features = {
        'mean_temperature_c': round(df['temperature'].mean(), 1),
        'maximum_temperature_c': round(df['temperature'].max(), 1),
        'minimum_temperature_c': round(df['temperature'].min(), 1)
    }
    return temperature_features


def get_windspeed_features(station_id, date=None):
    api = 'https://api.data.gov.sg/v1/environment/wind-speed'
    if date is None:
        yesterday = datetime.date.today() - datetime.timedelta(days=1)
        request_string = api + '?date=' + yesterday.strftime('%Y-%m-%d')
    else:
        request_string = api + '?date=' + date

    # Get data from api.
    r = requests.get(request_string)
    if r.status_code == 200:
        data = r.json()

    def get_reading(readings, station_id):
        for r in readings:
            if r['station_id'] == station_id:
                return r['value']
        return float('NaN')

    timestamps = [x['timestamp'] for x in data['items']]
    windspeeds = [get_reading(x['readings'], station_id) for x in data['items']]
    df = pd.DataFrame()
    df['timestamp'] = pd.to_datetime(timestamps)
    df['windspeed'] = windspeeds
    # Some timestamps are missing, so the data has to be resampled.
    df = df.resample('1T', on='timestamp').mean()
    df = (df.ffill()+df.bfill())/2
    df = df.bfill().ffill()

    windspeed_features = {
        'mean_wind_speed_kmh': round(df['windspeed'].mean()*1.35, 1),
        'max_wind_speed_kmh': round(df['windspeed'].max()*1.85, 1)
    }
    return windspeed_features


def convert_api_json_to_dict(station_id, date=None):
    if date is None:
        date = datetime.date.today() - datetime.timedelta(days=1)
        location_and_date = {
            'station': 'Pasir Panjang',
            'year': date.year,
            'month': date.month,
            'day': date.day
        }
    else:
        date_obj = datetime.date(int(date[:4]), int(date[5:7]), int(date[8:]))
        location_and_date = {
            'station': 'Pasir Panjang',
            'year': date_obj.year,
            'month': date_obj.month,
            'day': date_obj.day
        }
    feature_dict = {
        **location_and_date,
        **get_rainfall_features(station_id, date),
        **get_temperature_features(station_id, date),
        **get_windspeed_features(station_id, date)
    }
    return feature_dict


def get_prediction_dataframe(station_id):
    # Define the arguments needed to use convert_api_json_to_dict api.
    format = '%Y-%m-%d'
    yesterday = datetime.date.today() - datetime.timedelta(days=1)
    yesterday = yesterday.strftime(format)
    two_days_before = datetime.date.today() - datetime.timedelta(days=2)
    two_days_before = two_days_before.strftime(format)
    three_days_before = datetime.date.today() - datetime.timedelta(days=3)
    three_days_before = three_days_before.strftime(format)

    # Convert the dict such that the columns will be read as DataFrame columns
    # and the values as a single row.
    dic1 = {x: [y] for x, y in convert_api_json_to_dict(station_id, three_days_before).items()}
    dic2 = {x: [y] for x, y in convert_api_json_to_dict(station_id, two_days_before).items()}
    dic3 = {x: [y] for x, y in convert_api_json_to_dict(station_id, yesterday).items()}

    # Joins data from 3 previous days together.
    df = pd.DataFrame(dic1)
    df = pd.concat([df, pd.DataFrame(dic2)], axis=0, join='inner', ignore_index=True)
    df = pd.concat([df, pd.DataFrame(dic3)], axis=0, join='inner', ignore_index=True)

    # Feature engineering for the model.
    df['rained_today'] = [0 if x < 0.2 else 1 for x in df['daily_rainfall_total_mm']]
    df['rained_in_three_days'] = df['rained_today'] + df['rained_today'].shift(1) + df['rained_today'].shift(2)
    df = df.dropna().reset_index(drop=True)

    return df


def get_prediction(df, model_path='./models/model_next_next_day_rainfall.sav'):
    import pickle
    import datetime
    import json

    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    features = ['month', 'day', 'rained_today', 'highest_30_min_rainfall_mm',
                'highest_60_min_rainfall_mm', 'highest_120_min_rainfall_mm',
                'mean_temperature_c', 'maximum_temperature_c', 'minimum_temperature_c',
                'mean_wind_speed_kmh', 'max_wind_speed_kmh',
                'rained_in_three_days']
    X = df[features]
    y_pred = model.predict(X)
    y_prob = model.predict_proba(X)

    format = '%Y-%m-%d'
    date_obj = datetime.date(df['year'][0], df['month'][0], df['day'][0])
    forecast_date = date_obj + datetime.timedelta(days=2)
    forecast_date = forecast_date.strftime(format)

    output = {
        'date': forecast_date,
        'station': df['station'][0],
        'prediction': y_pred[0],
        'probability': y_prob[0].max()
        }

    cache_path = './models/output.json'
    with open(cache_path, 'w') as f:
        json.dump(output, f)

    return output
