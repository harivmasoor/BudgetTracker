import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSavingsGoals } from '../../store/savingsGoal';

const SavingsGoalPieChart = () => {
  const chartRef = useRef(null);
  const savingsGoals = useSelector((state) => state.savingsGoal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavingsGoals());
  }, []);

  useEffect(() => {
    const labels = savingsGoals.map(goal => goal.notes);
    const data = savingsGoals.map(goal => goal.goalAmount);
    const backgroundColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple']; // Add more colors if you have more goals

    const chart = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: backgroundColors,
        }],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [savingsGoals]);

  return (
    <div>
      <canvas ref={chartRef} width="450" height="450"></canvas>
    </div>
  );
};

export default SavingsGoalPieChart;
