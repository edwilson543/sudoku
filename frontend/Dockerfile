FROM node:18.16-alpine
WORKDIR /frontend
COPY . .
RUN npm ci
RUN npm run build
