const fs = require('fs').promises;

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

async function reading() {
    const data = await fs.readFile('./talker.json');
    return JSON.parse(data);
}

  module.exports = {
    reading,
    isValidEmail,
    isValidPassword,
};
