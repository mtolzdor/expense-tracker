import { NavLink } from "react-router";
import "./Home.css";
import { useAuth } from "../../../../context/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      {user?.userName ? (
        <div>
          <h1>Welcome! {user?.userName}</h1>
          <h2>
            begin tracking your
            <NavLink to="/expenses"> Expenses</NavLink>
          </h2>
        </div>
      ) : (
        <div>
          <h1>
            Create a new <NavLink to="/register">Account</NavLink> to get
            started
          </h1>
          <h2>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </h2>
        </div>
      )}
    </div>
  );
}
