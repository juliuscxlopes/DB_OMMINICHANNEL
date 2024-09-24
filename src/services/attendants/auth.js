const db = require('../../postgresql/db'); // Ajuste o caminho conforme necessário

const authenticate = async (email, password) => {
  try {
    // Consulta o banco de dados para encontrar o atendente com o e-mail fornecido
    const result = await db('Attendants').where({ email }).first();

    if (!result) {
      return false; // Usuário não encontrado
    }

    // Verifica se a senha fornecida corresponde à senha armazenada (em texto simples)
    return result.password === password;
  } catch (error) {
    console.error('Error authenticating user:', error.message);
    throw new Error('Error authenticating user');
  }
};


module.exports = {
  authenticate
};
