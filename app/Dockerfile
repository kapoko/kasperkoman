FROM node:alpine

WORKDIR /opt/app
RUN apk --update --no-cache add \
    libc6-compat \
    build-base \
    autoconf \
    make \
    automake \
    libtool \
    pkgconf \
    nasm \
    tar \
    libjpeg-turbo-dev \
    g++

ENV NODE_ENV production

EXPOSE 5000
EXPOSE 2601

COPY . .

RUN npm install --no-optional --production=false && npm run build

CMD ["sh", "-c", "npm run prod"]
