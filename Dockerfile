FROM node:8.16.2

RUN apt-get update
RUN apt-get install pandoc -y

## application create directory
RUN mkdir /app

## Create docs files.
RUN mkdir /app/docs

## cd and move directory
WORKDIR /app
COPY . .

## Install express application
RUN npm install

## expose 5000 port
EXPOSE 5000

## start 
CMD [ "node", "index.js" ]