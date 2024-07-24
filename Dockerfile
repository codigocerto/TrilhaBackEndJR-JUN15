FROM node:18.18-alpine

WORKDIR /usr/app

COPY . .

EXPOSE 4000

RUN npm i
RUN npm run build

CMD ["npm", "start"]
