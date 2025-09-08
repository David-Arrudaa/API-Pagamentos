const apiKeyMiddleware = (req, res, next) => {

  const CHAVE_SECRETA_ESPERADA = 'minha-api-key-secreta-12345';

  const chaveEnviada = req.headers['x-api-key'];

  console.log('MIDDLEWARE: Verificando a API Key...');

  if (!chaveEnviada || chaveEnviada !== CHAVE_SECRETA_ESPERADA) {
    console.log('MIDDLEWARE: Acesso negado. API Key inválida ou ausente.');
    return res.status(401).json({ erro: 'Acesso não autorizado. Verifique sua API Key.' });
  }

  console.log('MIDDLEWARE: Acesso permitido.');
  next();
};

module.exports = {
  apiKeyMiddleware,
};