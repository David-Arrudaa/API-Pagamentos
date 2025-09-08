const pagamentoService = require('../services/pagamentoService');

const processarPagamento = async (req, res) => {
  try {
    console.log('CONTROLLER: 1. Iniciando processamento.');
    
    const { id_transacao_externa, metodo_pagamento, token_cartao } = req.body;
    
    const dadosTransacaoDoBanco = pagamentoService.buscarDadosTransacao(id_transacao_externa);
    console.log('CONTROLLER: 2. Dados da transação (falsos) buscados.');

    if (!dadosTransacaoDoBanco) {
      console.log('CONTROLLER: Erro - Transação não encontrada no banco falso.');
      return res.status(404).json({ mensagem: `Transação com ID ${id_transacao_externa} não foi encontrada.` });
    }
    
    dadosTransacaoDoBanco.id_transacao_externa = id_transacao_externa;
    
    console.log('CONTROLLER: 3. Chamando o service para processar o pagamento...');
    const resultadoProcessamento = await pagamentoService.processarPagamento(
      metodo_pagamento,
      dadosTransacaoDoBanco,
      token_cartao
    );
    console.log('CONTROLLER: 4. Service respondeu. Montando a resposta final.');

    const httpStatus = resultadoProcessamento.status_transacao === 'APROVADO' ? 201 : 200;

    console.log('CONTROLLER: 5. Enviando resposta.');
    return res.status(httpStatus).json(resultadoProcessamento);

  } catch (error) {
    console.error('CONTROLLER: Ocorreu um erro inesperado no controller:', error);
    return res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
  }
};

module.exports = {
  processarPagamento
};