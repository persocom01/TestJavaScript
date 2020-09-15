def retrain_model():
    import json
    from sqlalchemy import create_engine
    import pandas as pd
    from sklearn.model_selection import train_test_split
    from sklearn.ensemble import RandomForestClassifier
    import pickle

    cfg_path = '../sql_server.cfg'

    with open(cfg_path, 'r') as f:
        cfg = json.load(f)
    db = cfg['db']
    tablename = cfg['tablename']
    engine_string = 'mysql+pymysql://' + cfg['user'] + ':' + cfg['pw'] + '@' + cfg['url'] + '/' + db
    engine = create_engine(engine_string)

    command = f'SELECT * FROM {tablename};'
    df = pd.read_sql_query(command, engine)

    # Drop irrelevant columns
    df = df.drop(['station', 'year'], axis=1)
    # Fill in any null values.
    df = (df.ffill()+df.bfill())/2
    df = df.bfill().ffill()
    # Feature engineering. Note that it is here that whether it has rained is
    # reduced to a binary variable where 1 indicates rain and 0 no rain.
    df['rained_today'] = [0 if x < 0.2 else 1 for x in df['daily_rainfall_total_mm']]
    df['rained_in_three_days'] = df['rained_today'] + df['rained_today'].shift(1) + df['rained_today'].shift(2)
    df['rained_next_next_day'] = df['rained_today'].shift(-2)
    # Drop nan values due to shift.
    df = df.dropna()

    features = ['month', 'day', 'rained_today', 'highest_30_min_rainfall_mm',
                'highest_60_min_rainfall_mm', 'highest_120_min_rainfall_mm',
                'mean_temperature_c', 'maximum_temperature_c', 'minimum_temperature_c',
                'mean_wind_speed_kmh', 'max_wind_speed_kmh',
                'rained_in_three_days']
    target = 'rained_next_next_day'
    X = df[features]
    y = df[target].values
    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y)
    rf = RandomForestClassifier()
    rf.fit(X_train, y_train)
    model_path = r'./models/model_next_next_day_rainfall.sav'
    pickle.dump(rf, open(model_path, 'wb'))

    return 'model retrained'
