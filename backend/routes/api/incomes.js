const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const restoreUser = require('../../config/passport').restoreUser;

const User = mongoose.model('User');
const Income = mongoose.model('Income');

// Create a new income
router.post('/', restoreUser, async (req, res, next) => {
  try {
    const {user, incomesource, incomeamount, category } = req.body;
    const newIncome = new Income({
      user,
      incomesource,
      incomeamount,
      category
    });
    const savedIncome = await newIncome.save();
    res.json(await savedExpense.populate("category"));
  } catch (err) {
    next(err);
  }
});

// Fetch all income for the logged-in user
router.get('/', restoreUser, async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    const incomes = await Income.find({ user: req.user._id });
    res.json(incomes);
  } catch (err) {
    next(err);
  }
});

// Update an income
router.put('/:id', restoreUser, async (req, res, next) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ error: "income not found" });
    
    // Update the properties you want to be editable, for example:
    income.user = req.body.user || income.user;
    income.incomesource = req.body.incomesource || income.incomesource;
    income.incomeamount = req.body.incomeamount || income.incomeamount;
    income.category = req.body.category || income.category;
    
    const updatedincome = await income.save();
    res.json(updatedincome);
  } catch (err) {
    next(err);
  }
});

// Delete an income
router.delete('/:id', restoreUser, async (req, res, next) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ error: "income not found" });
    
    await income.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
