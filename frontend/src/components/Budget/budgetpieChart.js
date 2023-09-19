import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import './Budget.css';

function BudgetPieChart() {
    const categories = useSelector(state => state.categories);
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const budgets = useSelector(state => state.budget.chart);

    // Object to hold category totals
    const categoryTotals = {};

    budgets.forEach(budget => {
        // Extract the category name from the categories array
        const categoryName = categories.filter(category => category._id === budget.category).map(filteredCategory => filteredCategory.name)[0] || 'Uncategorized';

        if (budget.budgetAmount) {
        if (!categoryTotals[categoryName]) {
            categoryTotals[categoryName] = 0;
        }
        categoryTotals[categoryName] += budget.budgetAmount;
        }
    });

    const categoryNames = Object.keys(categoryTotals);
    const categoryValues = Object.values(categoryTotals);

    useEffect(() => {
        if (categoryNames.length === 0 || categoryValues.length === 0) {
            return;
          }
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
                backgroundColor: ['#0088FE', '#00C49F', '#606060', '#00435F', '#00B3FF', '#A0A0A0', '#003CFF', '#788098', '#006633', '#0E6C00', '#0026A2'],
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
        <div className="budgets-page-container">
        <canvas ref={canvasRef} width="450" height="450"></canvas>
        </div>
    );
    }

    export default React.memo(BudgetPieChart);