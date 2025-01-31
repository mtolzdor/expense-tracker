import { Outlet } from "react-router";
import { UserProvider } from "./Context/useAuth";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <UserProvider>
        <NavBar />
        <Outlet />
      </UserProvider>
    </>
  );
}

export default App;
