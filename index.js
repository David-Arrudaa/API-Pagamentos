const express = require('express');
const app = express();

const pagamentoRoutes = require('./src/routes/pagamentoRoutes');
const { apiKeyMiddleware } = require('./src/middlewares/authMiddleware');

app.use(express.json());

app.use(apiKeyMiddleware);

const PORT = 3000;

app.use('/v1/pagamentos', pagamentoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor seguro, ouvindo na porta ${PORT}`);
});