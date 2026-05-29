import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
const MonthlyLineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data} margin={{top:5,right:10,left:-20,bottom:5}}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
      <XAxis dataKey="week" tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
      <YAxis               tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
      <Tooltip content={<CustomTooltip/>}/>
      <Legend wrapperStyle={{color:"#94a3b8",fontSize:11}}/>
      <Line type="monotone" dataKey="c" name="Created"   stroke="#7c3aed" strokeWidth={2} dot={{fill:"#7c3aed",r:3}}/>
      <Line type="monotone" dataKey="d" name="Completed" stroke="#10b981" strokeWidth={2} dot={{fill:"#10b981",r:3}}/>
    </LineChart>
  </ResponsiveContainer>
);
export default MonthlyLineChart;