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

const UserHeader = (props) => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;

  const goTo = () => {
    navigate("/main");
  };
  return user ? (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "100%",
        }}
      >
        <Box>
          <Typography>User WebApp</Typography>
        </Box>
        <Box></Box>
        <Button sx={{ color: "white" }} onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar>
        <Box>
          <Typography>getcour</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
