# Demonstrates how to send files with the request body.
from requests_toolbelt import MultipartEncoder
import os
import json

filepath = './node.js/human-cv/test/test.jpg'
domain = 'localhost:3000'
path = f'{domain}/from_file'


def send_request(path, post=False, **kwargs):
    import requests
    http = f'http://{path}'
    https = f'https://{path}'
    if post:
        try:
            request = requests.post(http, **kwargs)
        except requests.exceptions.ConnectionError:
            print('http request failed, trying https...')
            request = requests.post(https, **kwargs)
    else:
        try:
            request = requests.get(http, **kwargs)
        except requests.exceptions.ConnectionError:
            print('http request failed, trying https...')
            request = requests.get(https, **kwargs)
    return request


with open(filepath, 'rb') as f:
    filename = os.path.basename(f.name)
    encoder = MultipartEncoder({'file': (filename, f)})
    r = send_request(path, post=True, data=encoder, headers={'Content-Type': encoder.content_type}, verify=False)


if r.status_code == 200:
    # print(r.text.strip('"'))
    print(r.json())
    dic = r.json()
    with open('./node.js/human-cv/temp/temp.json', 'w') as f:
        json.dump(dic, f, sort_keys=True, indent=4, ensure_ascii=False)
else:
    print('request code: ' + str(r.status_code))
