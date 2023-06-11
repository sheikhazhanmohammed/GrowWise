FROM python:${PYTHON_TAG:-3.8.10-buster}
LABEL Maintainer="destroyEverythingOnProductionServer"

RUN apt-get update
RUN apt-get install libopenblas-dev -y
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt install -y libopencv-dev python3-opencv
RUN apt-get update \
        && apt-get -y install libpq-dev gcc \
        && pip install psycopg2

RUN apt-get -y install curl
RUN apt-get install libgomp1
RUN python -m pip install --upgrade pip
RUN apt update && apt install -y --no-install-recommends \
            libgdal-dev \
            g++ \
            gcc && \
            pip install numpy==1.18.1 && \
            pip install gdal==2.4.0 && \
            apt remove -y gcc g++ && \
            rm -rf /var/lib/apt/lists/*

RUN pip3 install rasterio shapely fastapi uvicorn

WORKDIR /app

COPY . .

CMD [ "python3", "app.py" ]