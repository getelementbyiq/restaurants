import React from "react";
import PropTypes from "prop-types";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Box, Typography } from "@mui/material";
import LocalHeader from "../../Components/LocalHeader";
import CreatePost from "../Locals/CreatePost";
import RestaurantBannerMain from "../../Components/Banners/RestaurantBannerMain/RestaurantBannerMain";
import RestaurantHeaderFromOwner from "../Locals/RestaurantHeaderFromOwner";

const LocalsLayout = (props) => {
  const location = useLocation();
  const { id } = useParams();
  const restaurantOfUser = useSelector((state) => state.restaurants.data);
  let filteredRestaurant;
  if (id) {
    filteredRestaurant = restaurantOfUser?.find(
      (restaurant) => restaurant.id === id
    );
  }

  const BG = restaurantOfUser.map((restaurant) => restaurant.background);
  // console.log("id, location", id, location.pathname);

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid blue",
        flexGrow: "1",
        gap: "16px",
        flexDirection: "column",
      }}
    >
      {!location.pathname.includes("menu") ||
        (!location.pathname.includes("products") && (
          <RestaurantBannerMain BG={BG} />
        ))}
      {location.pathname.includes("menu") ||
        (location.pathname.includes("products") && (
          <RestaurantHeaderFromOwner />
        ))}

      {/* {`/locals/${id}` === location.pathname && <CreatePost />} */}

      <Outlet />
    </Box>
  );
};

LocalsLayout.propTypes = {};

export default LocalsLayout;
