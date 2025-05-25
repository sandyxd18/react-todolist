FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

RUN npm run build

EXPOSE 5050

CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:5050"]
