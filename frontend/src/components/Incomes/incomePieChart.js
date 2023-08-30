import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

function IncomePieChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const incomes = useSelector(state => state.incomes);

  // Object to hold category totals
  const categoryTotals = {};

  incomes.forEach(income => {
    const categoryName = income.category ? income.category.name : 'Uncategorized';
    if (income.incomeamount) {
      if (!categoryTotals[categoryName]) {
        categoryTotals[categoryName] = 0;
      }
      categoryTotals[categoryName] += income.incomeamount;
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
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
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

export default IncomePieChart;




