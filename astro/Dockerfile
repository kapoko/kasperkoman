FROM node:24-trixie-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

CMD ["node", "server.mjs"]
