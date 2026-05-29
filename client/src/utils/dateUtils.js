export const isThisWeek = (iso) => {
  if (!iso) return false;
  const now = new Date(), date = new Date(iso);
  const start = new Date(now); start.setDate(now.getDate() - now.getDay()); start.setHours(0,0,0,0);
  const end   = new Date(start); end.setDate(start.getDate() + 7);
  return date >= start && date < end;
};

export const isThisMonth = (iso) => {
  if (!iso) return false;
  const d = new Date(iso), now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

export const formatShortDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const daysAgo = (n, hour = 10) => {
  const dt = new Date(); dt.setDate(dt.getDate() - n); dt.setHours(hour, 0, 0, 0);
  return dt.toISOString();
};

export const futureDateStr = (n) => {
  const dt = new Date(); dt.setDate(dt.getDate() + n);
  return dt.toISOString().split("T")[0];
};

export const todayStr = () => new Date().toISOString().split("T")[0];