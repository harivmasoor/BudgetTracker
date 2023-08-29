const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const restoreUser = require('../../config/passport').restoreUser;

const User = mongoose.model('User');
const Category = mongoose.model('Category');

// Create a new category
router.post('/', restoreUser, async (req, res, next) => {
  try {
    const {name} = req.body;
    const newCategory = new Category({
        name
    });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    next(err);
  }
});

// Fetch all category for the logged-in user
router.get('/', restoreUser, async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    const categorys = await Category.find();
    res.json(categorys);
  } catch (err) {
    next(err);
  }
});

// Update an category
router.put('/:id', restoreUser, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "income not found" });
    
    // Update the properties you want to be editable, for example:
    category.name = req.body.name || category.name;
    
    const updatedcategory = await category.save();
    res.json(updatedcategory);
  } catch (err) {
    next(err);
  }
});

// Delete an category
router.delete('/:id', restoreUser, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "category not found" });
    
    await category.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;