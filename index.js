const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { reading, writing } = require('./utils/functions');

const {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  thereIsKeyTalk,
  isValidKeys,
  isValidDateRate,
   } = require('./utils/middlewares');

const app = express();
const router = require('./utils/router');

app.use(bodyParser.json()); // para o req.body
app.use('/talker', router);
app.use('/login', router);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.post('/login', isValidEmail, isValidPassword, (_request, response) => {
  response.status(HTTP_OK_STATUS)
  .json({ token: crypto.randomBytes(8).toString('hex') });
});

// referência => https://www.youtube.com/watch?v=75F0ejsEcys
app.post('/talker', isValidToken, isValidName, isValidAge, thereIsKeyTalk, isValidKeys,
  isValidDateRate, async (request, response) => {
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
  return response.status(201).json(newTalker);
});

// https:app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-http-com-nodejs/8022a9b1-7548-4298-97ce-9acfa8986e66/conteudos/6538b037-f4ae-4cb8-a237-1a1501d996f4/atualizando-e-deletando-objetos-atraves-da-api/1c0f51c5-d076-4635-b3d3-b57979d164ba?use_case=side_bar

app.put('/talker/:id', isValidToken, isValidName, isValidAge, thereIsKeyTalk, isValidKeys,
  isValidDateRate, async (request, response) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;
  const editedTalker = { id: Number(id), name, age, talk };
  const talkers = await reading();
  const talkerId = talkers.findIndex((e) => e.id === parseInt(id, 10));
  if (talkerId === -1) return response.status(404).json({ message: 'talker not found!' });

  talkers[talkerId] = { ...talkers[talkerId], name, age, talk };
  await writing(talkers);
  return response.status(200).json(editedTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
// !
