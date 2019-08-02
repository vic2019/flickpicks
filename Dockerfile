FROM node:10.16.0

WORKDIR /app

COPY package*.json /app/

RUN npm install --production

COPY . /app

EXPOSE 3009

ENV NODE_ENV production

CMD ["node", "server.js"]