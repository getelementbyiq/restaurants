import React, { useEffect } from "react";

import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  Button,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/thunks/getUserById";

//Import Icons
import Add from "../../assets/icons/add.svg";

const SideBar = (props) => {
  const location = useLocation();
  const id = useParams();
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData?.user;
  const restaurantOfUser = useSelector((state) => state.restaurants.data);

  const goTo = (txt) => {
    navigate(txt);
  };

  const clickLocal = (id) => {
    navigate(`locals/${id}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        minWidth: userData?.userType === "ownerUser" ? "15%" : "40px",
        backgroundColor: "#fff",
        justifyContent: "center",
        flexDirection: "column",
        // border: "1px solid red",
        pt: "8px",
        px: "8px",
        alignItems: "center",
        gap: "8px",
        backgroundColor:
          userData?.userType === "ownerUser" ? "#444444" : "none",
      }}
    >
      User
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        onClick={() => goTo("/")}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="12" fill="#444444" />
          <path
            d="M13.641 23.4762L28 8M12 31.4127L28 13.9524M16.5128 33L21.0256 28.2381"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </Box>
      {restaurantOfUser &&
        restaurantOfUser.map((restaurant) => (
          <Box key={restaurant.id}>
            {restaurant.id && (
              <Avatar
                onClick={() => clickLocal(restaurant.id)}
                sx={{ width: "32px", height: "32px", cursor: "pointer" }}
                src={restaurant.logo}
              />
            )}
          </Box>
        ))}
      <Box sx={{ flexGrow: "1" }}></Box>
      <Box>
        {userData && userData.userType === "ownerUser" && (
          <Tooltip title="Create Restaurant" placement="right">
            <IconButton
              sx={{
                objectFit: "cover",
                border:
                  location.pathname === "/main" ? "1px solid green" : "none",
              }}
              onClick={() => goTo("/addlocation")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H18"
                  stroke="#444444"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 18V6"
                  stroke="#444444"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </IconButton>
          </Tooltip>
        )}
      </Box>
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

export default SideBar;
