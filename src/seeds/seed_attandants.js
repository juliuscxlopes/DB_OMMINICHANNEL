// src/seeds/attendants.js

exports.seed = async function(knex) {
    // Limpa a tabela antes de inserir novos dados
    await knex('Attendants').del();
  
    // Insere registros de exemplo na tabela
    await knex('Attendants').insert([
      { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
      { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password456' }
    ]);
  };
  