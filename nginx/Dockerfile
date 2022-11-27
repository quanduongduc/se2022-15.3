FROM nginx:alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE $NGINX_DOCKER_PORT

CMD nginx -g 'daemon off;'