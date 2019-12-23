FROM node:10.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . ./

RUN ls ./

EXPOSE 3009

ENV NODE_ENV production

CMD ["node", "server.js"]