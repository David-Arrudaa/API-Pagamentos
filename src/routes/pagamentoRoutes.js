const express = require('express');
const router = express.Router(); 

const pagamentoController = require('../controllers/pagamentoController');

router.post('/', pagamentoController.processarPagamento);

module.exports = router;