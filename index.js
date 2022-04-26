const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require('./utils/router');

app.use(bodyParser.json()); // para que isso se nao funciona?
app.use('/talker', router);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
// !
