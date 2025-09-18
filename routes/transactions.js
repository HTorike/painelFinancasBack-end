const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/dashboard', async (req, res) => {
    try {
        const transactions = await Transaction.find();

        const incomeTotal = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

        const expenseTotal = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

        const balance = incomeTotal - expenseTotal;

        res.json({
            balance,
            incomeTotal,
            expenseTotal,
            transactions: transactions.slice(0, 5)
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { description, amount, type, date } = req.body;
        const transaction = new Transaction ({
            description,
            amount,
            type,
        });

        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);

    }

    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

});

router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put ('/:id', async (req, res) => {
    try {
        const { description, amount, type } = req.body;
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        
        if (description) {
            transaction.description = description;
        }

        if (amount) {
            transaction.amount = amount;
        }

        if (type) {
            transaction.type = type;
        }

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }

        res.json({ message: 'Transação deletada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;