const mongoose = require('mongoose');
const Expense = require('../models/expenseModel');
const Category = require('../models/categoryModel');

const getExpenses = async (req, res) => {
    const expenses = await Expense.find({}).sort({ createdAt: -1 });

    res.status(200).json(expenses);
}

const getExpense = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such expense tracked'});
    }

    const expense = await Expense.findById({_id: id});
    
    if (!expense) {
        return res.status(404).json({ error: 'No such expense tracked'});
    }

    res.status(200).json(expense);
}

const createExpense = async (req, res) => {
    const { title, description, amount, category, note } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ error: 'The category selected does not exist in the database' });
    }

    const categoryExists = await Category.findById({ _id: category });
    if (!categoryExists) {
        return res.status(400).json({ error: 'The category selected does not exist in the database' });
    }

    try {
        const expense = await Expense.create({ title, description, amount, category, note });
        res.status(200).json(expense);
    }
    catch(err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteExpense = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such expense tracked' });
    }

    const expense = await Expense.findByIdAndDelete({ _id: id });

    if (!expense) {
        return res.status(400).json({ error: 'No such expense tracked' });
    }

    res.status(200).json(expense);
}

const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such expense tracked' });
    }

    
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ error: 'The category selected does not exist in the database' });
    } else if (category) {
        const categoryExists = await Category.findById({ _id: category });
        if(!categoryExists) {
            return res.status(400).json({ error: 'The category selected does not exist in the database' });
        }
    }

    const expense = await Expense.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!expense) {
        return res.status(400).json({ error: 'No such expense' });
    }

    res.status(200).json(expense);
}

module.exports = {
    getExpenses,
    getExpense,
    createExpense,
    deleteExpense,
    updateExpense
}