import React, { useEffect } from "react";

import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/thunks/getUserById";

//Import Icons
import Add from "../../assets/icons/add.svg";
import OwnerHeader from "./OwnerHeader";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";

const Header = (props) => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;

  console.log("userData from Header", userData);
  console.log("currentUserData from Header", currentUserData);

  const goTo = () => {
    navigate("/main");
  };

  return userData && userData.userType === "ownerUser" ? (
    <OwnerHeader />
  ) : (
    <UserHeader />
  );
};

Header.propTypes = {};

export default Header;
