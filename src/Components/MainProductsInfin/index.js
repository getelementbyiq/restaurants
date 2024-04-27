import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import MainContentMessage from "../MainContentMessage";
import MainProductsList from "../MainProductsList";

const MainProductsInfin = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid red",
        flexDirection: "column",
        gap: "16px",
        position: "relative",
      }}
    >
      {/* <MainContentMessage /> */}
      <MainProductsList />
    </Box>
  );
};

MainProductsInfin.propTypes = {};

export default MainProductsInfin;
