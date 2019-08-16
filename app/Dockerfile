FROM node:alpine

RUN apk add --update --no-cache --virtual .build-deps \
    build-base \
    autoconf \
    make \
    automake \
    libtool \
    pkgconf \
    nasm \
    tar \
    g++

RUN apk add --no-cache \
    libc6-compat \
    libjpeg-turbo-dev

WORKDIR /usr/src/app

ENV NODE_ENV production

EXPOSE 5000
EXPOSE 2601

COPY package.json .
COPY package-lock.json .

RUN npm install --no-optional

RUN apk del .build-deps

COPY . .
RUN npm run build

CMD ["sh", "-c", "npm run prod"]
