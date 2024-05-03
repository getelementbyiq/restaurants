import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const RestaurantProductsBanner = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid red",
        height: "50vh",
        backgroundColor: "green",
      }}
    ></Box>
  );
};

RestaurantProductsBanner.propTypes = {};

export default RestaurantProductsBanner;
