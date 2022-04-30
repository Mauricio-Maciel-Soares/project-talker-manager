const DATE_REGEX = /(0[1-9]|1[1-9]|2[1-9]|3[0-1])[/](0[1-9]|1[0-2])[/](20[0-3][0-9])/;
const MESSAGE = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const isValidEmail = (request, response, next) => {
  const { email } = request.body;
  if (!email) { return response.status(400).json({ message: 'O campo "email" é obrigatório' }); }

  if (!email.includes('@') || !email.includes('.com')) {
    return response.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const isValidPassword = (request, response, next) => {
  const { password } = request.body;
  if (!password) {
 return response.status(400).json({
    message: 'O campo "password" é obrigatório',
  }); 
}

  if (!/^[0-9]{6,}$/.test(password)) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const isValidToken = (request, response, next) => {
  const token = request.headers.authorization;
  const tokenRegex = new RegExp(/^[a-zA-Z0-9]{16}$/);

  if (!token) { return response.status(401).json({ message: 'Token não encontrado' }); }
  if (!tokenRegex.test(token)) { return response.status(401).json({ message: 'Token inválido' }); }

  next();
};

const isValidDateRate = (request, response, next) => {
  const { talk } = request.body;
  if (!DATE_REGEX.test(talk.watchedAt)) {
    return response.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(talk.rate) || Number(talk.rate) < 1 || Number(talk.rate) > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const thereIsKeyTalk = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || talk === '') { return response.status(400).json(MESSAGE); }
  next();
};

const isValidKeys = (request, response, next) => {
  const { talk } = request.body;
  if (!talk.watchedAt || talk.watchedAt === '') { return response.status(400).json(MESSAGE); }
  if (talk.rate === undefined || talk.rate === '') { return response.status(400).json(MESSAGE); }

  next();
};

const isValidName = (request, response, next) => {
  const { name } = request.body;
  if (!name || name === '') {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' }); 
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const isValidAge = (request, response, next) => {
  const { age } = request.body;
  if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }   
  if (Number(age) < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

  module.exports = {
    isValidName,
    isValidEmail,
    isValidPassword,
    isValidToken,
    isValidAge,
    thereIsKeyTalk,
    isValidKeys,
    isValidDateRate,
};
