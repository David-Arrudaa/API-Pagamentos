const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const buscarDadosTransacao = async (idTransacaoExterna) => {
  console.log(`SERVICE: Buscando dados REAIS para a transação ${idTransacaoExterna}`);
  
  const pedido = await prisma.pedido.findUnique({
    where: {
      id_transacao_externa: idTransacaoExterna,
    },
    include: {
      comprador: true, 
      vendedor: true,  
    }
  });

  return pedido;
};

const processarPagamento = async (metodoPagamento, dadosTransacao, tokenCartao) => {
  if (metodoPagamento !== 'cartao_credito') {
    return {
      status_transacao: 'FALHA',
      mensagem: 'Método de pagamento não suportado para processamento real.'
    };
  }

  try {
    console.log('SERVICE: Criando cobrança no Stripe...');
    const charge = await stripe.charges.create({
      amount: Math.round(Number(dadosTransacao.valor_total) * 100),
      currency: 'brl',
      source: tokenCartao,
      description: `Pagamento para a transação ${dadosTransacao.id_transacao_externa}`,
    });

    const statusPagamento = charge.paid ? 'APROVADO' : 'RECUSADO';
    let divisaoValores = null;

    if (statusPagamento === 'APROVADO') {
      console.log('SERVICE: Pagamento aprovado pelo Stripe. Calculando divisão.');
      const valorTotal = Number(dadosTransacao.valor_total);
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

const criarDadosDeTeste = async () => {
  console.log('SERVICE: Criando dados de teste...');

  const vendedor = await prisma.vendedor.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, nome: 'Vendedor Afiliado Teste' },
  });

  const comprador = await prisma.comprador.upsert({
    where: { cpf: '111.222.333-44' },
    update: {},
    create: { nome: 'João da Silva Teste', cpf: '111.222.333-44' },
  });

  const pedidoPix = await prisma.pedido.upsert({
    where: { id_transacao_externa: 'TXID12345ABC67890' },
    update: {},
    create: {
      id_transacao_externa: 'TXID12345ABC67890',
      valor_total: 150.00,
      compradorId: comprador.id,
      vendedorId: vendedor.id,
    },
  });

  const pedidoCartao = await prisma.pedido.upsert({
    where: { id_transacao_externa: 'TXID98765ZYX43210' },
    update: {},
    create: {
      id_transacao_externa: 'TXID98765ZYX43210',
      valor_total: 300.00,
      compradorId: comprador.id,
      vendedorId: vendedor.id,
    },
  });

  console.log('SERVICE: Dados de teste criados com sucesso!');
  return { vendedor, comprador, pedidoPix, pedidoCartao };
};

module.exports = {
  buscarDadosTransacao,
  processarPagamento,
  criarDadosDeTeste,
};