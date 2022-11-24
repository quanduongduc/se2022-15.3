FROM node:16-alpine as build-state

WORKDIR /src

COPY package*.json ./

COPY . .

RUN npm ci

CMD [ "npm", "start" ]

FROM nginx:alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-state /src/build /usr/share/nginx/html

EXPOSE $REACT_DOCKER_PORT
