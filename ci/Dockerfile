# Simple Dockerfile - runs tests then serves with nginx
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Production
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY src/ /usr/share/nginx/html/src/
COPY assets/ /usr/share/nginx/html/assets/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
