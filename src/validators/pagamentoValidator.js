// Importamos o Zod
const { z } = require('zod');

const schemaPagamento = z.object({
  id_transacao_externa: z.string({
    required_error: "O campo id_transacao_externa é obrigatório.",
    invalid_type_error: "O id_transacao_externa deve ser uma string."
  }).min(10, { message: "O id_transacao_externa deve ter no mínimo 10 caracteres." }),

  metodo_pagamento: z.enum(['cartao_credito', 'pix'], {
    errorMap: () => ({ message: "O metodo_pagamento deve ser 'cartao_credito' ou 'pix'." })
  }),

  token_cartao: z.string().startsWith('tok_', { message: "O token_cartao deve começar com 'tok_'." }).optional()
});

const validarPagamento = (req, res, next) => {
  try {
    schemaPagamento.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      erro: "Dados de entrada inválidos.",
      detalhes: error.flatten().fieldErrors
    });
  }
};

module.exports = {
  validarPagamento,
};