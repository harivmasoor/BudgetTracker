const mongoose = require('mongoose');
const Category = require('../models/Category'); // Update this path to point to your actual Category model file

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:tfPoFeVmBbKLLWff@budgetbuddy.zqn6bvq.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected...');
})
.catch(err => console.log(err));

// Popular expense categories
const categories = [
  { name: 'Groceries' },
  { name: 'Dining Out' },
  { name: 'Rent/Mortgage' },
  { name: 'Utilities' },
  { name: 'Gas/Fuel' },
  { name: 'Public Transport' },
  { name: 'Healthcare' },
  { name: 'Insurance' },
  { name: 'Entertainment' },
  { name: 'Clothing' },
  { name: 'Education' },
  { name: 'Personal Care' },
  { name: 'Gifts/Donations' },
  { name: 'Electronics' },
  { name: 'Vacation/Travel' },
  { name: 'Pets' },
  { name: 'Home Maintenance' },
  { name: 'Savings' },
  { name: 'Investments' },
  { name: 'Debt Payment' },
];

// Seed the categories into the database
Category.insertMany(categories)
  .then(() => {
    console.log('Categories seeded successfully!');
    mongoose.connection.close(); // Close the connection
  })
  .catch(err => {
    console.log('Error seeding categories:', err);
  });
