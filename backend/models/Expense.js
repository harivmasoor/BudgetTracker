const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  fixedExpenses: {
    type: Number
  },
  variableExpenses: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String
  },
  category: { type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  date: { 
    type: Date,
    required: true
    }
}, {
  // tells mongoose to add and maintain `createdAt` and `updatedAt` fields with
  // datetime timestamps
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);