import { NavLink } from "react-router";
import { useAuth } from "../../context/useAuth";
import "./NavBar.css";

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <NavLink className="navbar-brand" to="">
        Expense Tracker
      </NavLink>

      <div className="nav-items">
        <span className="nav-item">
          <a>Welcome! {user?.userName}</a>
        </span>
        <span className="nav-item">
          <NavLink className="nav-link" to="/expenses">
            Expenses
          </NavLink>
        </span>
        <span className="nav-item">
          <button type="button" onClick={logout}>
            Logout
          </button>
        </span>
      </div>
    </nav>
  );
}
