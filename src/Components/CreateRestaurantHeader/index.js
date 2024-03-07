import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Typography } from "@mui/material";
import NavBarOwner from "../NavBarOwner";
import { useSelector } from "react-redux";

const CreateRestaurantHeader = (props) => {
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const blob = new Blob([createRestaurantData?.logo]);
  return (
    <Box
      sx={{
        display: "flex",
        px: "16px",
        ml: "16px",
        py: "8px",
        background: "rgba(225, 225, 225, 0.4)",
        backdropFilter: "blur(3.5px)",
        borderRadius: "32px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Avatar
          sx={{ width: "32px", height: "32px" }}
          src={URL.createObjectURL(blob)}
        />
        {createRestaurantData?.name ? (
          <Typography>{createRestaurantData.name}</Typography>
        ) : (
          <Typography>Restaurant</Typography>
        )}
      </Box>
      <NavBarOwner />
    </Box>
  );
};

CreateRestaurantHeader.propTypes = {};

export default CreateRestaurantHeader;
