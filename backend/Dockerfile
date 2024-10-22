FROM node:alpine

WORKDIR /usr/src/backend

COPY package.json package-lock.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]