FROM node:alpine

WORKDIR /usr/src/frontend

COPY package.json package-lock.json ./

COPY . .

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]