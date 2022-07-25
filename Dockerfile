FROM node:14.16.0

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . /app
RUN npm run build


FROM nginx:stable-alpine
COPY --from=0 /app/dist /app
COPY --from=0 /app/nginx.template /etc/nginx/nginx.template
ENV BACKEND_URL http://127.0.0.1:8080
EXPOSE 80
ENTRYPOINT envsubst '${BACKEND_URL}' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'