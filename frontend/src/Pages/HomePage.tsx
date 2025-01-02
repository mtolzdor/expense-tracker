import { NavLink } from "react-router";
import { useAuth } from "../Context/useAuth";

export default function HomePage() {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      {user?.userName ? (
        <h1>Welcome {user?.userName}!</h1>
      ) : (
        <h1>
          please <NavLink to="/login">Login</NavLink>
        </h1>
      )}
    </div>
  );
}
