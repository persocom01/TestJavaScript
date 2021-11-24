domain = 'http://localhost:3000'
# path = f'{domain}/snapshot'
# savepath = './node.js/camera/test/test_img.jpg'
path = f'{domain}/stop_rec'
# path = f'{domain}/start_rec?time=2'
savepath = './node.js/camera/test/test_video.webm'


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
    with open(savepath, 'wb') as f:
        f.write(r.content)
else:
    print('request code: ' + str(r.status_code))
