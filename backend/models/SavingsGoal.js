const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savingsGoalSchema = new Schema({
  goalAmount: {
    type: Number,
    required: true
  },
  currentAmount: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String
  },
  date: { 
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SavingsGoal', savingsGoalSchema);
