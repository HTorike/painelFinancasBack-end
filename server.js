const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app =  express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const transactionsRouter = require('./routes/transactions');
app.use('/transactions', transactionsRouter);
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.get('/', (req, res) => {
    res.send('API do painel de finanças funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});