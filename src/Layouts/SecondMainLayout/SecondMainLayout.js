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
import RestaurantBannerMain from "../../Components/Banners/RestaurantBannerMain/RestaurantBannerMain";
import Clock from "../../Components/Clock/Clock";

const SecondMainLayout = (props) => {
  const { user } = UserAuth();
  const id = useParams();
  const restaurantId = id.locals;
  const location = useLocation();
  const isMobile = useMobileCheck();
  const [secondMain, setSecondMain] = useState(false);

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
  useEffect(() => {
    location.pathname.includes("second") && setSecondMain((state) => !state);
  }, [location]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
      }}
    >
      <Secondheader />
      {location.pathname === "/" && <GipoBanner />}

      <Box
        sx={{ display: "flex", px: isMobile ? "0px" : "60px", flexGrow: "1" }}
      >
        {/* <TimeLine /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

SecondMainLayout.propTypes = {};

export default SecondMainLayout;
