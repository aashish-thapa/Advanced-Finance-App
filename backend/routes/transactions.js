const router = require('express').Router();
const { addExpenses, getExpenses, deleteExpenses } = require('../controllers/expense.js');
const {addIncome, getIncomes, deleteIncome} = require('../controllers/income.js');
router.post('/add-income', addIncome)
        .get('/get-incomes', getIncomes)
        .delete('/delete-income/:id', deleteIncome)
        .post('/add-expenses', addExpenses)
        .get('/get-expenses', getExpenses)
        .delete('/delete-expense/:id', deleteExpenses)
module.exports = router;