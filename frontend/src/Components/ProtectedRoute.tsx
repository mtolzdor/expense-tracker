import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
}
