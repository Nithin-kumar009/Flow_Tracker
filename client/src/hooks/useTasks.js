import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/api";
import { SEED_TASKS }  from "../utils/seedData";

/**
 * Central hook — all task CRUD with:
 *  - Real API calls (MongoDB Atlas via Express)
 *  - Optimistic UI updates (instant feedback, no waiting)
 *  - Automatic fallback to seed data when backend is unreachable
 *  - Toast notifications
 */
export const useTasks = () => {
  const [tasks,      setTasks]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [toasts,     setToasts]     = useState([]);
  const [apiOnline,  setApiOnline]  = useState(true);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const toast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  // ── Normalise MongoDB _id → id ─────────────────────────────────────────
  const normalise = (t) => ({ ...t, id: t._id ?? t.id });

  // ── Fetch all tasks ───────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data.map(normalise));
      setApiOnline(true);
    } catch (err) {
      console.warn("API unreachable — using seed data:", err.message);
      setTasks(SEED_TASKS);
      setApiOnline(false);
      setError("⚠ Backend offline — showing demo data. Check your API connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // ── Add task ──────────────────────────────────────────────────────────────
  const addTask = useCallback(async (form) => {
    // 1. Optimistic insert with a temp id
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      ...form,
      id:          tempId,
      createdAt:   new Date().toISOString(),
      completedAt: form.status === "completed" ? new Date().toISOString() : null,
    };
    setTasks(prev => [optimistic, ...prev]);

    if (!apiOnline) { toast("Task saved locally (demo mode) 🎉", "info"); return; }

    try {
      const created = normalise(await taskService.create(form));
      // 2. Replace temp entry with the real persisted document
      setTasks(prev => prev.map(t => t.id === tempId ? created : t));
      toast("Task created! 🎉");
    } catch (err) {
      // Roll back optimistic insert on failure
      setTasks(prev => prev.filter(t => t.id !== tempId));
      toast(`Failed to create task: ${err.message}`, "error");
    }
  }, [apiOnline, toast]);

  // ── Edit task ─────────────────────────────────────────────────────────────
  const editTask = useCallback(async (form) => {
    const prev = tasks.find(t => t.id === form.id);

    // Optimistic update
    setTasks(prev => prev.map(t =>
      t.id !== form.id ? t : {
        ...t, ...form,
        completedAt: form.status === "completed" && !t.completedAt
          ? new Date().toISOString() : t.completedAt,
      }
    ));

    if (!apiOnline) { toast("Task updated ✓", "info"); return; }

    try {
      const updated = normalise(await taskService.update(form.id, form));
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
      toast("Task updated ✓");
    } catch (err) {
      // Roll back on failure
      if (prev) setTasks(p => p.map(t => t.id === form.id ? prev : t));
      toast(`Failed to update: ${err.message}`, "error");
    }
  }, [tasks, apiOnline, toast]);

  // ── Delete task ───────────────────────────────────────────────────────────
  const deleteTask = useCallback(async (id) => {
    const snapshot = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));  // optimistic remove

    if (!apiOnline) { toast("Task deleted", "error"); return; }

    try {
      await taskService.remove(id);
      toast("Task deleted", "error");
    } catch (err) {
      // Roll back
      if (snapshot) setTasks(prev => [snapshot, ...prev]);
      toast(`Failed to delete: ${err.message}`, "error");
    }
  }, [tasks, apiOnline, toast]);

  // ── Toggle complete ───────────────────────────────────────────────────────
  const toggleTask = useCallback(async (id) => {
    const current = tasks.find(t => t.id === id);
    if (!current) return;

    const patched = {
      ...current,
      status:      current.status === "completed" ? "pending" : "completed",
      completedAt: current.status !== "completed" ? new Date().toISOString() : null,
    };

    setTasks(prev => prev.map(t => t.id === id ? patched : t));  // optimistic

    if (!apiOnline) { toast("Status updated ✓", "info"); return; }

    try {
      const updated = normalise(await taskService.toggle(id));
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
      toast("Status updated ✓");
    } catch (err) {
      setTasks(prev => prev.map(t => t.id === id ? current : t));  // roll back
      toast(`Failed to toggle: ${err.message}`, "error");
    }
  }, [tasks, apiOnline, toast]);

  return { tasks, loading, error, toasts, apiOnline, addTask, editTask, deleteTask, toggleTask };
};