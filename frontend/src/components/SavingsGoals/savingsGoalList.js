import { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import SavingsGoalItem from './savingsGoalItem';
import { fetchSavingsGoals } from '../../store/savingsGoal';

const SavingsGoalList = () => {
  const savingsGoals = useSelector((state) => state.savingsGoal);  // Replace with your actual state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavingsGoals());
  }, []);

  return (
    <div>
      {savingsGoals?.map((goal) => (
        <SavingsGoalItem key={goal._id} goal={goal} />
      ))}
    </div>
  );
};

export default SavingsGoalList;
