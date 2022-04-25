const express = require('express');
const bodyParser = require('body-parser');
const router = require('./utils/router');
// const fs = require('fs').promises;

// const router = express.Router();

const app = express();
app.use(bodyParser.json()); // para que isso se nao funciona?
app.use(router);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// router.get('/talker', async (_request, response) => {
//   await fs.readFile('./talker.json', 'utf8')
//     .then((data) => {
//       console.log(`Conteúdo do arquivo: ${data}`);
//       return response.status(HTTP_OK_STATUS).json(JSON.parse(data));
//     })
//     .catch((err) => {
//       console.error(`Não foi possível ler o arquivo ${'talker.json'}\n Erro: ${err}`);
//       process.exit(1); // Encerra a execução do script e informa ao sistema operacional que houve um erro com código
//     });
//   });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
// !
