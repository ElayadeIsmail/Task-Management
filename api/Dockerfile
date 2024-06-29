FROM node:20.13.1-alpine3.19

RUN apk update && apk add bash

WORKDIR /app

COPY package.json .

COPY prisma ./prisma/

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build


EXPOSE 8081

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && pnpm run migrate:deploy && pnpm run start:prod