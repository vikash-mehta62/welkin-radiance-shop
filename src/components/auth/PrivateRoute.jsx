
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  
    return children;
  

  return <Navigate to="/" />;
}

export default PrivateRoute;
