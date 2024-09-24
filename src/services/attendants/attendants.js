const Attendant = require('../../migrations/attendants');
const db = require('../../postgresql/db'); // Ajuste o caminho conforme necessário

// Função para criar um atendente
const createAttendant = async (data) => {
  try {
    console.log('Database URL:', process.env.DATABASE_URL); // Verifique a URL
    await db('Attendants').insert({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return { message: 'Attendant created successfully' };
  } catch (error) {
    console.error('Error creating attendant:', error.message); // Log detalhado
    throw new Error('Error creating attendant: ' + error.message);
  }
};

// Função para buscar um atendente
const getAttendant = async (email) => {
  try {
    return await db('Attendants').where({ email }).first();
  } catch (error) {
    console.error('Error fetching attendant:', error.message);
    throw new Error('Error fetching attendant');
  }
}

// Read
const readAttendant = async (email) => {
  return await Attendant.findOne({ email });
};

// Update
const updateAttendant = async (email, updateData) => {
  return await Attendant.findOneAndUpdate({ email }, updateData, { new: true });
};

// Delete
const deleteAttendant = async (email) => {
  return await Attendant.findOneAndDelete({ email });
};

module.exports = {
  createAttendant,
  getAttendant,
  updateAttendant,
  deleteAttendant,
  readAttendant
};
