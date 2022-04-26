const express = require('express');
const { reading } = require('./middlewares');

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
    response.status(200).json(talkerId);
  });

module.exports = router;
