FROM nikolaik/python-nodejs:python3.8-nodejs12

WORKDIR /app

COPY package.json /app

RUN pip install tensorflowjs

RUN npm i
