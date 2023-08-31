import React, { useState, useEffect } from 'react';

const SavingsGoalNotification = ({ goal }) => {
  const [notification, setNotification] = useState('');
  const [show, setShow] = useState(false);
  const { goalAmount, currentAmount } = goal;

  const notificationStyles = {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    zIndex: 1,
    bottom: '10px',
    right: '10px',
  };

  useEffect(() => {
    if (currentAmount >= goalAmount) {
      setNotification('Congratulations! You reached 100% of your savings goal!');
      setShow(true);
    } else if (currentAmount >= 0.75 * goalAmount) {
      setNotification('Great job! You reached 75% of your savings goal!');
      setShow(true);
    } else if (currentAmount >= 0.5 * goalAmount) {
      setNotification('Well done! You reached 50% of your savings goal!');
      setShow(true);
    } else if (currentAmount >= 0.25 * goalAmount) {
      setNotification('Good start! You reached 25% of your savings goal!');
      setShow(true);
    }
  }, [currentAmount, goalAmount]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000); // Hide the notification after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div>
      {show && (
        <div style={notificationStyles}>
          {notification}
        </div>
      )}
    </div>
  );
};

export default SavingsGoalNotification;


