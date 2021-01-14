const { TEXT, INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define("respostas",{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
            // nao recria a tabela caso exista
Resposta.sync({force: false});
module.exports = Resposta;