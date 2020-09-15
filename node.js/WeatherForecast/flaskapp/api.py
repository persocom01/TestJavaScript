from flask import Flask, Response
from flask_restful import Resource, Api, abort
from retrain_model import retrain_model
from get_prediction import get_prediction_dataframe
from get_prediction import get_prediction

app = Flask(__name__)
api = Api(app)

tasks = ['retrain', 'predict', 'refresh']


def abort_if_task_doesnt_exist(task):
    if task not in tasks:
        abort(404, message=f'{task} argument not recognized. Did you mean "predict"?')


class ModelRoute(Resource):
    def get(self, task):

        abort_if_task_doesnt_exist(task)

        if task == 'retrain':
            retrain_model()
            status_code = Response(status=201)
            return status_code

        if task == 'predict':
            import datetime
            import json
            # Check cached result before running new prediction.
            format = '%Y-%m-%d'
            predicted_date = datetime.date.today() + datetime.timedelta(days=1)
            predicted_date = predicted_date.strftime(format)
            cache_path = './models/output.json'
            with open(cache_path, 'r') as f:
                dict = json.load(f)
                if predicted_date == dict['date']:
                    return dict
                else:
                    station_id = 'S116'
                    return get_prediction(get_prediction_dataframe(station_id))

        if task == 'refresh':
            station_id = 'S116'
            return get_prediction(get_prediction_dataframe(station_id))


api.add_resource(ModelRoute, '/<string:task>')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
