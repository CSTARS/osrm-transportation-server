FROM ubuntu:16.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y curl 
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get update && apt-get install -y build-essential git cmake pkg-config \
libbz2-dev libxml2-dev libzip-dev libboost-all-dev \
lua5.2 liblua5.2-dev libtbb-dev nodejs libstxxl-dev

RUN npm install -g node-gyp

RUN mkdir osrm-transportation-server
WORKDIR /osrm-transportation-server

COPY package.json .
RUN npm install --production 

COPY ./data data

COPY ./lib lib
COPY ./index.js .

CMD node index.js 