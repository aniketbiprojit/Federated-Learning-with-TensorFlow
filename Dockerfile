FROM nikolaik/python-nodejs:python3.8-nodejs12

WORKDIR /app

COPY requirements.txt /app
COPY package.json /app

RUN apt-get update && apt-get install -y --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


RUN pip install tensorflow

RUN pip uninstall --yes tensorboard tb-nightly

RUN pip install --upgrade tensorflow-federated-nightly

RUN pip install --upgrade nest-asyncio
RUN pip install --upgrade tb-nightly

RUN npm i

# CMD ["npm","run","dev"]
