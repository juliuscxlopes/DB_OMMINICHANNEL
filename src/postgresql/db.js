const knex = require('knex');
const knexConfig = require('../../knexfile');

// Use a configuração de desenvolvimento diretamente
const db = knex(knexConfig.development);

module.exports = db;
