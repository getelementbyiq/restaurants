import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import RestaurantBannerMain from "../RestaurantBannerMain/RestaurantBannerMain";
import { Box } from "@mui/material";
import RestaurantProductsBanner from "../RestaurantProductsBanner/RestaurantProductsBanner";
import { useSelector } from "react-redux";

const BannerDefinder = (BG) => {
  const [restaurantId, setRestaurantId] = useState();
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );
  useEffect(() => {
    restaurantsData &&
      restaurantsData?.map((restaurant) => setRestaurantId(restaurant.id));
  }, [restaurantsData]);

  // const restaurantsId = id;
  // const restaurantsId = restaurantOfUser?.map((restaurant) => restaurant.id);
  const { pathname } = useLocation();
  return (
    <Box>
      {pathname === `/${restaurantId}` && <RestaurantBannerMain />}
      {pathname === "/products" && <RestaurantProductsBanner BG={BG} />}
    </Box>
  );
};

BannerDefinder.propTypes = {};

export default BannerDefinder;
