export const PRIORITIES = ["low", "medium", "high", "urgent"];
export const CATEGORIES = ["work", "personal", "health", "learning", "other"];
export const STATUSES   = ["pending", "in-progress", "completed"];

export const PRIORITY_COLORS = {
  low: "#10b981", medium: "#f59e0b", high: "#f97316", urgent: "#ef4444",
};

export const CATEGORY_COLORS = {
  work: "#7c3aed", personal: "#06b6d4", health: "#10b981",
  learning: "#f59e0b", other: "#94a3b8",
};

export const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "tasks",     icon: "☑", label: "Tasks"     },
  { id: "weekly",    icon: "📅", label: "Weekly"    },
  { id: "monthly",   icon: "📆", label: "Monthly"   },
  { id: "analytics", icon: "📈", label: "Analytics" },
];