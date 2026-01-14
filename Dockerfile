FROM node:24.12-alpine

WORKDIR /usr/src/app

COPY package*.json /

RUN npm ci

COPY src .

COPY entrypoint.sh ./

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["node", "app.js"]