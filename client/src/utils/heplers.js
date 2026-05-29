export const genId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

export const buildWeekDayData = (tasks) => {
  const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const now  = new Date();
  const ws   = new Date(now); ws.setDate(now.getDate() - now.getDay()); ws.setHours(0,0,0,0);
  return DAYS.map((day, i) => {
    const ds = new Date(ws); ds.setDate(ws.getDate() + i);
    const de = new Date(ds); de.setDate(ds.getDate() + 1);
    return {
      day,
      created:   tasks.filter(t => { const d=new Date(t.createdAt);   return d>=ds&&d<de; }).length,
      done:      tasks.filter(t => { if(!t.completedAt)return false; const d=new Date(t.completedAt); return d>=ds&&d<de; }).length,
    };
  });
};

export const buildMonthWeekData = (tasks) => {
  const weeks = [{week:"Week 1",c:0,d:0},{week:"Week 2",c:0,d:0},{week:"Week 3",c:0,d:0},{week:"Week 4",c:0,d:0}];
  const now   = new Date();
  tasks.forEach(t => {
    const cr = new Date(t.createdAt);
    if (cr.getMonth()!==now.getMonth()||cr.getFullYear()!==now.getFullYear()) return;
    const wi = Math.min(Math.floor((cr.getDate()-1)/7),3);
    weeks[wi].c++;
    if (t.status==="completed") weeks[wi].d++;
  });
  return weeks;
};

export const buildSevenDayActivity = (tasks) =>
  Array.from({length:7},(_,i)=>{
    const dt = new Date(); dt.setDate(dt.getDate()-(6-i));
    const ds = new Date(dt); ds.setHours(0,0,0,0);
    const de = new Date(dt); de.setHours(23,59,59,999);
    return {
      day:       dt.toLocaleDateString("en-US",{weekday:"short"}),
      created:   tasks.filter(t=>{const d=new Date(t.createdAt);  return d>=ds&&d<=de;}).length,
      completed: tasks.filter(t=>{if(!t.completedAt)return false; const d=new Date(t.completedAt);return d>=ds&&d<=de;}).length,
    };
  });

export const calcProductivity = (tasks) =>
  tasks.length ? Math.round((tasks.filter(t=>t.status==="completed").length/tasks.length)*100) : 0;