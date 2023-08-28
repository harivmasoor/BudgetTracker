const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const restoreUser = require('../../config/passport').restoreUser;

const User = mongoose.model('User');
const Expense = mongoose.model('Expense');

// Create a new expense
router.post('/', restoreUser, async (req, res, next) => {
  try {
    const { fixedExpenses, variableExpenses, CategoryId, UserId, Notes, Category } = req.body;
    const newExpense = new Expense({
      fixedExpenses,
      variableExpenses,
      UserId,
      Notes,
      Category
    });
    const savedExpense = await newExpense.save();
    res.json(savedExpense);
  } catch (err) {
    next(err);
  }
});

// Fetch all expenses for the logged-in user
router.get('/', restoreUser, async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    const expenses = await Expense.find({ UserId: req.user._id });
    res.json(expenses);
  } catch (err) {
    next(err);
  }
});

// Update an expense
router.put('/:id', restoreUser, async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    
    // Update the properties you want to be editable, for example:
    expense.fixedExpenses = req.body.fixedExpenses || expense.fixedExpenses;
    expense.variableExpenses = req.body.variableExpenses || expense.variableExpenses;
    expense.CategoryId = req.body.CategoryId || expense.CategoryId;
    expense.UserId = req.body.UserId || expense.UserId;
    expense.Notes = req.body.Notes || expense.Notes;
    expense.Category = req.body.Category || expense.Category;

    
    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    next(err);
  }
});

// Delete an expense
router.delete('/:id', restoreUser, async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });
    
    await expense.remove();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
