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

  module.exports = {
    isValidEmail,
    isValidPassword,
    isValidToken,
};
