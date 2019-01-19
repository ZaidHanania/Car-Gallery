import express from 'express';
import path from 'path';

import { data } from './data';

const app = express();
app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/index.html'));
});

app.get('/cars', (req, res) => {
  res.json(data.cars)
});

app.get('*', (req, res) => {
  res.send({
    errorMessage: 'Unknown request'
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});