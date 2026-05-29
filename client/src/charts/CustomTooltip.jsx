const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:"#0f1229",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 14px",fontSize:13}}>
      {label && <div style={{color:"#94a3b8",marginBottom:4}}>{label}</div>}
      {payload.map((p,i)=><div key={i} style={{color:p.color??"white",fontWeight:600}}>{p.name}: {p.value}</div>)}
    </div>
  );
};
export default CustomTooltip;