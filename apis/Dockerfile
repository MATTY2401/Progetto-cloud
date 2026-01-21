FROM node:24.12-alpine

WORKDIR /usr/src/app

COPY package*.json /

RUN npm ci --loglevel=error

COPY . .

EXPOSE 1515

CMD ["node", "server.js"]