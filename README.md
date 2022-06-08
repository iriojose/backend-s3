# backend-s3

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the backend in the development mode.\

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the backend for production to the `build` ./dist
 
## Endpoint Documentation

you can see the documentation of the endpoints in swagger with this link
https://app.swaggerhub.com/apis/iriojose/backend-aws/1.0.0#/

## How to run

- import the db_test.sql database
- add .env with all necessary environment variables
- run npm install 
- run npm start
- use postman and try endpoints, for example http://localhost:8000/api/users/signup

## How run migration

- run npx sequelize-cli init
- added environment variables to config.json file (this file is added when npx sequelize init was run)
- run npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
- run npx sequelize-cli db:migrate

