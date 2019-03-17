FROM node:10-slim

COPY package*.json ./
RUN npm install --production
COPY . .

ENV filedrop_target=/var/drops
RUN mkdir -p $filedrop_target
EXPOSE 8080

CMD ./index.js
