FROM node:8.16.2

## application create directory
RUN mkdir /app

## cd and move directory
WORKDIR /app
COPY . .

## Gerekli paketleri yükleyelim
RUN npm install

## expose 5000 port
EXPOSE 5000

## start 
CMD [ "node", "index.js" ]