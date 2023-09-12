const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const restoreUser = require('../../config/passport').restoreUser;

const User = mongoose.model('User');
const SavingsGoal = mongoose.model('SavingsGoal');  // Import the new SavingsGoal model


// Add a new savings goal
router.post('/', restoreUser, async (req, res, next) => {
  try {
    const { goalAmount, currentAmount, user, notes, date } = req.body;

    // if (!goalAmount || isNaN(goalAmount) || !currentAmount || isNaN(currentAmount)) {
    //   return res.status(400).json({ error: 'Invalid goalAmount or currentAmount' });
    // }

    const newSavingsGoal = new SavingsGoal({
      goalAmount,
      currentAmount,
      user,
      notes,
      date
    });

    const savedSavingsGoal = await newSavingsGoal.save();
    res.json(savedSavingsGoal);
  } catch (err) {
    next(err);
  }
});

// Fetch all savings goals for the user
router.get('/', restoreUser, async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    
    const savingsGoals = await SavingsGoal.find({ user: req.user._id });
    res.json(savingsGoals);
  } catch (err) {
    next(err);
  }
});

// Update a savings goal
router.put('/:id', restoreUser, async (req, res, next) => {
  try {
    const savingsGoal = await SavingsGoal.findById(req.params.id);
    if (!savingsGoal) return res.status(404).json({ error: "Savings goal not found" });
    
    // Update properties
    savingsGoal.goalAmount = req.body.goalAmount || savingsGoal.goalAmount;
    savingsGoal.currentAmount = req.body.currentAmount || savingsGoal.currentAmount;
    savingsGoal.notes = req.body.notes || savingsGoal.notes;
    savingsGoal.date = req.body.date || savingsGoal.date;

    const updatedSavingsGoal = await savingsGoal.save();
    res.json(updatedSavingsGoal);
  } catch (err) {
    next(err);
  }
});

// Delete a savings goal
router.delete('/:id', restoreUser, async (req, res, next) => {
  try {
    const savingsGoal = await SavingsGoal.findById(req.params.id);
    if (!savingsGoal) return res.status(404).json({ error: "Savings goal not found" });
    
    await savingsGoal.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
