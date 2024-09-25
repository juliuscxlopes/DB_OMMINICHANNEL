const attendantService = require('../services/attendants/attendants');
const authService = require('../services/attendants/auth');
const jwt = require('jsonwebtoken');
const redisClient = require('../redis/redisClient');

// Registrar um novo atendente
const registerAttendant = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o atendente já existe
    const existingAttendant = await attendantService.getAttendant(email);

    if (existingAttendant) {
      console.log('Attendant already exists:', existingAttendant);
      return res.status(400).json({ message: 'Attendant already exists' });
    }

    // Cria um novo atendente
    const attendant = await attendantService.createAttendant({ name, email, password });
    console.log('Attendant registered:', attendant);
    // Responde ao cliente que o atendente foi registrado com sucesso
    res.status(201).json({ message: 'Attendant registered successfully', data: attendant });
  } catch (error) {
    console.error('Error registering attendant:', error.message);
    // Responde ao cliente com o erro
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
// Login de um atendente
const loginAttendant = async (req, res) => {
  const { email, password } = req.body;

  try {
    const attendant = await attendantService.getAttendant(email);

    if (attendant) {
      const isAuthenticated = await authService.authenticate(email, password);

      if (isAuthenticated) {
        // Geramos o token JWT
        const token = jwt.sign(
          { id: attendant.id, email: attendant.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        // Persistindo o atendente no Redis
        await redisClient.hSet(`attendant:${attendant.id}`, {
          email: attendant.email,
          status: 'active',
          lastActivity: Date.now(),
        });

        // Configurando um tempo de expiração (opcional)
        await redisClient.expire(`attendant:${attendant.id}`, 3600); // 1 hora

        // Retornamos o token junto com a resposta de sucesso
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(404).json({ message: 'Attendant not found' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}



module.exports = {
  registerAttendant,
  loginAttendant
};


