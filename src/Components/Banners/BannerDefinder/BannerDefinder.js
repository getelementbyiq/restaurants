import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import RestaurantBannerMain from "../RestaurantBannerMain/RestaurantBannerMain";
import { Box } from "@mui/material";
import RestaurantProductsBanner from "../RestaurantProductsBanner/RestaurantProductsBanner";

const BannerDefinder = (BG) => {
  const { pathname } = useLocation();
  return (
    <Box>
      {pathname === "/" && <RestaurantBannerMain />}
      {pathname === "/locals/products" && <RestaurantProductsBanner BG={BG} />}
    </Box>
  );
};

BannerDefinder.propTypes = {};

export default BannerDefinder;
