'use strict';

const config = require('config');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Remember to include the protocal. Pay attention to http vs https.
const origin = config.get('server').origin;

app.use(cors({ origin }));

// app.get('/healthcheck', (req, res) => {
//   res.sendStatus(200);
// });

// app.use((req, res, next) => {
//   if (req.header('x-forwarded-proto') !== 'https') {
//     res.redirect('https://' + req.headers.host + req.url);
//   } else {
//     next();
//   }
// });

app.use('/api/discover', require('./api/discover'));
app.use('/api/movie', require('./api/movie-page'));
app.use('/api/search', require('./api/search'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}
  
const PORT = config.get('server').port;

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}\n`));