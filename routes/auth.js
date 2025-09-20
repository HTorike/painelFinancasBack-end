const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    res.send('Rota de registro');
});

router.post('/login', async (req, res) => {
    res.send('Rota de login');
});

module.exports = router;
