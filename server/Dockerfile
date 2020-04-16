FROM node:latest
WORKDIR /opt/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8000

# You can change this
CMD [ "npm", "start" ]