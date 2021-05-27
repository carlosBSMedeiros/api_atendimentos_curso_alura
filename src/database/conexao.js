const mysql = require('mysql')
const envr = require('../config/environment')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: envr.db_senha,
    database: 'agenda-petshop'
})

module.exports = conexao;