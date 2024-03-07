import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Box, Typography } from "@mui/material";
import LocalHeader from "../../Components/LocalHeader";

const Locals = (props) => {
  const { id } = useParams();
  const restaurantOfUser = useSelector((state) => state.restaurants.data);
  let filteredRestaurant;
  if (id) {
    filteredRestaurant = restaurantOfUser?.find(
      (restaurant) => restaurant.id === id
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid red",
        flexGrow: "1",
        // backgroundImage: `url(${filteredRestaurant.background})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        mb: "16px",
        borderRadius: "32px",
        py: "16px",
      }}
    >
      <Box sx={{ margin: "0 auto" }}>
        <img
          src={filteredRestaurant?.logo}
          alt=""
          style={{ heigth: "100%", maxWidth: "300px" }}
        />
      </Box>
    </Box>
  );
};

Locals.propTypes = {};

export default Locals;
