    FROM node:14.17.0-alpine as build-step
    RUN mkdir -p /app
    WORKDIR /app
    COPY package.json /app
    RUN npm install
    COPY . /app
    RUN npm run build --prod
    FROM nginx:1.20.1
    #copy content in /app/dist/starangular from above build to /usr/share/nginx/html
    COPY --from=build-step /app/dist/starangular /usr/share/nginx/html
    EXPOSE 4200:80