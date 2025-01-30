import { Outlet } from "react-router";
import { UserProvider } from "./Context/useAuth";
import NavBar from "./Components/NavBar/NavBar";
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
