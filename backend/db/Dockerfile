FROM mongo

COPY mongo-init.sh /docker-entrypoint-initdb.d/

COPY docker-healthcheck /usr/local/bin/

HEALTHCHECK CMD ["docker-healthcheck"]
