import { NAV_ITEMS } from "../constants";
const BottomNav = ({ activePage, onNavigate }) => (
  <nav className="bottom-nav" aria-label="Bottom navigation">
    {NAV_ITEMS.map(item => (
      <button key={item.id} className={`bottom-nav-btn${activePage===item.id?" active":""}`}
        onClick={()=>onNavigate(item.id)}>
        <span className="nav-icon">{item.icon}</span>
        <span className="nav-label">{item.label}</span>
      </button>
    ))}
  </nav>
);
export default BottomNav;