import { useState } from "react";
const StatCard = ({ icon, label, value, sub, color }) => {
  const [hov, setHov] = useState(false);
  return (
    <div className="stat-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{boxShadow: hov ? `0 12px 40px ${color}33` : "0 2px 16px rgba(0,0,0,0.3)"}}>
      <div className="stat-card-glow" style={{background:`radial-gradient(circle,${color}44,transparent)`}}/>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
      {sub && <div className="stat-card-sub" style={{color}}>{sub}</div>}
    </div>
  );
};
export default StatCard;