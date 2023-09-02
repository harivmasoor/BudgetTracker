import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js';

const SavingsGoalBar = () => {
  const canvasRef = useRef(null);
  const savingsGoals = useSelector((state) => state.savingsGoal);
  let chart;

  const data = {
    labels: savingsGoals.map((goal) => goal.notes),
    datasets: [
      {
        label: 'Current Savings',
        data: savingsGoals.map((goal) => goal.currentAmount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Goal Amount',
        data: savingsGoals.map((goal) => goal.goalAmount),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize chart
      const ctx = canvasRef.current.getContext('2d');
      chart = new Chart(ctx, {
        type: 'doughnut',
        data,
      });
    }
    return () => {
      // Cleanup chart if component is unmounted
      if (chart) {
        chart.destroy();
      }
    };
  }, [savingsGoals]);  // Re-run effect if `savingsGoals` change

  return (
    <div>
      <canvas ref={canvasRef} width="400" height="400"></canvas>
    </div>
  );
};

export default SavingsGoalBar;
