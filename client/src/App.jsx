import { useState, useEffect } from "react";
import { useTasks }   from "./hooks/useTasks";
import Sidebar        from "./components/Sidebar";
import BottomNav      from "./components/BottomNav";
import Toast          from "./components/Toast";
import TaskModal      from "./components/TaskModal";
import Dashboard      from "./pages/Dashboard";
import Tasks          from "./pages/Tasks";
import Weekly         from "./pages/Weekly";
import Monthly        from "./pages/Monthly";
import Analytics      from "./pages/Analytics";
import "./styles/global.css";
import "./styles/components.css";

export default function App() {
  const [page,     setPage]     = useState("dashboard");
  const [modal,    setModal]    = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  const {
    tasks, loading, error, toasts, apiOnline,
    addTask, editTask, deleteTask, toggleTask,
  } = useTasks();

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const handleSave = (form) => {
    modal?.task ? editTask(form) : addTask(form);
    setModal(null);
  };

  const pageProps = {
    tasks, loading, error, isMobile,
    onAdd:    ()     => setModal({}),
    onEdit:   (task) => setModal({ task }),
    onDelete: deleteTask,
    onToggle: toggleTask,
  };

  return (
    <div className="app-root">
      {!isMobile && (
        <Sidebar
          activePage={page}
          onNavigate={setPage}
          pendingCount={tasks.filter(t => t.status === "pending").length}
          apiOnline={apiOnline}
        />
      )}

      <main className="app-main" style={{ paddingBottom: isMobile ? 80 : 28 }}>
        {error && <div className="error-banner">{error}</div>}
        {page === "dashboard" && <Dashboard  {...pageProps} />}
        {page === "tasks"     && <Tasks      {...pageProps} />}
        {page === "weekly"    && <Weekly     tasks={tasks}  isMobile={isMobile} />}
        {page === "monthly"   && <Monthly    tasks={tasks}  isMobile={isMobile} />}
        {page === "analytics" && <Analytics  tasks={tasks}  />}
      </main>

      {isMobile && <BottomNav activePage={page} onNavigate={setPage} />}

      {modal !== null && (
        <TaskModal
          task={modal.task}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      <Toast toasts={toasts} />
    </div>
  );
}