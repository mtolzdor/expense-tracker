import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";

type Props = {
  children: React.ReactNode;
};

export default function ProtectRoute({ children }: Props) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
