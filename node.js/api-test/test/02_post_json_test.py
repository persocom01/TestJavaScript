# Demonstrates how to send json messages with the request body.
json = {
    'string': 'string data',
    'bool': 'no',
    'int': 1.5,
    'direction': 'n'
    }

domain = 'http://localhost:3000'
path = f'{domain}/json'


def send_request(path, post=False, **kwargs):
    import requests
    if post:
        try:
            request = requests.post(path, **kwargs)
        except requests.exceptions.ConnectionError as e:
            print('http(s) request failed, perhaps try the other...')
            raise e
    else:
        try:
            request = requests.get(path, **kwargs)
        except requests.exceptions.ConnectionError as e:
            print('http(s) request failed, perhaps try the other...')
            raise e
    return request


r = send_request(path, post=True, json=json, verify=False)
if r.status_code == 200:
    print(r.json())
else:
    print('request code: ' + str(r.status_code))
