const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importar o CORS

// Configurações do ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Definir os domínios permitidos
const allowedOrigins = [
  'https://frontendomminichannel-production.up.railway.app',
  'https://frontendomminichannel-production.up.railway.app/cadastroattendants'
];

// Configurar o CORS para permitir apenas os domínios listados
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware para analisar JSON
app.use(express.json());

// Importar e usar rotas do controlador de atendentes
const attendantsRoutes = require('./src/routes/attendants');
app.use('/attendants', attendantsRoutes);

// Importar e usar rotas do controlador de conversas do WhatsApp
/* const whatsappRoutes = require('./src/routes/whatsapp');
app.use('/whatsapp', whatsappRoutes); */

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
