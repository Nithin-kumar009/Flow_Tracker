require("dotenv").config({ path: require("path").resolve(__dirname,"../../.env") });
const mongoose  = require("mongoose");
const connectDB = require("../config/db");
const Task      = require("../models/Task");

const daysAgo    = (n,h=10) => { const d=new Date(); d.setDate(d.getDate()-n); d.setHours(h,0,0,0); return d; };
const futureDate = (n)      => { const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().split("T")[0]; };

const TASKS = [
  {title:"Design system architecture",  desc:"Create scalable microservices arch",        priority:"urgent",category:"work",     status:"completed",  createdAt:daysAgo(25),completedAt:daysAgo(20),deadline:futureDate(-5)},
  {title:"Q2 financial report",         desc:"Compile and analyze Q2 metrics",            priority:"high",  category:"work",     status:"completed",  createdAt:daysAgo(22),completedAt:daysAgo(18),deadline:futureDate(-3)},
  {title:"Morning yoga routine",        desc:"Daily 30-min yoga session",                 priority:"medium",category:"health",   status:"completed",  createdAt:daysAgo(20),completedAt:daysAgo(20),deadline:futureDate(-2)},
  {title:"React advanced patterns",     desc:"Study render props & compound components",  priority:"high",  category:"learning", status:"completed",  createdAt:daysAgo(18),completedAt:daysAgo(15),deadline:futureDate(-1)},
  {title:"Team sync meeting prep",      desc:"Prepare agenda and slides",                 priority:"medium",category:"work",     status:"completed",  createdAt:daysAgo(16),completedAt:daysAgo(14),deadline:futureDate(-2)},
  {title:"Database optimization",       desc:"Optimize slow queries in production",       priority:"urgent",category:"work",     status:"completed",  createdAt:daysAgo(14),completedAt:daysAgo(12),deadline:futureDate(-1)},
  {title:"Fix critical payment bug",    desc:"Resolve production payment error",          priority:"urgent",category:"work",     status:"completed",  createdAt:daysAgo(3), completedAt:daysAgo(2), deadline:futureDate(-2)},
  {title:"Code review session",         desc:"Review team PRs and give feedback",         priority:"medium",category:"work",     status:"completed",  createdAt:daysAgo(2), completedAt:daysAgo(1), deadline:futureDate(-1)},
  {title:"Write unit tests",            desc:"Add test coverage for auth module",         priority:"high",  category:"work",     status:"completed",  createdAt:daysAgo(2), completedAt:daysAgo(0), deadline:futureDate(-1)},
  {title:"Weekly meal planning",        desc:"Plan healthy meals for the week",           priority:"low",   category:"personal", status:"completed",  createdAt:daysAgo(12),completedAt:daysAgo(11),deadline:futureDate(0) },
  {title:"API documentation",           desc:"Write comprehensive API docs",              priority:"medium",category:"work",     status:"completed",  createdAt:daysAgo(10),completedAt:daysAgo(8), deadline:futureDate(-1)},
  {title:"Read Atomic Habits",          desc:"Finish last 3 chapters",                   priority:"low",   category:"learning", status:"completed",  createdAt:daysAgo(8), completedAt:daysAgo(7), deadline:futureDate(0) },
  {title:"Client presentation",         desc:"Prepare slides for client review",          priority:"high",  category:"work",     status:"in-progress",createdAt:daysAgo(4), completedAt:null,        deadline:futureDate(2) },
  {title:"Mobile app testing",          desc:"Test on iOS and Android devices",           priority:"high",  category:"work",     status:"in-progress",createdAt:daysAgo(3), completedAt:null,        deadline:futureDate(3) },
  {title:"Personal budget review",      desc:"Review monthly expenses",                   priority:"medium",category:"personal", status:"pending",    createdAt:daysAgo(2), completedAt:null,        deadline:futureDate(5) },
  {title:"GraphQL migration",           desc:"Migrate REST APIs to GraphQL",              priority:"high",  category:"work",     status:"pending",    createdAt:daysAgo(2), completedAt:null,        deadline:futureDate(7) },
  {title:"Workout plan update",         desc:"Revise gym schedule for summer",            priority:"low",   category:"health",   status:"pending",    createdAt:daysAgo(1), completedAt:null,        deadline:futureDate(4) },
  {title:"TypeScript deep dive",        desc:"Advanced types and generics course",        priority:"medium",category:"learning", status:"pending",    createdAt:daysAgo(1), completedAt:null,        deadline:futureDate(6) },
  {title:"Home office setup",           desc:"Buy ergonomic chair and desk lamp",         priority:"low",   category:"personal", status:"pending",    createdAt:daysAgo(0), completedAt:null,        deadline:futureDate(10)},
  {title:"Security audit",              desc:"Full security review of the platform",      priority:"urgent",category:"work",     status:"pending",    createdAt:daysAgo(0), completedAt:null,        deadline:futureDate(3) },
];

(async()=>{
  await connectDB();
  await Task.deleteMany({});
  const ins = await Task.insertMany(TASKS);
  console.log(`🌱  Seeded ${ins.length} tasks.`);
  await mongoose.disconnect();
  process.exit(0);
})();