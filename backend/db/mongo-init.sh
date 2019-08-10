#!/usr/bin/env bash

echo 'Creating Strapi user and db'

mongo ${MONGO_INITDB_DATABASE} \
    --host localhost \
    --port ${DATABASE_PORT} \
    -u ${MONGO_INITDB_ROOT_USERNAME} \
    -p ${MONGO_INITDB_ROOT_PASSWORD} \
    --authenticationDatabase admin \
    --eval "db.createUser({user: '${DATABASE_USERNAME}', pwd: '${DATABASE_PASSWORD}', roles:[{role:'dbOwner', db: '${MONGO_INITDB_DATABASE}'}]});"