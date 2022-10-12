FROM node:latest

RUN mkdir -p /app

WORKDIR /app

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "pm2-runtime", "npm", "--", "start" ]