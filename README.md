# Tic Tac Toe Challenge

An asynchronous 2 players Tic Tac Toe game using React and Redux.
Data is updated in real-time while players are on 'all games page' or while playing a game. The pooling mechanism fetch data every 3 seconds(as defined in [env.js](./src/env.js)).
Only Admin users have the hability to create other users.

## Dummy users:

  Username | Password
------------ | -------------
player_1 | 123
player_2 | 123
player_3 | 123

## TODO(in case it was an production app):

* Move sensitivy data to environment variables
* Implement Websockts instead of Http pooling
* Implement better test suit
* Write test to all Components/Containers
* Better error handling for failing API calls
* store session in localStore
* Versioning games updated on backend to ensure data consistency

## Requirements

[Yarn](https://yarnpkg.com/lang/en/docs/install/)(recommend:0.27.5+)

## Available Scripts

In the project directory, you can run:

### `Yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `Yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `Yarn test`

Runs the tests and watch for files change.
