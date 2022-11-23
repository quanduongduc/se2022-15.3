FROM node:16-alpine

WORKDIR /src

COPY package*.json ./

COPY . .

RUN npm ci

CMD [ "npm", "start" ]


