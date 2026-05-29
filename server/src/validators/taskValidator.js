const PRIORITIES = ["low","medium","high","urgent"];
const CATEGORIES = ["work","personal","health","learning","other"];
const STATUSES   = ["pending","in-progress","completed"];

const validateTask = (body, requireTitle=true) => {
  const errors = [];
  if (requireTitle) {
    if (!body.title?.trim()) errors.push("Title is required.");
    else if (body.title.trim().length > 200) errors.push("Title max 200 chars.");
  }
  if (body.desc?.length > 1000)                       errors.push("Desc max 1000 chars.");
  if (body.priority && !PRIORITIES.includes(body.priority)) errors.push(`Invalid priority.`);
  if (body.category && !CATEGORIES.includes(body.category)) errors.push(`Invalid category.`);
  if (body.status   && !STATUSES.includes(body.status))     errors.push(`Invalid status.`);
  if (body.deadline && isNaN(new Date(body.deadline).getTime())) errors.push("Invalid deadline.");
  return { valid: errors.length===0, errors };
};

module.exports = { validateTask };