import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Cell,ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
const PriorityBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={160}>
    <BarChart data={data} margin={{top:5,right:10,left:-20,bottom:5}}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
      <XAxis dataKey="name" tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
      <YAxis               tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
      <Tooltip content={<CustomTooltip/>}/>
      <Bar dataKey="value" name="Tasks" radius={[7,7,0,0]}>{data.map((e,i)=><Cell key={i} fill={e.color}/>)}</Bar>
    </BarChart>
  </ResponsiveContainer>
);
export default PriorityBarChart;