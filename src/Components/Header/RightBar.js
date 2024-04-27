import React, { useEffect } from "react";

import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/thunks/getUserById";

//Import Icons
import Add from "../../assets/icons/add.svg";

const RightBar = (props) => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;

  const goTo = () => {
    navigate("/main");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "40px",
        justifyContent: "center",
        flexDirection: "column",
        // border: "1px solid red",
        pt: "8px",
        px: "8px",
        alignItems: "center",
      }}
    >
      <Box>
        {userData && userData.userType === "ownerUser" && (
          <Avatar
            sx={{ width: "32px", height: "32px" }}
            onClick={handleLogout}
          />
        )}
      </Box>
      <Box sx={{ flexGrow: "1" }}></Box>
      <Typography
        sx={{
          fontFamily: "Noto Sans",
          fontSize: "16px",
          fontWeight: "200",
          mb: "24px",
        }}
      >
        AGB
      </Typography>
    </Box>
  );
};

export default RightBar;
