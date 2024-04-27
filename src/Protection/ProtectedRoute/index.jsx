import { Navigate } from "react-router-dom";
import { UserAuth } from "../../Auth/Auth";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;

  console.log("user from protected", user);

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
