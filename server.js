const config = require('config');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/discover', require('./api/discover'));
app.use('/movie', require('./api/movie-page'));

const port = config.get('server').port;

app.listen(port, () => console.log(`Server listening on port: ${port}\n`));