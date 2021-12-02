from requests_toolbelt import MultipartEncoder
import os
import base64

filepath = './node.js/human-cv/test/test_image.jpg'
savepath = './node.js/human-cv/test/test_result.jpg'
domain = 'localhost:3000'


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


# Get result as json
# path = f'{domain}/file'
# with open(filepath, 'rb') as f:
#     filename = os.path.basename(f.name)
#     encoder = MultipartEncoder({'file': (filename, f)})
#     r = send_request(path, post=True, data=encoder, headers={'Content-Type': encoder.content_type}, verify=False)
# if r.status_code == 200:
#     print(r.json())
# else:
#     print('request code: ' + str(r.status_code))

# Get result as image
# path = f'{domain}/file?as=img'
# with open(filepath, 'rb') as f:
#     filename = os.path.basename(f.name)
#     encoder = MultipartEncoder({'file': (filename, f)})
#     r = send_request(path, post=True, data=encoder, headers={'Content-Type': encoder.content_type}, verify=False)
# if r.status_code == 200:
#     # print(r.text.strip('"'))
#     # print(r.json())
#     with open(savepath, 'wb') as f:
#         f.write(r.content)
# else:
#     print('request code: ' + str(r.status_code))

# Get detection result and image in the same json
path = f'{domain}/file?as=both'
with open(filepath, 'rb') as f:
    filename = os.path.basename(f.name)
    encoder = MultipartEncoder({'file': (filename, f)})
    r = send_request(path, post=True, data=encoder, headers={'Content-Type': encoder.content_type}, verify=False)
if r.status_code == 200:
    print(r.json()['result'])
    with open(savepath, 'wb') as f:
        f.write(base64.b64decode(r.json()['image']))
else:
    print('request code: ' + str(r.status_code))
