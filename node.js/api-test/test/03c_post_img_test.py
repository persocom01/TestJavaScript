# Demonstrates how to send files with the request body.
from requests_toolbelt import MultipartEncoder
import os

filepath = './node.js/api-test/test/test_img.jpg'
savepath = './node.js/api-test/temp/test_img.jpg'
domain = 'localhost:3000'
path = f'{domain}/temp?type=image'


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
    # print(r.json())
    with open(savepath, 'wb') as f:
        f.write(r.content)
else:
    print('request code: ' + str(r.status_code))
