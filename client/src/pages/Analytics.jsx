import { useMemo } from "react";
import StatCard          from "../components/StatCard";
import SevenDayAreaChart from "../charts/SevenDayAreaChart";
import { CATEGORIES, CATEGORY_COLORS } from "../constants";
import { buildSevenDayActivity, calcProductivity } from "../utils/helpers";

const Analytics = ({ tasks }) => {
  const pct      = calcProductivity(tasks);
  const activity = useMemo(()=>buildSevenDayActivity(tasks),[tasks]);
  const catPerf  = useMemo(()=>
    CATEGORIES.map(c=>{
      const ct=tasks.filter(t=>t.category===c), done=ct.filter(t=>t.status==="completed").length;
      return {name:c[0].toUpperCase()+c.slice(1),total:ct.length,done,pct:ct.length?Math.round((done/ct.length)*100):0,color:CATEGORY_COLORS[c]};
    }).filter(c=>c.total>0),
  [tasks]);

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Analytics</h1><p className="page-subtitle">All-time performance insights</p></div>
      </div>
      <div className="stat-cards-grid">
        <StatCard icon="📊" label="Overall Rate"  value={`${pct}%`} color="#7c3aed"/>
        <StatCard icon="✅" label="Total Done"    value={tasks.filter(t=>t.status==="completed").length}   color="#10b981"/>
        <StatCard icon="⚡" label="In Progress"  value={tasks.filter(t=>t.status==="in-progress").length} color="#f59e0b"/>
        <StatCard icon="🎯" label="Pending"       value={tasks.filter(t=>t.status==="pending").length}     color="#ef4444"/>
      </div>
      <div className="glass-card" style={{marginBottom:18}}>
        <div className="glass-card-title">7-Day Activity</div>
        <SevenDayAreaChart data={activity}/>
      </div>
      <div className="glass-card">
        <div className="glass-card-title">Category Performance</div>
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          {catPerf.map(c=>(
            <div key={c.name} className="progress-bar-row">
              <span className="progress-bar-name">{c.name}</span>
              <div className="progress-bar-track"><div className="progress-bar-fill" style={{width:`${c.pct}%`,background:`linear-gradient(90deg,${c.color},${c.color}99)`}}/></div>
              <span className="progress-bar-pct" style={{color:c.color}}>{c.pct}%</span>
              <span className="progress-bar-count">{c.done}/{c.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Analytics;