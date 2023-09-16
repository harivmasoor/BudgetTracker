const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const restoreUser = require('../../config/passport').restoreUser;

const User = mongoose.model('User');
const Expense = mongoose.model('Expense');
const Budget = mongoose.model('Budget');


router.post('/', restoreUser, async (req, res, next) => {
    try {
      const { fixedExpenses, variableExpenses, user, notes, category, date } = req.body;
  
      // Validate variableExpenses
      if (!variableExpenses || isNaN(variableExpenses)) {
        return res.status(400).json({ error: 'Invalid variableExpenses' });
      }
  
      const newExpense = new Expense({
        fixedExpenses,
        variableExpenses,
        user,
        notes,
        category,
        date
      });
      
      const savedExpense = await newExpense.save();
  
      const budgetStartDate = new Date(newExpense.date);
      budgetStartDate.setDate(1); // Set day to 1st
      budgetStartDate.setHours(0, 0, 0, 0); // Set time to midnight
      
      const relatedBudget = await Budget.find({
        user: req.user._id,
        category: newExpense.category,
        endDate: {
          $gte: newExpense.date      // Start of the month for newExpense.date
        },
        startDate: {
          $lte: newExpense.date      // Start of the month for newExpense.date
        },
      });
      
      if (Array.isArray(relatedBudget)) {
        for (const budget of relatedBudget) {
          if (!isNaN(budget.remainingAmount)) {
            // Update the remainingAmount in the related budget
            budget.remainingAmount -= newExpense.variableExpenses;
            await budget.save();
          }
        }
      } else if (relatedBudget && !isNaN(relatedBudget.remainingAmount)) {
        // Update the remainingAmount in the related budget
        relatedBudget.remainingAmount -= newExpense.variableExpenses;
        await relatedBudget.save();
        // return res.status(400).json({ error: 'Related budget or remaining amount is invalid' });
      }
      
  
      res.json(savedExpense);
    } catch (err) {
      next(err);
    }
  });
  

  router.get('/', restoreUser, async (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Not logged in" });
      
      const { startDate, endDate } = req.query;
  
      let query = { user: req.user._id };
  
      if (startDate && endDate) {
        query.date = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
  
      const expenses = await Expense.find(query);
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
    expense.user = req.body.user || expense.user;
    expense.notes = req.body.notes || expense.notes;
    expense.category = req.body.category || expense.category;
    expense.date = req.body.date || expense.date;

    
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

    await expense.deleteOne();
    
    const budgetStartDate = new Date(expense.date);
      budgetStartDate.setDate(1); // Set day to 1st
      budgetStartDate.setHours(0, 0, 0, 0); // Set time to midnight
      
      const relatedBudget = await Budget.find({
        user: req.user._id,
        category: expense.category,
        endDate: {
          $gte: expense.date      // Start of the month for expense.date
        },
        startDate: {
          $lte: expense.date      // Start of the month for expense.date
        },
      });
      
      if (Array.isArray(relatedBudget)) {
        for (const budget of relatedBudget) {
          if (!isNaN(budget.remainingAmount)) {
            // Update the remainingAmount in the related budget
            budget.remainingAmount += expense.variableExpenses;
            await budget.save();
          }
        }
      } else if (relatedBudget && !isNaN(relatedBudget.remainingAmount)) {
        // Update the remainingAmount in the related budget
        relatedBudget.remainingAmount += expense.variableExpenses;
        await relatedBudget.save();
        // return res.status(400).json({ error: 'Related budget or remaining amount is invalid' });
      }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
