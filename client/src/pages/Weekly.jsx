import { useMemo } from "react";
import StatCard        from "../components/StatCard";
import WeeklyBarChart  from "../charts/WeeklyBarChart";
import WeeklyAreaChart from "../charts/WeeklyAreaChart";
import { isThisWeek }  from "../utils/dateUtils";
import { buildWeekDayData, calcProductivity } from "../utils/helpers";

const Weekly = ({ tasks }) => {
  const wTasks = useMemo(()=>tasks.filter(t=>isThisWeek(t.createdAt)),[tasks]);
  const wDone  = useMemo(()=>tasks.filter(t=>t.status==="completed"&&isThisWeek(t.completedAt)),[tasks]);
  const pct    = calcProductivity(wTasks);
  const dayData= useMemo(()=>buildWeekDayData(tasks),[tasks]);
  const best   = useMemo(()=>dayData.reduce((b,d)=>d.done>b.done?d:b,dayData[0]),[dayData]);

  const weekLabel = (()=>{
    const now=new Date(), sun=new Date(now); sun.setDate(now.getDate()-now.getDay());
    const sat=new Date(sun); sat.setDate(sun.getDate()+6);
    return `${sun.toLocaleDateString("en-US",{month:"short",day:"numeric"})} – ${sat.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}`;
  })();

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Weekly Report</h1><p className="page-subtitle">Week of {weekLabel}</p></div>
      </div>
      <div className="stat-cards-grid">
        <StatCard icon="📋" label="Created"   value={wTasks.length} color="#7c3aed"/>
        <StatCard icon="✅" label="Completed" value={wDone.length}  sub={`${pct}% rate`} color="#10b981"/>
        <StatCard icon="⏳" label="Pending"   value={wTasks.filter(t=>t.status!=="completed").length} color="#f59e0b"/>
        <StatCard icon="🏆" label="Best Day"  value={best.done>0?best.day:"—"} sub={best.done>0?`${best.done} done`:"No completions"} color="#06b6d4"/>
      </div>
      <div className="chart-grid-2">
        <div className="glass-card"><div className="glass-card-title">Daily Tasks</div><WeeklyBarChart data={dayData}/></div>
        <div className="glass-card"><div className="glass-card-title">Weekly Trend</div><WeeklyAreaChart data={dayData}/></div>
      </div>
      <div className="glass-card">
        <div className="glass-card-title">Performance Summary</div>
        <div className="perf-grid">
          {[
            {label:"Completion Rate",value:`${pct}%`,color:pct>=70?"#10b981":pct>=40?"#f59e0b":"#ef4444"},
            {label:"Avg Tasks/Day",  value:(wDone.length/7).toFixed(1),color:"#7c3aed"},
            {label:"Most Productive",value:best.done>0?best.day:"N/A",color:"#06b6d4"},
            {label:"Performance",    value:pct>=70?"Excellent":pct>=40?"Good":"Needs Work",color:pct>=70?"#10b981":pct>=40?"#f59e0b":"#ef4444"},
          ].map(item=>(
            <div key={item.label} className="perf-item">
              <div className="perf-value" style={{color:item.color}}>{item.value}</div>
              <div className="perf-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Weekly;