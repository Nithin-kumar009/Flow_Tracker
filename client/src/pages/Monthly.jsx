import { useMemo } from "react";
import StatCard         from "../components/StatCard";
import MonthlyLineChart from "../charts/MonthlyLineChart";
import CategoryPieChart from "../charts/CategoryPieChart";
import PriorityBarChart from "../charts/PriorityBarChart";
import { CATEGORIES, CATEGORY_COLORS, PRIORITIES, PRIORITY_COLORS } from "../constants";
import { isThisMonth }  from "../utils/dateUtils";
import { buildMonthWeekData, calcProductivity } from "../utils/helpers";

const Monthly = ({ tasks }) => {
  const monthLabel = new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"});
  const mTasks = useMemo(()=>tasks.filter(t=>isThisMonth(t.createdAt)),[tasks]);
  const mDone  = useMemo(()=>tasks.filter(t=>t.status==="completed"&&isThisMonth(t.completedAt??t.createdAt)),[tasks]);
  const pct    = calcProductivity(mTasks);
  const wkData = useMemo(()=>buildMonthWeekData(tasks),[tasks]);
  const pie    = useMemo(()=>CATEGORIES.map(c=>({name:c[0].toUpperCase()+c.slice(1),value:tasks.filter(t=>t.category===c&&t.status==="completed").length,color:CATEGORY_COLORS[c]})).filter(d=>d.value>0),[tasks]);
  const pri    = useMemo(()=>PRIORITIES.map(p=>({name:p[0].toUpperCase()+p.slice(1),value:tasks.filter(t=>t.priority===p).length,color:PRIORITY_COLORS[p]})).filter(d=>d.value>0),[tasks]);

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Monthly Report</h1><p className="page-subtitle">{monthLabel}</p></div>
      </div>
      <div className="stat-cards-grid">
        <StatCard icon="📋" label="Total Tasks"   value={mTasks.length} color="#7c3aed"/>
        <StatCard icon="✅" label="Completed"     value={mDone.length}  sub={`${pct}% rate`} color="#10b981"/>
        <StatCard icon="⏳" label="Pending"       value={mTasks.filter(t=>t.status!=="completed").length} color="#f59e0b"/>
        <StatCard icon="📊" label="Monthly Score" value={`${pct}%`}     color="#06b6d4"/>
      </div>
      <div className="chart-grid-2">
        <div className="glass-card"><div className="glass-card-title">Monthly Trend</div><MonthlyLineChart data={wkData}/></div>
        <div className="glass-card"><div className="glass-card-title">Category Breakdown</div><CategoryPieChart data={pie}/></div>
      </div>
      <div className="glass-card">
        <div className="glass-card-title">Priority Distribution</div>
        <PriorityBarChart data={pri}/>
      </div>
    </div>
  );
};
export default Monthly;