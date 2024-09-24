// src/routes/attendantsRoutes.js
const express = require('express');
const router = express.Router();
const attendantsController = require('../controllers/attendantsController');
const processAttendantData = require('../middleware/attendantsMiddleware');

// CRUD para atendentes
router.post('/register', processAttendantData,attendantsController.registerAttendant);
router.get('/:email', );
router.put('/:email', );
router.delete('/:email', );

// Autenticação de login.
router.post('/login', processAttendantData,attendantsController.loginAttendant);

module.exports = router;