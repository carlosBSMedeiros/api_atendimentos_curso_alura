const conexao = require('../database/conexao')
const moment = require('moment')

class Atendimento {
    create(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 3;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                msg: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                msg: 'Nome do cliente deve ter no mínimo 3 caracteres'
            },
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            const sql = `INSERT INTO atendimentos SET ?`;
            conexao.query(sql, atendimentoDatado, (erro, results) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json({msg: `Atendimento criado com sucesso`, atendimento: atendimento})
                }
            })

        }

    }

    list(req,res){

        var sql = `SELECT * FROM atendimentos`

        const { id } = req.query; 
        if(id){
            sql += ` WHERE id = '${id}'`;
        }

        conexao.query(sql, (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                if(results.length <= 0){
                    res.status(200).json({msg:'Não foram encontrados resultados para sua busca'})
                }else{
                    res.status(200).json(results)
                }
            }
        })
    }

    alter(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = `UPDATE atendimentos SET ? WHERE id=?`
        
        conexao.query(sql,[valores, id], (erro, results)=>{
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json({msg: `id ${id} alterado com sucesso`})
            }
        })
    }

    delete(id, res){
        const sql = `DELETE FROM atendimentos WHERE id=?` 
        conexao.query(sql, id, (erro, results)=>{
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json({msg: `id ${id} excluído com sucesso`})
            }
        })
    }
}

module.exports = new Atendimento;