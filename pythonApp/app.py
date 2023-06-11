import requests
import json
import rasterio as rio
from rasterio.mask import mask
from shapely.geometry import Polygon
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set the appropriate allowed origins here
    allow_methods=["*"],  # Set the appropriate allowed methods here
    allow_headers=["*"],  # Set the appropriate allowed headers here
)


@app.post("/analyse")
async def handle_post_request(payload: dict):
    data = payload
    polygon = Polygon(data["AOI"]["geometry"]["coordinates"][0])
    lat = data["AOI"]["geometry"]["coordinates"][0][0][0]
    lon = data["AOI"]["geometry"]["coordinates"][0][0][1]
    API_KEY = "API KEY"
    weatherurl = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}"
    chatgpturl = "https://free.churchless.tech/v1/chat/completions"
    weatherdata = requests.get(weatherurl).json()
    
    with rio.open("./hack_s2/stacked.tif") as src:
        croppedimage, _ = mask(src, [polygon], crop=True, nodata=-999)
        ndmi = []
        for i in range(0, croppedimage[0].shape[0]):
            for j in range(0, croppedimage[0].shape[1]):
                if croppedimage[0][i][j] == -999:
                    continue
                else:
                    n = (croppedimage[7][i][j]-croppedimage[9][i][j])/(croppedimage[7][i][j]+croppedimage[9][i][j])
                    ndmi.append(n)

    ndmi = sum(ndmi)/len(ndmi)

    with rio.open("./hack_s2/stacked.tif") as src:
        croppedimage, _ = mask(src, [polygon], crop=True, nodata=-999)
        ndsi = []
        for i in range(0, croppedimage[0].shape[0]):
            for j in range(0, croppedimage[0].shape[1]):
                if croppedimage[0][i][j] == -999:
                    continue
                else:
                    n = (croppedimage[2][i][j]-croppedimage[9][i][j])/(croppedimage[2][i][j]+croppedimage[9][i][j])
                    ndsi.append(n)

    ndsi = sum(ndsi)/len(ndsi)

    with rio.open("./hack_s2/stacked.tif") as src:
        croppedimage, _ = mask(src, [polygon], crop=True, nodata=-999)
        bsi = []
        for i in range(0, croppedimage[0].shape[0]):
            for j in range(0, croppedimage[0].shape[1]):
                if croppedimage[0][i][j] == -999:
                    continue
                else:
                    n = ((croppedimage[9][i][j]+croppedimage[3][i][j])-(croppedimage[7][i][j]+croppedimage[1][i][j]))/(((croppedimage[9][i][j]+croppedimage[3][i][j])+(croppedimage[7][i][j]+croppedimage[1][i][j])))
                    bsi.append(n)

    bsi = sum(bsi)/len(bsi)

    with rio.open("./hack_s2/stacked.tif") as src:
        croppedimage, _ = mask(src, [polygon], crop=True, nodata=-999)
        ci = []
        for i in range(0, croppedimage[0].shape[0]):
            for j in range(0, croppedimage[0].shape[1]):
                if croppedimage[0][i][j] == -999:
                    continue
                else:
                    n = (croppedimage[9][i][j]-croppedimage[6][i][j])/(croppedimage[9][i][j]+croppedimage[6][i][j])
                    ci.append(n)

    ci = sum(ci)/len(ci)

    prompt = "the ndmi of my soil is " + str(ndmi) + ", the ndsi is " + str(ndsi) + ", the bare soil index is " + str(bsi) + ", temperature is " + str(weatherdata["main"]["temp"]) + "in kelvin, humidity is " + str(weatherdata["main"]["humidity"]) + ", which crop should i grow?. Respond in json format only like first parent key SuitableCrops having keys cropName, products, startMonth, endMonth,farmingTechnique, shelfLife. Second key is UnsuitableCrops with keys cropName and reason. Reason should be justified with values and products should be which products (list) are required to make the soil more fertile and better yield"

    payload = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": prompt}]}

    headers = {"Content-Type": "application/json"}

    response = requests.post(chatgpturl, data=json.dumps(payload), headers=headers)

    chatgptresponse = response.json()
    chatgptresponse = str(chatgptresponse["choices"][0]["message"]["content"])
    chatgptresponse = chatgptresponse.replace('\n', '')
    chatgptresponse = json.loads(chatgptresponse)

    return {"ndmi": ndmi,
            "ndsi": ndsi,
            "bsi": bsi,
            "ci": ci,
            "result": chatgptresponse}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)