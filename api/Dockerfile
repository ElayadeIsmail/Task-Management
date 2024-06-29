FROM node:20.13.1-alpine3.19

RUN apk update && apk add bash

WORKDIR /app

COPY package*.json .

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build


EXPOSE 8081

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run migrate:deploy && npm run start:prod