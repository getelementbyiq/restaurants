import React, { useEffect, useState } from "react";

import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  Button,
  IconButton,
  Avatar,
  ToggleButtonGroup,
  Collapse,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/thunks/getUserById";

//Import Icons
import Add from "../../assets/icons/add.svg";
import OpenFirst, {
  setOpenFirst,
} from "../../Redux/functions/slices/OpenFirst";
import { setShow } from "../../Redux/functions/slices/Show";
import MainIconNonActive from "../../assets/icons/main.svg";
import MainIconActive from "../../assets/icons/mainactive.svg";
import LocationNoneActive from "../../assets/icons/location.svg";
import LocationActive from "../../assets/icons/locationactive.svg";
import { setOpenSecond } from "../../Redux/functions/slices/OpenSecond";
import { setOpenThird } from "../../Redux/functions/slices/OpenThird";
import ToggleButtons from "../ToggleButton";

const OwnerHeaderWithoutRestaurant = (props) => {
  const dispatch = useDispatch();
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  console.log("restaurantData", createRestaurantData);
  const blob = new Blob([createRestaurantData.logo]);
  //open Restaurant Name and Logo
  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);
  const openThird = useSelector((state) => state.openThird);
  const show = useSelector((state) => state.show);
  const haveRestaurant = useSelector((state) => state.haveRestaurant);

  const handleAddButtonClick = () => {
    dispatch(setOpenFirst(!openFirst));
    dispatch(setShow(!show));
  };
  const handleLogoButtonClick = () => {
    dispatch(setOpenFirst(!openFirst));
  };

  const handleOpenSecond = () => {
    dispatch(setOpenSecond(!openSecond));
  };
  const handleOpenThird = () => {
    dispatch(setOpenThird(!openThird));
  };

  const [mainButtonAligment, setMainButtonAlignmet] = useState("left");

  const toggleOpen = (toggleValue) => {
    dispatch(toggleValue);
  };

  console.log("jetzt ist die OpenFirst", openFirst);
  //-------------------------------------------
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;

  console.log("open Firstfrom owner header---- ", openFirst);

  const goTo = () => {
    navigate("/main");
  };
  return user ? (
    <AppBar
      sx={{
        position: "sticky !important",
        background: "transparent",
        boxShadow: "none",
        color: "#4A4A4A",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "8px" }}>
          {!show && (
            <IconButton
              onClick={handleAddButtonClick}
              sx={{
                background: "#5FD6DD",
                "&:hover": { background: "#00E0ED" },
              }}
            >
              <img
                src={Add}
                alt="Add"
                style={{
                  transition: "150ms",
                  transform: openFirst ? "rotate(45deg)" : "",
                }}
              />
            </IconButton>
          )}
          {show && (
            <Box
              sx={{
                borderRadius: "32px",
                background: "rgba(239, 239, 239, 0.15)",
                backdropFilter: "blur(7.5px)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  mx: "8px",
                }}
              >
                <ToggleButtonGroup>
                  <IconButton
                    onClick={() => toggleOpen(setOpenFirst(!openFirst))}
                  >
                    <Avatar
                      src={URL.createObjectURL(blob)}
                      sx={{ border: openFirst ? "1px solid #5FD6DD" : "none" }}
                    />
                  </IconButton>
                </ToggleButtonGroup>
                <Typography sx={{ color: openFirst ? "#5FD6DD" : "#fff" }}>
                  {createRestaurantData.name}
                </Typography>
                <IconButton
                  onClick={() => toggleOpen(setOpenSecond(!openSecond))}
                >
                  {openSecond && !openThird ? (
                    <img src={MainIconActive} alt="" />
                  ) : (
                    <img src={MainIconNonActive} alt="" />
                  )}
                </IconButton>
              </Box>
            </Box>
          )}
          {show && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "32px",
                background: "rgba(239, 239, 239, 0.15)",
                backdropFilter: "blur(7.5px)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "8px",
                  color: "#fff",
                  marginRight: openThird ? "16px" : "8px",
                }}
              >
                <IconButton onClick={handleOpenThird}>
                  {openThird ? (
                    <img src={LocationActive} alt="" />
                  ) : (
                    <img src={LocationNoneActive} alt="" />
                  )}
                </IconButton>
                {openThird && (
                  <Grid>
                    <Typography>
                      {createRestaurantData.street}{" "}
                      {createRestaurantData.houseNumber},{" "}
                      {createRestaurantData.city}
                    </Typography>
                  </Grid>
                )}
              </Box>
            </Box>
          )}
          {show ? (
            <Box></Box>
          ) : (
            <Box
              sx={{
                px: "16px",
                py: "8px",
                borderRadius: "100px 32px 32px 100px ",
                background: "#B4FFFF",
                color: "#4A4A4A",
              }}
            >
              <Typography>Laden erstellen</Typography>
            </Box>
          )}
        </Box>
        <Box></Box>
        <Button sx={{ color: "#4A4A4A" }} onClick={logout}>
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

export default OwnerHeaderWithoutRestaurant;
