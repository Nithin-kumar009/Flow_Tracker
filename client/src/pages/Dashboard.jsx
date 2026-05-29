import { useMemo } from "react";
import StatCard         from "../components/StatCard";
import CircularProgress from "../components/CircularProgress";
import WeeklyBarChart   from "../charts/WeeklyBarChart";
import { CATEGORIES, CATEGORY_COLORS, PRIORITY_COLORS } from "../constants";
import { calcProductivity } from "../utils/helpers";
import { formatShortDate }  from "../utils/dateUtils";

const Dashboard = ({ tasks, loading, onAdd, isMobile }) => {
  const total     = tasks.length;
  const completed = tasks.filter(t=>t.status==="completed").length;
  const pending   = tasks.filter(t=>t.status==="pending").length;
  const inProg    = tasks.filter(t=>t.status==="in-progress").length;
  const pct       = calcProductivity(tasks);

  const catData = useMemo(()=>
    CATEGORIES.map(c=>({
      name:  c[0].toUpperCase()+c.slice(1),
      total: tasks.filter(t=>t.category===c).length,
      done:  tasks.filter(t=>t.category===c&&t.status==="completed").length,
    })).filter(c=>c.total>0),
  [tasks]);

  const recent = useMemo(()=>
    [...tasks].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5),
  [tasks]);

  if (loading) return <div className="loading-spinner"><div className="spinner-ring"/> Loading dashboard…</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} — Welcome back! 👋
          </p>
        </div>
        <button className="btn-primary" onClick={onAdd}>+ New Task</button>
      </div>
      <div className="stat-cards-grid">
        <StatCard icon="📋" label="Total Tasks"  value={total}     color="#7c3aed"/>
        <StatCard icon="✅" label="Completed"    value={completed} sub={`${pct}% done`} color="#10b981"/>
        <StatCard icon="⏳" label="Pending"      value={pending}   color="#f59e0b"/>
        <StatCard icon="🔄" label="In Progress"  value={inProg}    color="#06b6d4"/>
      </div>
      <div className="chart-grid-2" style={{gridTemplateColumns:isMobile?"1fr":"minmax(250px,1fr) 2fr",marginBottom:18}}>
        <div className="glass-card circ-prog-wrapper">
          <span className="glass-card-title">Productivity Score</span>
          <CircularProgress pct={pct} size={170}/>
          <span className="circ-prog-sub">{pct>=70?"🔥 Excellent!":pct>=40?"💪 Keep pushing!":"⚡ Room to grow!"}</span>
        </div>
        <div className="glass-card">
          <div className="glass-card-title">Tasks by Category</div>
          <WeeklyBarChart data={catData}/>
        </div>
      </div>
      <div className="glass-card">
        <div className="glass-card-title">Recent Tasks</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {recent.map(t=>(
            <div key={t.id} className="recent-task-row">
              <div className="recent-task-dot" style={{background:PRIORITY_COLORS[t.priority]}}/>
              <span className="recent-task-title" style={{color:t.status==="completed"?"#64748b":"white",textDecoration:t.status==="completed"?"line-through":"none"}}>{t.title}</span>
              <span className="badge" style={{background:`${CATEGORY_COLORS[t.category]}22`,color:CATEGORY_COLORS[t.category]}}>{t.category}</span>
              <span className="recent-task-date">{formatShortDate(t.createdAt)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;