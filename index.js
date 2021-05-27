const customExpress = require('./src/config/customExpress')
const conexao = require('./src/database/conexao')
const Tabelas = require('./src/database/tabelas')

conexao.connect(erro => {
    if (erro) {
        console.log('Erro na conexão com o banco')
        console.log(erro)
    } else {
        console.log('Conexão efetuada com sucesso')

        Tabelas.init(conexao);
        const app = customExpress();

        app.listen(3333, () => console.log('Servidor rodando na porta 3333'))

    }
})


