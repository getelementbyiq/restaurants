import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import RestaurantBannerMain from "../RestaurantBannerMain/RestaurantBannerMain";
import { Box } from "@mui/material";
import RestaurantProductsBanner from "../RestaurantProductsBanner/RestaurantProductsBanner";
import { useSelector } from "react-redux";

const BannerDefinder = (BG) => {
  const restaurantOfUser = useSelector(
    (state) => state.restaurants.userRestaurants
  );
  // const restaurantsId = id;
  // const restaurantsId = restaurantOfUser?.map((restaurant) => restaurant.id);
  const restaurantsId = restaurantOfUser[0]?.id;
  const { pathname } = useLocation();
  return (
    <Box>
      {pathname === `/${restaurantsId}` && <RestaurantBannerMain />}
      {pathname === "/products" && <RestaurantProductsBanner BG={BG} />}
    </Box>
  );
};

BannerDefinder.propTypes = {};

export default BannerDefinder;
