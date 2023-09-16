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
    const {  budgetAmount, budgetPlan, user, notes, category, date, endDate ,startDate,planningInterval} = req.body;
    const dateObj = new Date(date); // Convert the date string to a Date object
    // const month = dateObj.getMonth() + 1; // getMonth is zero-based
    // const year = dateObj.getFullYear();
    const newBudget = new Budget({
      budgetAmount,
      budgetPlan,
      user,
      notes,
      category,
      date,
      remainingAmount: budgetAmount, 
      endDate,
      startDate,
      planningInterval
    });
    const savedBudget = await newBudget.save();
    res.json(savedBudget);
  } catch (err) {
    next(err);
  }
});

router.get('/', restoreUser, async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    
    const { startDate, endDate ,timeFrame} = req.query;

    let query = { user: req.user._id };
    
    if (timeFrame)
      query.planningInterval = timeFrame

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const budgets = await Budget.find(query);
    res.json(budgets);

  } catch (err) {
    next(err);
  }
});

router.put('/:id', restoreUser, async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ error: "Budget not found" });
    
    // Update the properties you want to be editable, for example:
    budget.budgetAmount = req.body.budgetAmount || budget.budgetAmount;
    budget.budgetPlan = req.body.budgetPlan || budget.budgetPlan;
    budget.user = req.body.user || budget.user;
    budget.notes = req.body.notes || budget.notes;
    budget.category = req.body.category || budget.category;
    budget.date = req.body.date || budget.date;
    budget.endDate = req.body.endDate || budget.endDate;
    budget.startDate = req.body.startDate || budget.startDate;
    budget.planningInterval = req.body.planningInterval || budget.planningInterval;

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