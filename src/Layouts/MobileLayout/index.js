import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, Typography } from "@mui/material";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Secondheader from "../../Components/Header/Secondheader";
import TimeLine from "../../Components/TimeLine";
import MainFilter from "../../Components/MainFilter";
import GipoBanner from "../../Components/Banners/GipoBanner";
import { UserAuth } from "../../Auth/Auth";
import useMobileCheck from "../../Components/MobileCheck";

const MobileLayout = (props) => {
  const { user } = UserAuth();
  const id = useParams();
  const restaurantId = id.locals;
  const location = useLocation();
  const isMobile = useMobileCheck();

  console.log("location", location);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

  console.log("user from mainlayout", user);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Outlet />
    </Box>
  );
};

MobileLayout.propTypes = {};

export default MobileLayout;
