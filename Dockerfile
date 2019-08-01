FROM node:10.16.0

WORKDIR /flickpicks

COPY . /flickpicks

RUN npm install; npm run client-install; npm run build -prefix client

EXPOSE 3009

CMD ["node", "server.js"]