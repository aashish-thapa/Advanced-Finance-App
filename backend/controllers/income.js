const IncomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const income = IncomeSchema({
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
        await income.save();
        res.status(200).json({ message: "Income Added Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json({ incomes });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            if (!income) {
                return res.status(404).json({ message: "Income not found" });
            }
            res.status(200).json({ message: 'Income Deleted Successfully' });
        })
        .catch((error) => {
            res.status(500).json({ message: "Server Error", error: error.message });
        });
};
