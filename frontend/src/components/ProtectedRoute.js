import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

function ProtectedRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
