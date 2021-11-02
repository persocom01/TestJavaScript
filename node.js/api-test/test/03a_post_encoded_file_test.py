# Demonstrates how to send encoded files using io.BytesIO()files with the request body.
from requests_toolbelt import MultipartEncoder
import base64
import io

password = 'encoded file text'
filename = 'encode.txt'
domain = 'http://localhost:3000'
path = f'{domain}/_file'


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


# Convert to encoded bytes.
password = base64.urlsafe_b64encode(password.encode())
with io.BytesIO() as f:
    f.write(password)
    f.seek(0)
    encoder = MultipartEncoder({'file': (filename, f)})
    # files = {'file': (filename, f, 'multipart/form-data')}
    # r = send_request(path, post=True, files=files, verify=False)
    r = send_request(path, post=True, data=encoder, headers={'Content-Type': encoder.content_type}, verify=False)

if r.status_code == 200:
    print(r.text.strip('"'))
else:
    print('request code: ' + str(r.status_code))
