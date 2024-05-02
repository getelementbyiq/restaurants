import React, { useEffect, useState } from "react";

import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  Button,
  IconButton,
  Avatar,
  Tooltip,
  Grid,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/thunks/getUserById";

//Import Icons
import Add from "../../assets/icons/add.svg";
import MyLocals from "./MyLocals";
import Creator from "./Creator";
import RestautantDashNavHeader from "./RestautantDashNavHeader";

const SideBarOwner = (props) => {
  const location = useLocation();
  const id = useParams();
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData?.user;
  const restaurantOfUser = useSelector((state) => state.restaurants.data);

  const [isOpen, setIsopen] = useState("");
  const [isLocal, setIsLocal] = useState("");

  const handleClick = (txt) => {
    if (isOpen === txt) {
      setIsopen("");
    } else {
      setIsopen(txt);
    }
  };
  const handleClickLocal = (txt) => {
    if (isLocal === txt) {
      setIsLocal("");
    } else {
      setIsLocal(txt);
    }
  };

  const goTo = (txt) => {
    navigate(txt);
  };

  const clickLocal = (id) => {
    navigate(`locals/${id}`);
  };

  return (
    <Box
      sx={{
        minWidth: "15%",
        display: "flex",
        // border: "1px solid red",
        pt: "8px",
        gap: "8px",
        backgroundColor: "#444444",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: "1",
          border: "1px solid red",
          flexDirection: "column",
          px: "8px",
          gap: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            border: "1px solid white",
            gap: "8px",
          }}
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
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: "600",
              fontSize: "20px",
              color: "#fff",
            }}
          >
            Gipo
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: "#fff", my: "8px" }} />

        <RestautantDashNavHeader />
        <Creator />
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
    </Box>
  );
};

export default SideBarOwner;
