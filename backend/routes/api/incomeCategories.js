const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const restoreUser = require('../../config/passport').restoreUser;

const User = mongoose.model('User');
const IncomeCategory = mongoose.model('IncomeCategory');

// Create a new incomecategory
router.post('/', restoreUser, async (req, res, next) => {
  try {
    const {name} = req.body;
    const newIncomeCategory = new IncomeCategory({
        name
    });
    const savedincomeCategory = await newIncomeCategory.save();
    res.json(savedincomeCategory);
  } catch (err) {
    next(err);
  }
});

// Fetch all incomecategory for the logged-in user
router.get('/', restoreUser, async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    const incomeCategorys = await IncomeCategory.find();
    res.json(incomeCategorys);
  } catch (err) {
    next(err);
  }
});

// Update an incomecategory
router.put('/:id', restoreUser, async (req, res, next) => {
  try {
    const incomeCategorys = await IncomeCategory.findById(req.params.id);
    if (!incomeCategorys) return res.status(404).json({ error: "income not found" });
    
    // Update the properties you want to be editable, for example:
    incomeCategorys.name = req.body.name || incomeCategorys.name;
    
    const updatedincomeCategorys = await incomeCategorys.save();
    res.json(updatedincomeCategorys);
  } catch (err) {
    next(err);
  }
});

// Delete an incomecategory
router.delete('/:id', restoreUser, async (req, res, next) => {
  try {
    const incomecategory = await IncomeCategory.findById(req.params.id);
    if (!incomecategory) return res.status(404).json({ error: "incomecategory not found" });
    
    await incomecategory.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;