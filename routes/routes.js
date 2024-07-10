const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();


// ruta 
const controllers = require(path.join(__dirname, '..', 'controllers', 'controllers'));
//router
router.get('/', controllers.getLogin);
router.post('/login', controllers.postLogin);
router.post('/adduser', controllers.postAddUser);
router.post('/forgot', controllers.postForgot);

module.exports = router