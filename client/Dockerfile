FROM node:latest
WORKDIR /opt/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]