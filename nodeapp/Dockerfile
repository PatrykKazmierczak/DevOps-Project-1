FROM node:14
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 7070
CMD ["node","server.js"]


