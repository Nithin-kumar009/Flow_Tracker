import { daysAgo, futureDateStr } from "./dateUtils";

const mk = (id,title,desc,priority,category,status,ca,cmp=null,dl=3) => ({
  id, title, desc, priority, category, status,
  createdAt:   daysAgo(ca),
  completedAt: cmp!==null ? daysAgo(cmp) : null,
  deadline:    futureDateStr(dl),
});

export const SEED_TASKS = [
  mk("1",  "Design system architecture",  "Create scalable microservices arch",        "urgent","work",     "completed",  25,20,-5),
  mk("2",  "Q2 financial report",         "Compile and analyze Q2 metrics",            "high",  "work",     "completed",  22,18,-3),
  mk("3",  "Morning yoga routine",        "Daily 30-min yoga session",                 "medium","health",   "completed",  20,20,-2),
  mk("4",  "React advanced patterns",     "Study render props & compound components",  "high",  "learning", "completed",  18,15,-1),
  mk("5",  "Team sync meeting prep",      "Prepare agenda and slides",                 "medium","work",     "completed",  16,14,-2),
  mk("6",  "Database optimization",       "Optimize slow queries in production",       "urgent","work",     "completed",  14,12,-1),
  mk("7",  "Fix critical payment bug",    "Resolve production payment error",          "urgent","work",     "completed",   3, 2,-2),
  mk("8",  "Code review session",         "Review team PRs and give feedback",         "medium","work",     "completed",   2, 1,-1),
  mk("9",  "Write unit tests",            "Add test coverage for auth module",         "high",  "work",     "completed",   2, 0,-1),
  mk("10", "Weekly meal planning",        "Plan healthy meals for the week",           "low",   "personal", "completed",  12,11, 0),
  mk("11", "API documentation",           "Write comprehensive API docs",              "medium","work",     "completed",  10, 8,-1),
  mk("12", "Read Atomic Habits",          "Finish last 3 chapters",                   "low",   "learning", "completed",   8, 7, 0),
  mk("13", "Client presentation",         "Prepare slides for client review",          "high",  "work",     "in-progress", 4,null,2),
  mk("14", "Mobile app testing",          "Test on iOS and Android devices",           "high",  "work",     "in-progress", 3,null,3),
  mk("15", "Personal budget review",      "Review monthly expenses",                   "medium","personal", "pending",     2,null,5),
  mk("16", "GraphQL migration",           "Migrate REST APIs to GraphQL",              "high",  "work",     "pending",     2,null,7),
  mk("17", "Workout plan update",         "Revise gym schedule for summer",            "low",   "health",   "pending",     1,null,4),
  mk("18", "TypeScript deep dive",        "Advanced types and generics course",        "medium","learning", "pending",     1,null,6),
  mk("19", "Home office setup",           "Buy ergonomic chair and desk lamp",         "low",   "personal", "pending",     0,null,10),
  mk("20", "Security audit",              "Full security review of the platform",      "urgent","work",     "pending",     0,null,3),
];