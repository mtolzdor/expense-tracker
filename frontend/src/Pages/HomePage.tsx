import { NavLink } from "react-router";
import { useAuth } from "../Context/useAuth";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user?.userName ? (
        <div>
          <h1>Welcome {user?.userName}!</h1>

          <button onClick={logout}></button>
        </div>
      ) : (
        <h1>
          please <NavLink to="/login">Login</NavLink>
        </h1>
      )}
    </div>
  );
}
