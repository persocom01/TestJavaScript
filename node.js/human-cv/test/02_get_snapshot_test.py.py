import base64

domain = 'http://localhost:3000'
savepath = './node.js/human-cv/test/test_result.jpg'


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


# Get detection result
path = f'{domain}/detect'
r = send_request(path, verify=False)
if r.status_code == 200:
    print(r.json())
else:
    print('request code: ' + str(r.status_code))

# Get detection result as image
# path = f'{domain}/detect?as=img'
# r = send_request(path, verify=False)
# if r.status_code == 200:
#     with open(savepath, 'wb') as f:
#         f.write(r.content)
# else:
#     print('request code: ' + str(r.status_code))

# Get detection result and image in the same json
# path = f'{domain}/detect?as=both'
# r = send_request(path, verify=False)
# if r.status_code == 200:
#     print(r.json()['result'])
#     with open(savepath, 'wb') as f:
#         f.write(base64.b64decode(r.json()['image']))
# else:
#     print('request code: ' + str(r.status_code))
