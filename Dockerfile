FROM node:16-alpine

EXPOSE 3000

WORKDIR /src

RUN npm i npm@latest -g

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm","start"]


