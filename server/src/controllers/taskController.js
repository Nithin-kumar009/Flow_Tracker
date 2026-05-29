const Task             = require("../models/Task");
const { validateTask } = require("../validators/taskValidator");
const { asyncHandler } = require("../middleware/asyncHandler");
const { buildQueryFilter, buildSortOption } = require("../utils/queryHelpers");

exports.getAllTasks = asyncHandler(async (req,res) => {
  const tasks = await Task.find(buildQueryFilter(req.query)).sort(buildSortOption(req.query.sort)).lean();
  res.json(tasks);
});

exports.getTaskById = asyncHandler(async (req,res) => {
  const task = await Task.findById(req.params.id).lean();
  if (!task) { res.status(404); throw new Error("Task not found."); }
  res.json(task);
});

exports.createTask = asyncHandler(async (req,res) => {
  const { valid, errors } = validateTask(req.body, true);
  if (!valid) { res.status(400); throw new Error(errors.join(" | ")); }
  const task = await Task.create({
    title:    req.body.title.trim(),
    desc:     req.body.desc?.trim() ?? "",
    priority: req.body.priority ?? "medium",
    category: req.body.category ?? "work",
    status:   req.body.status   ?? "pending",
    deadline: req.body.deadline ?? null,
  });
  res.status(201).json(task);
});

exports.updateTask = asyncHandler(async (req,res) => {
  const { valid, errors } = validateTask(req.body, false);
  if (!valid) { res.status(400); throw new Error(errors.join(" | ")); }
  const task = await Task.findById(req.params.id);
  if (!task) { res.status(404); throw new Error("Task not found."); }
  ["title","desc","priority","category","status","deadline","completedAt"].forEach(f => {
    if (req.body[f] !== undefined) task[f] = req.body[f];
  });
  res.json(await task.save());
});

exports.deleteTask = asyncHandler(async (req,res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) { res.status(404); throw new Error("Task not found."); }
  res.json({ message:"Deleted", id:req.params.id });
});

exports.toggleTask = asyncHandler(async (req,res) => {
  const task = await Task.findById(req.params.id);
  if (!task) { res.status(404); throw new Error("Task not found."); }
  task.status = task.status==="completed" ? "pending" : "completed";
  res.json(await task.save());
});