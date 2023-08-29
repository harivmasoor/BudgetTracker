const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  incomesource: {
    type: String,
    required: true
  },
  incomeamount: {
    type: Number,
    required: true
  },
  category: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
},
}, {
  // tells mongoose to add and maintain `createdAt` and `updatedAt` fields with
  // datetime timestamps
  timestamps: true
});

module.exports = mongoose.model('Income', incomeSchema);