const express = require('express');
const registerCtrl = require('../controllers/register.controller');
const router = express.Router();

router.get('/Persona', registerCtrl.getRegister);
router.get('/Persona/:Id_persona', registerCtrl.getRegisterByIdPersona);
router.post('/Persona/Create', registerCtrl.createRegisterPersona);
router.post('/Persona/usuarioDuplicado', registerCtrl.usuarioDuplicado);



module.exports = router;