import { PRIORITY_COLORS, CATEGORY_COLORS } from "../constants";
import { formatShortDate } from "../utils/dateUtils";
const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  const done = task.status === "completed";
  const overdue = !done && task.deadline && new Date(task.deadline) < new Date();
  const pc = PRIORITY_COLORS[task.priority], cc = CATEGORY_COLORS[task.category];
  const sc = done ? "#10b981" : task.status==="in-progress" ? "#f59e0b" : "#64748b";
  return (
    <div className={`task-card${done?" done":""}`}>
      <button className={`toggle-btn${done?" done":""}`} onClick={()=>onToggle(task.id)}
        style={{borderColor: done?"#10b981":pc, color:pc}} aria-label={done?"Mark pending":"Mark complete"}>
        {done && <span style={{fontSize:11,fontWeight:700}}>✓</span>}
      </button>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:3}}>
          <span className={`task-title-text${done?" task-title-done":""}`}>{task.title}</span>
          <span className="badge" style={{background:`${pc}22`,color:pc}}>{task.priority}</span>
          <span className="badge" style={{background:`${cc}22`,color:cc,textTransform:"capitalize"}}>{task.category}</span>
        </div>
        {task.desc && <div className="task-desc">{task.desc}</div>}
        <div className="task-meta">
          <span>📅 {formatShortDate(task.deadline)}</span>
          {overdue && <span className="task-overdue">⚠ Overdue</span>}
          <span style={{color:sc}}>● {task.status.replace("-"," ")}</span>
        </div>
      </div>
      <div className="task-actions">
        <button className="btn-edit"   onClick={()=>onEdit(task)}     aria-label="Edit">✏</button>
        <button className="btn-delete" onClick={()=>onDelete(task.id)} aria-label="Delete">✕</button>
      </div>
    </div>
  );
};
export default TaskCard;