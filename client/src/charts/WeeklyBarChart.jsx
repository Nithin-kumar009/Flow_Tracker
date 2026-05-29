import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
const WeeklyBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={data} margin={{top:5,right:10,left:-20,bottom:5}}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
      <XAxis dataKey="day"     tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
      <YAxis                   tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
      <Tooltip content={<CustomTooltip/>}/>
      <Legend wrapperStyle={{color:"#94a3b8",fontSize:11}}/>
      <Bar dataKey="created" name="Created"   radius={[4,4,0,0]} fill="#7c3aed"/>
      <Bar dataKey="done"    name="Completed" radius={[4,4,0,0]} fill="#10b981"/>
    </BarChart>
  </ResponsiveContainer>
);
export default WeeklyBarChart;