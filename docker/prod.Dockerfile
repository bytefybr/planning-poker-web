FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm

RUN npm build

CMD ["npm", "start"]
