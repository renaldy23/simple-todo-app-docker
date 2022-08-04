FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

ENV DB_HOST=todo-db

ENV DB_PORT=5432

ENV DB_USERNAME=pgsql

ENV DB_PASSWORD=rahasia

ENV DB_NAME=todos

EXPOSE 3000

CMD ["npm","run","dev"]