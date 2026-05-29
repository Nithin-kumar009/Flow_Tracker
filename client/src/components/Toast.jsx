const Toast = ({ toasts }) => (
  <div className="toast-container" role="region" aria-live="polite">
    {toasts.map(t => (
      <div key={t.id} className={`toast ${t.type}`}>
        {t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"} {t.msg}
      </div>
    ))}
  </div>
);
export default Toast;