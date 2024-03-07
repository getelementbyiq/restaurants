import { Navigate } from "react-router-dom";
import { UserAuth } from "../../Auth/Auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const IsOwner = ({ children }) => {
  const { user } = UserAuth();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;
  useEffect(() => {
    if (user && userData.userType === "ownerUser") {
      return <Navigate to="/ownerhome" />;
    }
    return children;
  }, [userData]);
};

export default IsOwner;
