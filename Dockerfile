FROM node:24.12-alpine

WORKDIR /usr/src/app

COPY package*.json /

RUN npm ci --only=production

COPY src/app.js .

EXPOSE 3000

CMD ["node", "app.js"]