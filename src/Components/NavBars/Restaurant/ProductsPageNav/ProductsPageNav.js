import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const ProductsPageNav = (props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <Typography>Add new product</Typography>
      <Typography>Add new product</Typography>
      <Typography>Add new product</Typography>
      <Typography>Add new product</Typography>
      <Typography>Add new product</Typography>
    </Box>
  );
};

ProductsPageNav.propTypes = {};

export default ProductsPageNav;
