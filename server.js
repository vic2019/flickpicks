'use strict';

const config = require('config');
const express = require('express');
const cors = require('cors');
// const path = require('path');

const app = express();

const origin = config.get('server').origin;
// Remember to include the protocal. Pay attention to http vs https.

app.use(cors({ origin }));

app.use('/flickpicks/discover', require('./api/discover'));
app.use('/flickpicks/movie', require('./api/movie-page'));
app.use('/flickpicks/search', require('./api/search'));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build/'));
//   });
// }
  
const PORT = config.get('server').port;

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}\n`));