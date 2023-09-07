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
    if (savingsGoals.length === 0) {
        return;
    }
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h2 style={{ textAlign: 'center' }}>Total Savings Goals</h2>
      <div style={{
        width: '450px',
        height: '450px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
      </div>
    </div>
  );
};

export default SavingsGoalPieChart;


