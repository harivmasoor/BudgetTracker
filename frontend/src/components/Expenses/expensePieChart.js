import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

function ExpensePieChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);  // Add this line to keep a reference to the chart
  const expenses = useSelector(state => state.expenses);

  let totalFixedExpenses = 0;
  let totalVariableExpenses = 0;

  expenses.forEach(expense => {
    if (expense.fixedExpenses) {
      totalFixedExpenses += expense.fixedExpenses;
    }

    if (expense.variableExpenses) {
      totalVariableExpenses += expense.variableExpenses;
    }
  });

  useEffect(() => {
    // Destroy the existing chart if there is one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Fixed Expenses', 'Variable Expenses'],
        datasets: [
          {
            data: [totalFixedExpenses, totalVariableExpenses],
            backgroundColor: ['#0088FE', '#00C49F'],
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

  }, [totalFixedExpenses, totalVariableExpenses]);

  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400"></canvas>
    </div>
  );
}

export default ExpensePieChart;



