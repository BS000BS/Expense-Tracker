const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
const Expense = require('../models/expenseModel');

const getCategories = async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    res.status(200).json(categories);
}

const getCategory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such category'});
    }

    const category = await Category.findById({_id: id});
    
    if (!category) {
        return res.status(404).json({ error: 'No such category'});
    }

    res.status(200).json(category);
}

const createCategory = async (req, res) => {
    const { name, description} = req.body;

    try {
        const category = await Category.create({ name, description});
        res.status(200).json(category);
    }
    catch(err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such category' });
    }

    const categoryReferencedToExpense = await Expense.find({ category: id });
    if (categoryReferencedToExpense.length > 0) {
        return res.status(400).json({ error: 'Please make sure no Expense is part of this category, otherwise this category can not be deleted.' });
    }

    const category = await Category.findByIdAndDelete({ _id: id });

    if (!category) {
        return res.status(400).json({ error: 'No such category' });
    }

    res.status(200).json(category);
}

const updateCategory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such category' });
    }

    const category = await Category.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!category) {
        return res.status(400).json({ error: 'No such category' });
    }

    res.status(200).json(category);
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory
}