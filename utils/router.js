const express = require('express');
// const { token, reading } = require('./utils/functions');
const { reading } = require('./functions');
// const {
//   isValidEmail,
//   isValidPassword,
//   isValidToken } = require('./middlewares');

const HTTP_OK_STATUS = 200;
const router = express.Router();

router.get('/', async (_request, response) => {
  const talkers = await reading();
  response.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await reading();
  const talkerId = talkers.find((e) => e.id === parseInt(id, 10));
  if (!talkerId) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(talkerId);
});

// router.post('/talker', async (request, response) => {
//   const { name } = request.body;
//   const talkers = await reading();
//   talkers.push({ name });
//   return response.status(201).json({ message: 'OK' });
// });

// router.post('/', isValidEmail, isValidPassword, (_request, response) => {
//   response.status(HTTP_OK_STATUS)
//   .json({ token: crypto.randomBytes(8).toString('hex') });
// });

module.exports = router;
