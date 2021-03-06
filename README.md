# FlickPicks

FlickPicks is a responsive web app that allows users to search movies by title, release year, and genre. 

Users can save movies, categorize them, and filter saved movies by categories.  

<img
  src='./screenshot/flickpicks_screenshot.jpg'
  alt='project screenshot'
/>  

See a live <a href="https://flickpicks.victorwang.info" target="_blank">demo</a>.  

## Tech Stack

* TypeScript
* React
* Redux
* React-Router
* SCSS
* Node.js/Epress
* Docker
* AWS DynamoDB, Cognito, API Gateway, Lambda

This project uses [The Movie DB API](https://www.themoviedb.org/documentation/api). 

## Installation

Clone to your local machine:

`git clone https://github.com/vic2019/flickpicks`

Install the server and the client:

`npm install; npm client-install`

Supply your own config files as `/config/default.json` and `/client/src/config.js`. Then, run the following command in the project's root directory:

`npm run dev`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Please refer to its documentation for more information.