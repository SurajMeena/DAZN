## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

## Project Setup
- Just run `npm install` to install all the dependencies

## Endpoints available

- `/api/movies/all` - GET request to retrieve all movies.
- `/api/movies/search` - GET request to search for movies based on title or genre
- `/api/movies/update` - UPDATE current movie in database based on movieId
- `/api/movies/delete/:id` - DELETE movie with given movieId from database
- `/api/movies/add` - POST request to add a new movie to the database

**Note**: Sample requests are available in `all-requests.http` file and can be run just like postman using intelliJ

## Database
Setup your own mongodb database and populate DB_URL field in `development.env`

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm test`

Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`

Run a single unit-test.

### `npm run test:no-reloading`

Run all unit-tests without hot-reloading.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.


## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 
