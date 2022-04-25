const fs = require('fs').promises;
// const path = require('path');
const express = require('express');

const HTTP_OK_STATUS = 200;
// const talkers = path.join(__dirname, '..', 'talker.json');
const router = express.Router();

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

router.get('/talker', async (_request, response) => {
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

module.exports = router;