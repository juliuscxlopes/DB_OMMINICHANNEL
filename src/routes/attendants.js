// src/routes/attendantsRoutes.js
const express = require('express');
const router = express.Router();
const attendantsController = require('../controllers/attendantsController');
const processAttendantData = require('../middleware/attendantsMiddleware');
const authenticateToken = require('../middleware/authMiddleware'); // Importa o middleware de autenticação

// CRUD para atendentes
router.post('/register', authenticateToken, processAttendantData, attendantsController.registerAttendant); // Protege a rota de registro
//router.get('/:email', authenticateToken, attendantsController.getAttendant);
//router.put('/:email', authenticateToken, attendantsController.updateAttendant);
//outer.delete('/:email', authenticateToken, attendantsController.deleteAttendant);

// Autenticação de login (sem middleware de autenticação)
router.post('/login', processAttendantData, attendantsController.loginAttendant);

module.exports = router;
