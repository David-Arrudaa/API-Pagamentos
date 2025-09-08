const pagamentoService = require('../services/pagamentoService');

const processarPagamento = async (req, res) => {
  try {
    const { id_transacao_externa, metodo_pagamento, token_cartao } = req.body;

    const dadosTransacaoDoBanco = await pagamentoService.buscarDadosTransacao(id_transacao_externa);

    if (!dadosTransacaoDoBanco) {
      return res.status(404).json({ mensagem: `Transação com ID ${id_transacao_externa} não foi encontrada.` });
    }
    
    dadosTransacaoDoBanco.id_transacao_externa = id_transacao_externa;
    
    const resultadoProcessamento = await pagamentoService.processarPagamento(
      metodo_pagamento,
      dadosTransacaoDoBanco,
      token_cartao
    );

    const httpStatus = resultadoProcessamento.status_transacao === 'APROVADO' ? 201 : 200;

    return res.status(httpStatus).json(resultadoProcessamento);

  } catch (error) {
    console.error('CONTROLLER: Ocorreu um erro inesperado no controller:', error);
    return res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
  }
};

const seedDatabase = async (req, res) => {
  try {
    const resultado = await pagamentoService.criarDadosDeTeste();
    res.status(201).json({
      mensagem: "Banco de dados populado com dados de teste com sucesso!",
      dados_criados: resultado
    });
  } catch (error) {
    res.status(500).json({ erro: "Falha ao popular o banco de dados.", detalhes: error.message });
  }
};

module.exports = {
  processarPagamento,
  seedDatabase,
};