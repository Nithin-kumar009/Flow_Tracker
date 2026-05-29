import { NAV_ITEMS } from "../constants";
const Sidebar = ({ activePage, onNavigate, pendingCount, apiOnline }) => (
  <aside className="sidebar">
    <div className="sidebar-logo">
      <div className="sidebar-logo-inner">
        <div className="sidebar-logo-icon">⚡</div>
        <div>
          <div className="sidebar-logo-name">FlowTrack</div>
          <div className="sidebar-logo-sub">Productivity Suite</div>
        </div>
      </div>
    </div>
    <nav className="sidebar-nav">
      {NAV_ITEMS.map(item => (
        <button key={item.id} className={`nav-btn${activePage===item.id?" active":""}`}
          onClick={()=>onNavigate(item.id)} aria-current={activePage===item.id?"page":undefined}>
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
          {item.id==="tasks"&&pendingCount>0&&<span className="nav-badge">{pendingCount}</span>}
        </button>
      ))}
    </nav>
    <div className="sidebar-footer">
      <div>v1.0 · FlowTrack</div>
      <div className="sidebar-status">
        <span className={apiOnline?"online-dot":"offline-dot"}/>
        {apiOnline?"API connected":"Demo mode"}
      </div>
    </div>
  </aside>
);
export default Sidebar;