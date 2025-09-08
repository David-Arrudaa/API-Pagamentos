const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

const processarPagamento = async (metodoPagamento, dadosTransacao, tokenCartao) => {

  if (metodoPagamento !== 'cartao_credito') {
    return {
      status_transacao: 'FALHA',
      mensagem: 'Método de pagamento não suportado nesta versão.'
    }
  }

  try {
    console.log('SERVICE: Criando cobrança no Stripe...');

    const charge = await stripe.charges.create({
      amount: Math.round(dadosTransacao.valor_total * 100), 
      currency: 'brl',
      source: tokenCartao, 
      description: `Pagamento para a transação ${dadosTransacao.id_transacao_externa}`,
    });

    let statusPagamento = 'RECUSADO';
    if (charge.paid) {
      statusPagamento = 'APROVADO';
    }

    let divisaoValores = null;
    if (statusPagamento === 'APROVADO') {
      console.log('SERVICE: Pagamento aprovado pelo Stripe. Calculando divisão.');
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
      divisao_valores: divisaoValores,
      id_transacao_stripe: charge.id 
    };

  } catch (error) {
    console.error('SERVICE: Erro ao processar pagamento no Stripe:', error.message);
    return {
      status_transacao: 'ERRO_GATEWAY',
      mensagem_erro: error.message
    };
  }
};


module.exports = {
  buscarDadosTransacao,
  processarPagamento,
};