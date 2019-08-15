# FROM alpine:latest as builder

# # Build JPEG utils
# ARG tag=v3.2

# RUN apk --update --no-cache add \
#     build-base \
#     autoconf \
#     automake \
#     libtool \
#     pkgconf \
#     nasm \
#     tar

# WORKDIR /src/mozjpeg
# ADD https://github.com/mozilla/mozjpeg/archive/$tag.tar.gz ./

# RUN tar -xzf $tag.tar.gz
# RUN rm $tag.tar.gz

# RUN SRC_DIR=$(ls -t1 -d mozjpeg-* | head -n1) && \
#     cd $SRC_DIR && \
#     autoreconf -fiv && \
#     cd .. && \
#     sh $SRC_DIR/configure && \
#     make install \
#         prefix=/usr/local \
#         libdir=/usr/local/lib64

# # Build WEBP utils
# ARG tag=1.0.3

# WORKDIR /src/cwepb
# ADD https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-$tag.tar.gz ./

# RUN tar -xzf libwebp-$tag.tar.gz
# RUN rm libwebp-$tag.tar.gz 

# RUN SRC_DIR=$(ls -t1 -d libwebp-* | head -n1) && \
#     cd $SRC_DIR && \
#     ls && \
#     sh ./configure && \
#     make install \
#         prefix=/usr/local \
#         libdir=/usr/local/lib64

# FROM node:alpine
# COPY --from=builder /usr/local /usr/local
# WORKDIR /usr/src/app

# RUN apk add --update --no-cache --virtual .build-deps \
#     # build-base \
#     # autoconf \
#     # automake \
#     # libtool \
#     # pkgconf \
#     # nasm 
#     build-base \
#     autoconf \
#     make \
#     automake \
#     libtool \
#     pkgconf \
#     nasm \
#     tar \
#     g++

# ENV NODE_ENV production

# EXPOSE 5000
# EXPOSE 2601

# COPY package.json .
# COPY package-lock.json .

# RUN npm install --no-optional

# # FROM node:alpine 
# # RUN apk --update --no-cache add \
# #     libc6-compat \
# #     libpng-dev \
# # # #     build-base \
# # # #     autoconf \
# # # #     make \
# # # #     automake \
# # # #     libtool \
# # # #     pkgconf \
# # # #     nasm \
# # # #     tar \ 
# #     jpeg \
# #     zlib \
# #     libwebp \
# #     libjpeg-turbo-dev 
# # #     g++
    
# # WORKDIR /usr/src/app
# # COPY --from=builder /usr/src/app/ /usr/src/app/
# COPY . .
# RUN npm run build
# CMD ["sh", "-c", "npm run prod"]

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
