const Atendimento = require('../models/atendimentos')

module.exports = {
    async listar(req, res) {

        Atendimento.list(req, res)
    },

    async incluir(req, res) {

        Atendimento.create(req.body, res)
    },

    async alterar(req,res){
        const { id } = req.query; 
        const atendimento = req.body
        Atendimento.alter(id, atendimento, res)
    },

    async excluir(req, res){
        const { id } = req.query;
        Atendimento.delete(id, res)
    }
}