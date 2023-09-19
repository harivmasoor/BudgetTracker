require('dotenv').config();

const mongoose = require('mongoose');
const Category = require('../models/Category'); // Update this path to point to your actual Category model file
const IncomeCategory = require('../models/IncomeCategory');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// .then(() => {
// })
// .catch(err => console.log(err));

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

const incomeCategories = [
  { name: 'Salary/Wages' },
  { name: 'Bonuses' },
  { name: 'Investment Income' },
  { name: 'Rental Income' },
  { name: 'Business Revenue' },
  { name: 'Freelance Work' },
  { name: 'Pensions' },
  { name: 'Social Security' },
  { name: 'Scholarships/Grants' },
  { name: 'Alimony' },
  { name: 'Child Support' },
  { name: 'Unemployment Benefits' },
  { name: 'Disability Benefits' },
  { name: 'Gifts' },
  { name: 'Selling Goods' },
  { name: 'Royalties' },
  { name: 'Sponsorships' },
  { name: 'Crowdfunding' },
  { name: 'Lottery/Gambling Winnings' },
  { name: 'Other' }
];
// Seed the incomeCategories into the database
const users = [];
users.push(
  new User ({
    username: 'demo',
    email: 'demo@example.com',
    hashedPassword: bcrypt.hashSync('Demo!123', 10)
  })
)
// User.insertMany(users)
//   .then(() => {
//     console.log('users seeded successfully!');
//     mongoose.connection.close(); // Close the connection
//   })
//   .catch(err => {
//     console.log('Error seeding incomeCategories:', err);
//   });
// Seed the categories into the database
// Category.insertMany(categories)
//   .then(() => {
//     console.log('Categories seeded successfully!');
//     mongoose.connection.close(); // Close the connection
//   })
//   .catch(err => {
//     console.log('Error seeding categories:', err);
//   });
// Seed the incomeCategories into the database
// IncomeCategory.insertMany(incomeCategories)
//   .then(() => {
//     console.log('incomeCategories seeded successfully!');
//     mongoose.connection.close(); // Close the connection
//   })
//   .catch(err => {
//     console.log('Error seeding incomeCategories:', err);
//   });