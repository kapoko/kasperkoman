# [kasperkoman.com](https://kasperkoman.com)

Public repository of my website, in case anyone wants to have a look around. Frontend uses [Next.js](https://nextjs.org) and backend is build upon [Strapi](https://strapi.io/) and [MongoDB](https://www.mongodb.com/).

## Development

Copy `.env.example` to `env` and fill in variables.

### Database 

Run `docker-compose up db`.

### Api

Run `docker-compose up api`. It's also possible to use strapi's development server which is a little faster. Make sure you change `DATABASE_HOST` in `.env` accordingly (`db` or `localhost`).

```bash
cd api/strapi
npm install
npm run build
npm run start
```

### App / Frontend

```bash
cd app
npm install
npm run dev
```

### Production

Note that without configuration most of these steps won't work because you need access to my docker account.

- Build the images by running `make build-all`. 
- Run `make deploy` to copy `docker-compose.prod.yml` and `.env-example` to server. 
- Copy `.env-example` to `.env` on server and fill it in. 
- Run `docker-compose up` on the server.