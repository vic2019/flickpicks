FROM node:10.16.0

WORKDIR /app

COPY package*.json server.js /app/
COPY api/* /app/api/
COPY config/* /app/config/

RUN npm install --production

EXPOSE 3009

ENV NODE_ENV production

CMD ["node", "server.js"]