const express = require('express');
const mongoose = require('mongoose');
const Budget = require('../../models/Budget');
const router = express.Router();
const restoreUser = require('../../config/passport').restoreUser;

const User = mongoose.model('User');
// const Budget = mongoose.model('Budget');

// Create a new budget
router.post('/', restoreUser, async (req, res, next) => {
  try {
    const {  budgetAmount, budgetPlan, user, notes, category, date } = req.body;
    const newBudget = new Budget({
        budgetAmount,
      budgetPlan,
      user,
      notes,
      category,
      date
    });
    const savedBudget = await newBudget.save();
    res.json(savedBudget);
  } catch (err) {
    next(err);
  }
});

// Fetch all budgets for the logged-in user
router.get('/', restoreUser, async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    const budget = await Budget.find({ user: req.user._id });
    res.json(budget);
  } catch (err) {
    next(err);
  }
});

// Update an budget
router.put('/:id', restoreUser, async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ error: "Budget not found" });
    
    // Update the properties you want to be editable, for example:
    budget.fixedbudgets = req.body.fixedBudgets || budget.fixedBudgets;
    budget.variableBudgets = req.body.variableBudgets || budget.variableBudgets;
    budget.user = req.body.user || budget.user;
    budget.notes = req.body.notes || budget.notes;
    budget.category = req.body.category || budget.category;

    
    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } catch (err) {
    next(err);
  }
});

// Delete an budget
router.delete('/:id', restoreUser, async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!Budget) return res.status(404).json({ error: "budget not found" });
    
    await budget.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;