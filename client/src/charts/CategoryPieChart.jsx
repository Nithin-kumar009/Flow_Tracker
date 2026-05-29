import { PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
const CategoryPieChart = ({ data }) => {
  if (!data.length) return <div style={{color:"#64748b",textAlign:"center",paddingTop:60,fontSize:13}}>No completed tasks yet</div>;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3} dataKey="value">
          {data.map((e,i)=><Cell key={i} fill={e.color}/>)}
        </Pie>
        <Tooltip content={<CustomTooltip/>}/>
        <Legend wrapperStyle={{color:"#94a3b8",fontSize:11}}/>
      </PieChart>
    </ResponsiveContainer>
  );
};
export default CategoryPieChart;