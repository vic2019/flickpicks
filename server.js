const express = require('express');
const path = require('path');

const app = express();

// app.use(express.json());
app.use('/discover', require('./api/discover'));

const port = process.env.PORT || 3009;

app.listen(port, () => console.log(`Server listening on port: ${port}\n`));