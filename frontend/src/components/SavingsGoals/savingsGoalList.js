import { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import SavingsGoalItem from './savingsGoalItem';
import { fetchSavingsGoals } from '../../store/savingsGoal';
import SavingsGoalPieChart, {savingsGoalPieChart} from './SavingsGoalPieChart';

const SavingsGoalList = () => {
  const savingsGoals = useSelector((state) => state.savingsGoal);  // Replace with your actual state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavingsGoals());
  }, []);

  return (
    <div>
              <>
              <SavingsGoalPieChart />
      {savingsGoals?.map((goal) => (
        <SavingsGoalItem key={goal._id} goal={goal} />
      ))}
      </>
    </div>
  );
};

export default SavingsGoalList;
