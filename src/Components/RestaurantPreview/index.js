import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import CreateRestaurantHeader from "../CreateRestaurantHeader";
import { useSelector } from "react-redux";

const RestaurantPreview = (props) => {
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const backgroundImage = useMemo(() => {
    if (createRestaurantData && createRestaurantData.background) {
      const blob = new Blob([createRestaurantData.background]);
      return `url(${URL.createObjectURL(blob)})`;
    }
    return "none";
  }, [createRestaurantData]);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        // width: "100%",
        // border: "1px solid red",
        backgroundColor: "#FAFAFA",
        borderRadius: "40px",
        height: "40%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          // border: "1px solid green",
          width: "100%",
          alignItems: "flex-start",
          background: backgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: "16px",
        }}
      >
        <CreateRestaurantHeader />
      </Box>
    </Grid>
  );
};

RestaurantPreview.propTypes = {};

export default RestaurantPreview;
