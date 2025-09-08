const express = require('express');
const router = express.Router();

const pagamentoController = require('../controllers/pagamentoController');
const { validarPagamento } = require('../validators/pagamentoValidator');

router.post('/', validarPagamento, pagamentoController.processarPagamento);

router.post('/seed', pagamentoController.seedDatabase);

module.exports = router;