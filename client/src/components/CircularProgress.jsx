const CircularProgress = ({ pct = 0, size = 180, stroke = 14 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct < 40 ? "#ef4444" : pct < 70 ? "#f59e0b" : "#10b981";
  return (
    <svg width={size} height={size} aria-label={`Productivity: ${pct}%`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{transition:"stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)"}}/>
      <text x={size/2} y={size/2-8}  textAnchor="middle" fill="white"   fontSize={size/5}  fontWeight="800">{pct}%</text>
      <text x={size/2} y={size/2+14} textAnchor="middle" fill="#94a3b8" fontSize={11}>productivity</text>
    </svg>
  );
};
export default CircularProgress;