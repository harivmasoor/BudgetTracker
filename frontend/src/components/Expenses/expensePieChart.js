import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import './Expenses.css';


function ExpensePieChart() {
  const categories = useSelector(state => state.categories);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const expenses = useSelector(state => state.expenses);

  // Object to hold category totals
  const categoryTotals = {};

  expenses.forEach(expense => {
    // Extract the category name from the categories array
    const categoryName = categories.filter(category => category._id === expense.category).map(filteredCategory => filteredCategory.name)[0] || 'Uncategorized';

    if (expense.variableExpenses) {
      if (!categoryTotals[categoryName]) {
        categoryTotals[categoryName] = 0;
      }
      categoryTotals[categoryName] += expense.variableExpenses;
    }
  });

  const categoryNames = Object.keys(categoryTotals);
  const categoryValues = Object.values(categoryTotals);

  useEffect(() => {
    // Destroy the existing chart if there is one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categoryNames,  // Categories
        datasets: [
          {
            data: categoryValues,  // Expense totals for each category
            backgroundColor: ['#606060', '#006666', '#A0A0A0', '#6666ff', '#3333ff', '#006633'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Store the new chart instance to this variable for later use in the useEffect
    chartRef.current = newChartInstance;

  }, [categoryNames, categoryValues]);

  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400"></canvas>
    </div>
  );
}

export default ExpensePieChart;



