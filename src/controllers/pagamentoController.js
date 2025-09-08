
const pagamentoService = require('../services/pagamentoService');

const processarPagamento = (req, res) => {
  console.log('CONTROLLER: Processando requisição de pagamento...');
  
  const { id_transacao_externa, metodo_pagamento, dados_cartao } = req.body;

  const dadosTransacaoDoBanco = pagamentoService.buscarDadosTransacao(id_transacao_externa);

  if (!dadosTransacaoDoBanco) {
    console.log('CONTROLLER: Transação não encontrada.');
    return res.status(404).json({
      mensagem: `Transação com ID ${id_transacao_externa} não foi encontrada.`
    });
  }

  dadosTransacaoDoBanco.id_transacao_externa = id_transacao_externa;
  
  const resultadoProcessamento = pagamentoService.processarPagamento(
    metodo_pagamento,
    dadosTransacaoDoBanco,
    dados_cartao
  );

  const resposta = {
    ...resultadoProcessamento, 
    detalhes_pagamento: {
      valor_total: dadosTransacaoDoBanco.valor_total,
      comprador: dadosTransacaoDoBanco.comprador,
    }
  };

  const httpStatus = resultadoProcessamento.status_transacao === 'APROVADO' ? 201 : 200;

  res.status(httpStatus).json(resposta);
};

module.exports = {
  processarPagamento
};