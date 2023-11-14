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

import TestUser1 from "../../assets/img/Cervello.jpg";
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

const OwnerHeader = (props) => {
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

  const handleGoToMain = () => {
    navigate("/main");
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
            {localData && (
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
                  <IconButton onClick={handleGoToMain}>
                    <img src={MainIconNonActive} alt="" />
                  </IconButton>
                </Box>
              </Box>
            )}
            {show && (
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
            {!show && (
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
                        src={localData.logo}
                        sx={{
                          border: openFirst ? "1px solid #5FD6DD" : "none",
                        }}
                      />
                    </IconButton>
                  </ToggleButtonGroup>
                  <Typography sx={{ color: openFirst ? "#5FD6DD" : "#fff" }}>
                    {localData.name}
                  </Typography>
                  <IconButton>
                    <Avatar
                      src={Message}
                      sx={{ width: "24px", height: "24px" }}
                    />
                  </IconButton>
                  <IconButton>
                    <Avatar
                      src={Callender}
                      sx={{ width: "24px", height: "24px" }}
                    />
                  </IconButton>
                  <IconButton>
                    <Avatar
                      src={Comments}
                      sx={{ width: "24px", height: "24px" }}
                    />
                  </IconButton>
                </Box>
              </Box>
            )}

            {!show && (
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
                        {localData.street} {localData.houseNumber},{" "}
                        {localData.city}
                      </Typography>
                    </Grid>
                  )}
                </Box>
              </Box>
            )}
            {/* followers componente */}
            {!show && (
              <Box
                sx={{
                  display: "flex",
                  borderRadius: "32px",
                  background: "rgba(239, 239, 239, 0.15)",

                  backdropFilter: "blur(7.5px)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!openThird && (
                  <Box
                    sx={{
                      display: "flex",
                      height: "36px",
                      alignItems: "flex-end",
                      ml: "16px",
                      gap: "4px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    ></Box>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mx: "8px",
                    gap: "4px",
                  }}
                >
                  {!openThird && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mx: "8px",
                        gap: "4px",
                      }}
                    >
                      <Box
                        sx={{
                          overflow: "hidden",
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                        }}
                      >
                        <img src={TestUser3} style={{ width: 36 }} alt="" />
                      </Box>
                      <Box
                        sx={{
                          overflow: "hidden",
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                        }}
                      >
                        <img src={TestUser2} style={{ width: 36 }} alt="" />
                      </Box>
                      <Box
                        sx={{
                          overflow: "hidden",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                        }}
                      >
                        <img src={TestUser1} style={{ width: "36px" }} alt="" />
                      </Box>
                    </Box>
                  )}
                  <Box
                    sx={{
                      height: "40px",
                      borderRadius: "32px",
                      color: "#fff  ",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      mr: "8px",
                      ml: "8px",
                    }}
                  >
                    <Typography>Follow</Typography>
                    <Typography>12K</Typography>
                  </Box>
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

export default OwnerHeader;
