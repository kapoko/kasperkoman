# [kasperkoman](https://kasperkoman.com)

Public repository of my website, in case anyone wants to have a look around. Frontend uses [Next.js](https://nextjs.org) and backend is build upon [Strapi](https://strapi.io/) and [MongoDB](https://www.mongodb.com/).

## Development

Copy `.env.example` to `env` and fill in variables.

### db 

Run `docker-compose up db`.

### api

Run `docker-compose up api`. It's also possible to use strapi's development server which is a little faster. 

```bash
cd api/strapi
npm install
npm run build
npm run start
```

### frontend

```bash
cd app
npm install
npm run dev
```

### Production

Run `make` to copy docker-compose.prod.yml to server. Fill in the `.env` file on the server. Run `docker-compose up`. 