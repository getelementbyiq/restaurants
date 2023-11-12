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

import TestUser1 from "../../assets/img/7f5df839-b88a-4199-9bb7-7b44335c91a8.jpg";
import TestUser2 from "../../assets/img/cropped-IMG_20221106_124633(1).jpg";
import TestUser3 from "../../assets/img/Изображение WhatsApp 2023-02-08 в 17.09.02.jpg";

//Import Icons
import Add from "../../assets/icons/add.svg";
import Message from "../../assets/icons/sms.svg";
import Comments from "../../assets/icons/messages.svg";
import Callender from "../../assets/icons/calendar-edit.svg";
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
import OwnerHeaderWithRestaurant from "./OwnerHeaderWithRestaurant";
import OwnerHeaderWithoutRestaurant from "./OwnerHeaderWithoutRestaurant";
import { AddBoxTwoTone } from "@mui/icons-material";

const OwnerHeaderFirst = (props) => {
  const dispatch = useDispatch();
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const localData = useSelector((state) => state.localData);

  console.log("LocalData---------------", localData);

  console.log("restaurantData", createRestaurantData);
  const blob = new Blob([createRestaurantData.logo]);
  const fromLocalBlob = new Blob([localData.logo]);
  //open Restaurant Name and Logo
  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);
  const openThird = useSelector((state) => state.openThird);
  const show = useSelector((state) => state.show);
  const haveRestaurant = useSelector((state) => state.haveRestaurant);
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/createLocal");
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
  const { user, logout } = UserAuth();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;

  console.log("open Firstfrom owner header---- ", openFirst);

  const goTo = () => {
    navigate("/main");
  };
  return (
    user && (
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
                    marginRight: "16px",
                  }}
                >
                  <ToggleButtonGroup>
                    <IconButton
                      onClick={() => toggleOpen(setOpenFirst(!openFirst))}
                    >
                      <Avatar
                        src={URL.createObjectURL(blob)}
                        sx={{
                          border: openFirst ? "1px solid #5FD6DD" : "none",
                        }}
                      />
                    </IconButton>
                  </ToggleButtonGroup>
                  <Typography sx={{ color: openFirst ? "#5FD6DD" : "#fff" }}>
                    {createRestaurantData.name}
                  </Typography>
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
                      <Grid
                        sx={{
                          display: "flex",
                          gap: "8px",
                          transition: "300ms",
                        }}
                      >
                        <img src={LocationActive} alt="" />

                        <Grid>
                          <Typography sx={{ color: "#fff" }}>
                            {createRestaurantData.street}{" "}
                            {createRestaurantData.houseNumber},{" "}
                            {createRestaurantData.city}
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <img src={LocationNoneActive} alt="" />
                    )}
                  </IconButton>
                </Box>
              </Box>
            )}

            {show ? <Box></Box> : <></>}
          </Box>
          <Box></Box>
          <Button sx={{ color: "#4A4A4A" }} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    )
  );
};

export default OwnerHeaderFirst;
