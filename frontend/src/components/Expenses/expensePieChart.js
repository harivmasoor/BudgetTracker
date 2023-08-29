// import { PieChart, Pie, Cell } from 'recharts';
// import { useSelector } from 'react-redux';

// function ExpensePieChart() {
//   const expenses = useSelector(state => state.expenses);

//   // Process data for pie chart
//   const data = [
//     // Example: { name: 'Fixed Expenses', value: 400 }
//     // Populate data array based on your expenses data
//   ];

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         data={data}
//         cx={200}
//         cy={200}
//         labelLine={false}
//         outerRadius={80}
//         fill="#8884d8"
//         dataKey="value"
//       >
//         {
//           data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
//         }
//       </Pie>
//     </PieChart>
//   );
// }


// export default ExpensePieChart;