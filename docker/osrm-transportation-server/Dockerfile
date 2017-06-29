FROM debian:buster

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install -y curl git build-essential g++ cmake libboost-dev libboost-filesystem-dev libboost-thread-dev \
libboost-system-dev libboost-regex-dev libstxxl-dev libxml2-dev libsparsehash-dev libbz2-dev \
zlib1g-dev libzip-dev libgomp1 liblua5.1-0-dev \
pkg-config libgdal-dev libboost-program-options-dev libboost-iostreams-dev \
libboost-test-dev libtbb-dev libexpat1-dev

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g node-gyp

CMD bash -c "tail -f /dev/null"