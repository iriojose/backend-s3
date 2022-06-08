FROM node:14
WORKDIR /backend-s3
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD npm start
