FROM node:20

WORKDIR /myauthapp

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"] 