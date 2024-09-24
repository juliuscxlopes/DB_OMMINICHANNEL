/* //database/routes/whatsapp.js
const express = require('express');
const router = express.Router();
const dataBaseController = require('../controllers/whatsappController');
const { database } = require('pg/lib/defaults');
const pgClient = require('../postgresql/pgClient');

router.post('/', dataBaseController.createWhatsAppConversation);
router.get('/', dataBaseController.getWhatsAppConversations);
router.get('/:cnpj', dataBaseController.getWhatsAppConversationByCNPJ);
router.put('/:cnpj', dataBaseController.updateWhatsAppConversation);
router.delete('/:cnpj', dataBaseController.deleteWhatsAppConversation);

module.exports = router; */