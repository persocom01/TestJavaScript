# Demonstrates how to send files with the request body.
from requests_toolbelt import MultipartEncoder
import os

filepath = './node.js/api-test/test/upload.txt'
domain = 'http://localhost:3000'
path = f'{domain}/temp'


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


with open(filepath, 'rb') as f:
    # filename affects the filename attribute of the uploaded file. You can
    # name it anything, but we use the original filename for convenience.
    filename = os.path.basename(f.name)
    encoder = MultipartEncoder({'file': (filename, f)})
    # We use MultipartEncoder here because it is superior to how requests
    # handles a multipart encoded file. For smaller files the following code
    # is sufficient:
    # files = {'file': (filename, f, 'multipart/form-data')}
    # r = send_request(path, post=True, files=files, verify=False)
    r = send_request(path, post=True, data=encoder, headers={'Content-Type': encoder.content_type}, verify=False)

if r.status_code == 200:
    # print(r.json())
    print(r.content)
else:
    print('request code: ' + str(r.status_code))
