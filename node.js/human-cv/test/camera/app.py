import uvicorn
from fastapi import FastAPI
import base64

from camera import MyCamera

app = FastAPI()
myCamera = MyCamera()

commands = {
    "status": "/status",
    "takeSnapShot": "/snapshot",
    "startStream": "/start_stream",
    "stopStream": "/stop_stream",
}

@app.get("/")
def root():
    return "This is the camera api server"

@app.get("/status")
def check_status():
    return {
        "commands": commands,
        "status": myCamera.status(),
    }

@app.get("/snapshot")
def takeSnapShot():
    success, result = myCamera.getSnapshot()

    if success:
        jpg_as_text = base64.b64encode(result).decode('ascii')
        return {
            "status": 200,
            "snapshot": jpg_as_text
        }

    else:
        return {
            "status": 503,
            "errorMsg": result
        }


@app.get("/start_stream")
def startStream(returnAsJpeg: bool = False):
    success, result, data = myCamera.start_stream(returnAsJpeg)

    if success:
        return {
            "status": 200,
            "response": result,
            "data": data
        }
    else:
        return {
            "status": 503,
            "errorMsg": result
        }

@app.get("/stop_stream")
async def getWaveFile():
    success, result = myCamera.stop_stream()

    if success:
        return {
            "status": 200,
            "response": result
        }
    else:
        return {
            "status": 503,
            "errorMsg": result
        }

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5000)
