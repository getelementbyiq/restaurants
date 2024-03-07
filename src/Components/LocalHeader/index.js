import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Typography } from "@mui/material";
import NavBarOwner from "../NavBarOwner";
import { useSelector } from "react-redux";
import NavBarExistingRestaurant from "../NavBarexistingRestaurant";
import { useNavigate, useParams } from "react-router-dom";

const LocalHeader = ({ restaurant }) => {
  const { name, logo, background, city, street, housNumber } = restaurant;

  const { id } = useParams();
  const navigate = useNavigate();

  const goTo = (txt) => {
    navigate(txt);
  };

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
        gap: "8px",
      }}
    >
      <Box
        onClick={() => goTo(`/locals/${id}`)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <Avatar sx={{ width: "32px", height: "32px" }} src={logo} />
        <Typography>{name}</Typography>
      </Box>
      <NavBarExistingRestaurant />
    </Box>
  );
};

LocalHeader.propTypes = {};

export default LocalHeader;
