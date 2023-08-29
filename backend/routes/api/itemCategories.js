const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const restoreUser = require('../../config/passport').restoreUser;

const User = mongoose.model('User');
const ItemCategory = mongoose.model('ItemCategory');

// Create a new Itemcategory
router.post('/', restoreUser, async (req, res, next) => {
  try {
    const {name} = req.body;
    const newItemCategory = new ItemCategory({
        name
    });
    const savedItemCategory = await newItemCategory.save();
    res.json(savedItemCategory);
  } catch (err) {
    next(err);
  }
});

// Fetch all Itemcategory for the logged-in user
router.get('/', restoreUser, async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not logged in" });
    const ItemCategorys = await ItemCategory.find();
    res.json(ItemCategorys);
  } catch (err) {
    next(err);
  }
});

// Update an Itemcategory
router.put('/:id', restoreUser, async (req, res, next) => {
  try {
    const ItemCategorys = await ItemCategory.findById(req.params.id);
    if (!ItemCategorys) return res.status(404).json({ error: "income not found" });
    
    // Update the properties you want to be editable, for example:
    ItemCategorys.name = req.body.name || ItemCategorys.name;
    
    const updatedItemCategorys = await ItemCategorys.save();
    res.json(updatedItemCategorys);
  } catch (err) {
    next(err);
  }
});

// Delete an Itemcategory
router.delete('/:id', restoreUser, async (req, res, next) => {
  try {
    const Itemcategory = await ItemCategory.findById(req.params.id);
    if (!Itemcategory) return res.status(404).json({ error: "Itemcategory not found" });
    
    await Itemcategory.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;