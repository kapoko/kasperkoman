#!make
include .env
export $(shell sed 's/=.*//' .env)

.PHONY: deploy

deploy:
	@echo "Deploying docker-compose.prod.yml and .env.example file";
	rsync -av -e ssh .env.example docker-compose.prod.yml $(SSH_USER)@$(SSH_HOST):~/projects/kasperkoman/
	ssh $(SSH_USER)@$(SSH_HOST) 'cd ${REMOTE_DIR} && mv docker-compose.prod.yml docker-compose.yml'

build-frontend:
	@echo "Building frontend"
	docker build --no-cache --tag=kapoko/kasperkoman:frontend ./frontend && \
	docker push kapoko/kasperkoman:frontend

build-strapi:
	@echo "Building strapi"
	docker build --no-cache --tag=kapoko/kasperkoman:strapi ./backend/strapi && \
	docker push kapoko/kasperkoman:strapi

build-db:
	@echo "Building db image"
	docker build --no-cache --tag=kapoko/kasperkoman:db ./backend/db && \
	docker push kapoko/kasperkoman:db

run: run-db run-frontend

run-db:
ifneq ($(ENV),production)
	@echo "Command meant for production, specify in .env file"
endif
	docker pull kapoko/kasperkoman:db
	docker stop kasperkoman_db || true && docker rm kasperkoman_db || true
	docker run --env-file .env --name kasperkoman_db -v `pwd`/volumes/db:/data/db -d kapoko/kasperkoman:db

run-frontend:
ifneq ($(ENV),production)
	@echo "Command meant for production, specify in .env file"
endif
	docker pull kapoko/kasperkoman:frontend
	docker stop kasperkoman_frontend || true && docker rm kasperkoman_frontend || true
	docker run --env-file .env --name kasperkoman_frontend -d -p 3000:3000 kapoko/kasperkoman:frontend