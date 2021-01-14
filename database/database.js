const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas', 'root', 'btrisna149', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;