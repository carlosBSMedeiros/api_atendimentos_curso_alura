const express = require('express');

const routes = express.Router();

const atendimentoController = require('./controllers/atendimentoController');

routes.get('/atendimentos', atendimentoController.listar)
routes.post('/atendimentos', atendimentoController.incluir)
routes.patch('/atendimentos', atendimentoController.alterar)
routes.delete('/atendimentos', atendimentoController.excluir)

module.exports = routes;
