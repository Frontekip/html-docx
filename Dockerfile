FROM --platform=linux/amd64 node:16.20.2

## cd and move directory
WORKDIR /app
COPY . .

RUN npm install

## expose 6000 port
EXPOSE 3000

## start 
CMD [ "node", "main.js" ]
