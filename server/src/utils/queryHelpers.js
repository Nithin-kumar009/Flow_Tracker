const buildQueryFilter = ({ status, priority, category, search }={}) => {
  const f = {};
  if (status   && status!=="all")   f.status   = status;
  if (priority && priority!=="all") f.priority = priority;
  if (category && category!=="all") f.category = category;
  if (search?.trim()) {
    const rx = new RegExp(search.trim(),"i");
    f.$or = [{title:rx},{desc:rx}];
  }
  return f;
};

const buildSortOption = (sort) => ({
  oldest:   {createdAt:1},
  priority: {priority:-1,createdAt:-1},
  deadline: {deadline:1,createdAt:-1},
}[sort] || {createdAt:-1});

module.exports = { buildQueryFilter, buildSortOption };