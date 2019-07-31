FROM node:v10

WORKDIR /flickpicks

COPY . /flickpicks

RUN npm install; npm run client-install

EXPOSE 3009

CMD ["node", "server.ts"]



