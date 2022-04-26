const fs = require('fs').promises;
const express = require('express');

const HTTP_OK_STATUS = 200;
const router = express.Router();

const talkers = [
  {
    name: 'Henrique Albuquerque',
    age: 62,
    id: 1,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
  {
    name: 'Heloísa Albuquerque',
    age: 67,
    id: 2,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
  {
    name: 'Ricardo Xavier Filho',
    age: 33,
    id: 3,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
  {
    name: 'Marcos Costa',
    age: 24,
    id: 4,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
];

router.get('/', async (_request, response) => {
  await fs.readFile('./talker.json', 'utf8')
    .then((data) => {
      console.log(`Conteúdo do arquivo: ${data}`);
      return response.status(HTTP_OK_STATUS).json(JSON.parse(data));
    })
    .catch((err) => {
      console.error(`Não foi possível ler o arquivo ${'talker.json'}\n Erro: ${err}`);
      process.exit(1); // Encerra a execução do script e informa ao sistema operacional que houve um erro com código
    });
  });

  router.get('/:id', (request, response) => {
    const { id } = request.params;
    const talkerId = talkers.find((e) => e.id === parseInt(id, 10));
    if (!talkerId) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    response.status(200).json(talkerId);
  });

// function readFilePromise(fileTalker) {
//     return new Promise((resolve, reject) => {
//     fs.readFile(fileTalker, (err, content) => {
//       if (err) return reject(err);
//       resolve(content);
//     });
//   });
// }

// readFilePromise('../talker.json')
//   .then((content) => content.toString('utf8'))
//   .catch((err) => {
//     console.error(`Erro ao ler arquivo: ${err.message}`);
//   });

// const reading = async () => {
//   fs.readFile(path.join(__dirname, '..', 'talker.json'), (err, content) => {
//     if (err) {
//       console.error(`Erro ao ler o arquivo: ${err.message}`);
//       return;
//     }
//     console.log(content.toString('utf-8'));
//     return content.toString('utf8');
//   });

module.exports = router;
