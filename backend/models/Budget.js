const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  budgetAmount: {
    type: Number,
    required: true
  },
  budgetPlan: {
    type: String,
    required: true
  },
  date: { type: Date,
    required: true 
    },
  notes: {
    type: String,
    // required: true
  },
  category: { type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
                //  required: true 
            },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  remainingAmount: {
    type: Number
  },
  endDate: { type: Date,
    // required: true 
    },
  startDate: { type: Date,
    // required: true 
    },
  planningInterval:{
    type: String
  }
}, {
  // tells mongoose to add and maintain `createdAt` and `updatedAt` fields with
  // datetime timestamps
  timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema);