import { AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
const SevenDayAreaChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={210}>
    <AreaChart data={data} margin={{top:5,right:10,left:-20,bottom:5}}>
      <defs>
        <linearGradient id="sdag1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.5}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/></linearGradient>
        <linearGradient id="sdag2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
      <XAxis dataKey="day"       tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
      <YAxis                     tick={{fill:"#64748b",fontSize:11}} axisLine={false} tickLine={false}/>
      <Tooltip content={<CustomTooltip/>}/>
      <Legend wrapperStyle={{color:"#94a3b8",fontSize:11}}/>
      <Area type="monotone" dataKey="created"   name="Created"   stroke="#7c3aed" fill="url(#sdag1)" strokeWidth={2}/>
      <Area type="monotone" dataKey="completed" name="Completed" stroke="#10b981" fill="url(#sdag2)" strokeWidth={2}/>
    </AreaChart>
  </ResponsiveContainer>
);
export default SevenDayAreaChart;