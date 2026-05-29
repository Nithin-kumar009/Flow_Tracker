const Task             = require("../models/Task");
const { asyncHandler } = require("../middleware/asyncHandler");

const weekBounds = () => {
  const now=new Date(), s=new Date(now);
  s.setDate(now.getDate()-now.getDay()); s.setHours(0,0,0,0);
  const e=new Date(s); e.setDate(s.getDate()+7);
  return {start:s,end:e};
};
const monthBounds = () => {
  const now=new Date();
  return { start:new Date(now.getFullYear(),now.getMonth(),1), end:new Date(now.getFullYear(),now.getMonth()+1,0,23,59,59,999) };
};

exports.getWeeklyReport = asyncHandler(async (req,res) => {
  const {start,end} = weekBounds();
  const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const wTasks = await Task.find({createdAt:{$gte:start,$lt:end}}).lean();
  const wDone  = await Task.find({completedAt:{$gte:start,$lt:end},status:"completed"}).lean();

  const dayData = DAYS.map((day,i)=>{
    const ds=new Date(start); ds.setDate(start.getDate()+i);
    const de=new Date(ds);    de.setDate(ds.getDate()+1);
    return {
      day,
      created:   wTasks.filter(t=>{const d=new Date(t.createdAt); return d>=ds&&d<de;}).length,
      completed: wDone.filter( t=>{const d=new Date(t.completedAt);return d>=ds&&d<de;}).length,
    };
  });
  const best = dayData.reduce((b,d)=>d.completed>b.completed?d:b,dayData[0]);
  res.json({
    period:{start,end},
    totalCreated:wTasks.length, totalCompleted:wDone.length,
    totalPending:wTasks.filter(t=>t.status!=="completed").length,
    productivityPct: wTasks.length ? Math.round((wDone.length/wTasks.length)*100) : 0,
    bestDay:{name:best.day,completed:best.completed}, dayData,
  });
});

exports.getMonthlyReport = asyncHandler(async (req,res) => {
  const {start,end} = monthBounds();
  const mTasks = await Task.find({createdAt:{$gte:start,$lte:end}}).lean();
  const mDone  = mTasks.filter(t=>t.status==="completed");

  const weekData = ["Week 1","Week 2","Week 3","Week 4"].map((label,i)=>{
    const bucket = mTasks.filter(t=>Math.min(Math.floor((new Date(t.createdAt).getDate()-1)/7),3)===i);
    return {week:label, created:bucket.length, completed:bucket.filter(t=>t.status==="completed").length};
  });

  const [categoryData, priorityData] = await Promise.all([
    Task.aggregate([{$match:{status:"completed",createdAt:{$gte:start,$lte:end}}},{$group:{_id:"$category",count:{$sum:1}}},{$sort:{count:-1}}]),
    Task.aggregate([{$match:{createdAt:{$gte:start,$lte:end}}},{$group:{_id:"$priority",count:{$sum:1}}},{$sort:{count:-1}}]),
  ]);

  res.json({
    period:{start,end}, totalTasks:mTasks.length, totalCompleted:mDone.length,
    totalPending:mTasks.filter(t=>t.status==="pending").length,
    productivityPct: mTasks.length ? Math.round((mDone.length/mTasks.length)*100) : 0,
    weekData,
    categoryData: categoryData.map(c=>({name:c._id,value:c.count})),
    priorityData: priorityData.map(p=>({name:p._id,value:p.count})),
  });
});

exports.getAnalytics = asyncHandler(async (req,res) => {
  const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate()-7); sevenDaysAgo.setHours(0,0,0,0);
  const recent = await Task.find({createdAt:{$gte:sevenDaysAgo}}).lean();

  const activityData = Array.from({length:7},(_,i)=>{
    const dt=new Date(); dt.setDate(dt.getDate()-(6-i));
    const ds=new Date(dt); ds.setHours(0,0,0,0);
    const de=new Date(dt); de.setHours(23,59,59,999);
    return {
      day: dt.toLocaleDateString("en-US",{weekday:"short"}),
      created:   recent.filter(t=>{const d=new Date(t.createdAt);   return d>=ds&&d<=de;}).length,
      completed: recent.filter(t=>{if(!t.completedAt)return false;  const d=new Date(t.completedAt);return d>=ds&&d<=de;}).length,
    };
  });

  const [totals, catAgg] = await Promise.all([
    Task.aggregate([{$group:{_id:"$status",count:{$sum:1}}}]),
    Task.aggregate([{$group:{_id:"$category",total:{$sum:1},done:{$sum:{$cond:[{$eq:["$status","completed"]},1,0]}}}},{$sort:{total:-1}}]),
  ]);

  const tm = Object.fromEntries(totals.map(t=>[t._id,t.count]));
  res.json({
    activityData,
    totals:{ all:(tm.pending??0)+(tm["in-progress"]??0)+(tm.completed??0), completed:tm.completed??0, inProgress:tm["in-progress"]??0, pending:tm.pending??0 },
    categoryPerformance: catAgg.map(c=>({name:c._id,total:c.total,done:c.done,pct:c.total?Math.round((c.done/c.total)*100):0})),
  });
});