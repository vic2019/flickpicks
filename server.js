const express = require('express');
const config = require('config');

const app = express();

app.use('/discover', require('./api/discover'));
app.use('/movie', require('./api/movie-page'));

const port = config.get('server').port;

app.listen(port, () => console.log(`Server listening on port: ${port}\n`));