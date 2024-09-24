

const processAttendantData = (req, res, next) => {

    // Log para ver qual rota está sendo acessada
    console.log('Rota acessada:', req.path);

    const { email, password, name } = req.body;
  
    // Verifica o tipo de rota para aplicar a validação apropriada
    switch (req.path) {
      case '/register':
        // Para registro, verificamos se todos os parâmetros necessários estão presentes
        if (!email || !password || !name) {
          return res.status(400).json({ message: 'Missing required fields for registration' });
        }
        req.attendantData = { email, password, name };
        break;
  
      case '/login':
        // Para login, verificamos se email e senha estão presentes
        if (!email || !password) {
          return res.status(400).json({ message: 'Missing required fields for login' });
        }
        req.attendantData = { email, password };
        break;
  
      default:
        return res.status(400).json({ message: 'Invalid endpoint' });
    }
  
    // Passa os dados preparados para o próximo middleware ou controlador
    next();
  };
  
  module.exports = processAttendantData;
  