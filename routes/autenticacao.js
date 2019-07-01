const express = require('express');
const usuarioCtrl = require('../controllers/usuario_controller');

const router = express.Router();

router.post('/registrar', usuarioCtrl.registrar);
router.get('/liberar', usuarioCtrl.liberar);
router.post('/login', usuarioCtrl.login);
router.get('/verificar', usuarioCtrl.verificar);



module.exports = router;