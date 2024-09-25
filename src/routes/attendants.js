// src/routes/attendantsRoutes.js
const express = require('express');
const router = express.Router();
const attendantsController = require('../controllers/attendantsController');
const processAttendantData = require('../middleware/attendantsMiddleware');
const authenticateToken = require('../middleware/authMiddleware'); // Importa o middleware de autenticação

// Rota de registro
router.post('/register', processAttendantData, attendantsController.registerAttendant);

// Rota de login
router.post('/login', processAttendantData, attendantsController.loginAttendant);

// Outras rotas que precisam ser autenticadas, se houver

module.exports = router;
