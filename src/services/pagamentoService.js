
const DADOS_PEDIDOS_PENDENTES = {
  "TXID12345ABC67890": {
    comprador: { nome: "João da Silva", cpf: "111.222.333-44" },
    vendedor: { id_vendedor: "VEND-AFILIADO-007" },
    valor_total: 150.00,
  },
  "TXID98765ZYX43210": {
    comprador: { nome: "Maria Oliveira", cpf: "555.666.777-88" },
    vendedor: { id_vendedor: "VEND-AFILIADO-008" },
    valor_total: 300.00,
  }
};

const buscarDadosTransacao = (idTransacao) => {
  console.log(`SERVICE: Buscando dados para a transação ${idTransacao}`);
  const dados = DADOS_PEDIDOS_PENDENTES[idTransacao];
  return dados;
};

const simularConsultaPix = (idTransacao) => {
  console.log(`SERVICE: Simulando consulta de status do Pix para ${idTransacao}`);
  return idTransacao.includes('A') ? 'APROVADO' : 'PENDENTE';
}; 


const simularProcessamentoCartao = (dadosCartao) => {
  console.log(`SERVICE: Simulando processamento do cartão final ${dadosCartao.numero.slice(-4)}`);
  return dadosCartao.cvv === '123' ? 'APROVADO' : 'RECUSADO';
}; 

const processarPagamento = (metodoPagamento, dadosTransacao, dadosCartao) => {
  let statusPagamento = 'PENDENTE';

  if (metodoPagamento === 'pix') {
    statusPagamento = simularConsultaPix(dadosTransacao.id_transacao_externa);
  } else if (metodoPagamento === 'cartao_credito') {
    statusPagamento = simularProcessamentoCartao(dadosCartao);
  }

  let divisaoValores = null;
  if (statusPagamento === 'APROVADO') {
    console.log('SERVICE: Pagamento aprovado. Calculando divisão de valores.');
    const valorTotal = dadosTransacao.valor_total;
    const valorVendedor = parseFloat((valorTotal / 3).toFixed(2));
    const valorPlataforma = parseFloat((valorTotal - valorVendedor).toFixed(2));

    divisaoValores = {
      valor_vendedor: valorVendedor,
      valor_plataforma: valorPlataforma
    };
  }

  return {
    status_transacao: statusPagamento,
    divisao_valores: divisaoValores
  };
};

module.exports = {
  buscarDadosTransacao,
  processarPagamento,
};