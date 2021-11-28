domain = 'http://localhost:3000'
path = f'{domain}/snapshot?as=raw'
# path = f'{domain}/start_detect?interval=2'
# path = f'{domain}/file'
savepath = './node.js/human-cv/temp/test_image.jpg'


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


r = send_request(path, verify=False)
if r.status_code == 200:
    # print(r.text.strip('"'))
    # print(r.json())
    with open(savepath, 'wb') as f:
        f.write(r.content)
else:
    print('request code: ' + str(r.status_code))
