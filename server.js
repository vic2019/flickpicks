import express from 'express';

const app = express();
const port = process.env.PORT || 3009;

app.get('*', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => console.log(`Server listening on port: ${port}\n`));