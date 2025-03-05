import { Outlet } from "react-router";
import { UserProvider } from "./context/useAuth";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

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
