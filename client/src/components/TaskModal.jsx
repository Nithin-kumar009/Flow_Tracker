import { useState } from "react";
import { PRIORITIES, CATEGORIES, STATUSES } from "../constants";
import { todayStr } from "../utils/dateUtils";
const TaskModal = ({ task, onSave, onClose }) => {
  const [f, setF] = useState(task ?? {title:"",desc:"",priority:"medium",category:"work",status:"pending",deadline:todayStr()});
  const set = (k,v) => setF(p=>({...p,[k]:v}));
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-content" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">{task?"Edit Task":"New Task"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-fields">
          <div className="modal-field">
            <label className="modal-label">Title *</label>
            <input className="modal-input" value={f.title} onChange={e=>set("title",e.target.value)} placeholder="Task title…"/>
          </div>
          <div className="modal-field">
            <label className="modal-label">Description</label>
            <textarea className="modal-textarea" value={f.desc} onChange={e=>set("desc",e.target.value)} placeholder="Add details…" rows={2}/>
          </div>
          <div className="modal-grid-2">
            <div className="modal-field">
              <label className="modal-label">Priority</label>
              <select className="modal-select" value={f.priority} onChange={e=>set("priority",e.target.value)}>
                {PRIORITIES.map(p=><option key={p} value={p}>{p[0].toUpperCase()+p.slice(1)}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label className="modal-label">Category</label>
              <select className="modal-select" value={f.category} onChange={e=>set("category",e.target.value)}>
                {CATEGORIES.map(c=><option key={c} value={c}>{c[0].toUpperCase()+c.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div className="modal-grid-2">
            <div className="modal-field">
              <label className="modal-label">Status</label>
              <select className="modal-select" value={f.status} onChange={e=>set("status",e.target.value)}>
                {STATUSES.map(s=><option key={s} value={s}>{s[0].toUpperCase()+s.slice(1).replace("-"," ")}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label className="modal-label">Deadline</label>
              <input className="modal-input" type="date" value={f.deadline} onChange={e=>set("deadline",e.target.value)}/>
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-save" onClick={()=>{if(!f.title.trim())return; onSave(f);}}>
              {task?"Update Task":"Create Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskModal;