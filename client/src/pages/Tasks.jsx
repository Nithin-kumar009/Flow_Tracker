import { useState, useMemo } from "react";
import TaskCard from "../components/TaskCard";
import { PRIORITIES, CATEGORIES, STATUSES } from "../constants";

const Tasks = ({ tasks, loading, onAdd, onEdit, onDelete, onToggle }) => {
  const [q,setQ]=useState(""), [cat,setCat]=useState("all"), [pri,setPri]=useState("all"), [stat,setStat]=useState("all");

  const filtered = useMemo(()=>tasks.filter(t=>{
    if (q&&!t.title.toLowerCase().includes(q.toLowerCase())&&!t.desc?.toLowerCase().includes(q.toLowerCase())) return false;
    if (cat!=="all"&&t.category!==cat)  return false;
    if (pri!=="all"&&t.priority!==pri)  return false;
    if (stat!=="all"&&t.status!==stat)  return false;
    return true;
  }),[tasks,q,cat,pri,stat]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tasks</h1>
        <button className="btn-primary" onClick={onAdd}>+ New Task</button>
      </div>
      <div className="filter-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input className="search-input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tasks…"/>
        </div>
        <select className="filter-select" value={cat}  onChange={e=>setCat(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c=><option key={c} value={c}>{c[0].toUpperCase()+c.slice(1)}</option>)}
        </select>
        <select className="filter-select" value={pri}  onChange={e=>setPri(e.target.value)}>
          <option value="all">All Priorities</option>
          {PRIORITIES.map(p=><option key={p} value={p}>{p[0].toUpperCase()+p.slice(1)}</option>)}
        </select>
        <select className="filter-select" value={stat} onChange={e=>setStat(e.target.value)}>
          <option value="all">All Statuses</option>
          {STATUSES.map(s=><option key={s} value={s}>{s[0].toUpperCase()+s.slice(1).replace("-"," ")}</option>)}
        </select>
      </div>
      <p className="task-count-label">{filtered.length} task{filtered.length!==1?"s":""} found</p>
      {loading ? (
        <div className="loading-spinner"><div className="spinner-ring"/> Loading…</div>
      ) : filtered.length===0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No tasks found</div>
          <div className="empty-state-sub">Adjust filters or create a new task</div>
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {filtered.map(t=><TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle}/>)}
        </div>
      )}
    </div>
  );
};
export default Tasks;