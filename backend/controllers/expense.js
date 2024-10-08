const ExpenseSchema = require('../models/expenseModel');

exports.addExpenses = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "Every field must be completed" });
        }
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }
        await expense.save();
        res.status(200).json({ message: "Expense Added Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json({ expenses });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteExpenses = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            if (!expense) {
                return res.status(404).json({ message: "Expense not found" });
            }
            res.status(200).json({ message: 'Expense Deleted Successfully' });
        })
        .catch((error) => {
            res.status(500).json({ message: "Server Error", error: error.message });
        });
};
