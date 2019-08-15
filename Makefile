#!make
include .env
export $(shell sed 's/=.*//' .env)

.PHONY: deploy

deploy:
	@echo "Deploying docker-compose.prod.yml and .env.example file";
	rsync -av -e ssh .env.example docker-compose.prod.yml $(SSH_USER)@$(SSH_HOST):${REMOTE_DIR}
	ssh $(SSH_USER)@$(SSH_HOST) 'cd ${REMOTE_DIR} && mv docker-compose.prod.yml docker-compose.yml'

build-app:
	@echo "Building app"
	docker build --tag=kapoko/kasperkoman:app ./app && \
	docker push kapoko/kasperkoman:app

build-api:
	@echo "Building api"
	docker build --no-cache --tag=kapoko/kasperkoman:api ./api && \
	docker push kapoko/kasperkoman:api

build-db:
	@echo "Building db image"
	docker build --no-cache --tag=kapoko/kasperkoman:db ./db && \
	docker push kapoko/kasperkoman:db

deploy-app: deploy
	@echo "Starting app on server"
	ssh $(SSH_USER)@$(SSH_HOST) 'cd ${REMOTE_DIR} && \
		docker-compose pull app && docker-compose stop app && docker-compose up -d app'

deploy-api: deploy
	@echo "Starting api on server"
	ssh $(SSH_USER)@$(SSH_HOST) 'cd ${REMOTE_DIR} && \
		docker-compose pull api && docker-compose stop api && docker-compose up -d api'