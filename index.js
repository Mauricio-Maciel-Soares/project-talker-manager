const express = require('express');
const bodyParser = require('body-parser');
const { token, reading, writing } = require('./utils/functions');

const {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  thereIsKeyTalk,
   } = require('./utils/middlewares');

const app = express();
const router = require('./utils/router');

app.use(express.json());
app.use(bodyParser.json()); // para o req.body
app.use('/talker', router);
app.use('/login', router);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.post('/login', isValidEmail, isValidPassword, (_request, response) => {
  response.status(HTTP_OK_STATUS)
  .json({ token });
});

// referência => https://www.youtube.com/watch?v=75F0ejsEcys
app.post('/talker', isValidToken, isValidName, isValidAge, thereIsKeyTalk, async (request, response) => {
  const { name, age, talk: { watchedAt, rate } } = request.body; // conteúdo do body;
  const newTalker = {
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  const talkers = await reading();
  newTalker.id = talkers.length + 1; // chave do id dinâmica;
  talkers.push(newTalker);
  await writing(talkers);
  console.log(talkers);
  return response.status(201).json(newTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
// !
