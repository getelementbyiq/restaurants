import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const ListProductTemplate = ({ product }) => {
  console.log("products from List", product);
  return (
    <Box>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Box sx={{ width: "150px" }}>{product?.tag}</Box>
        <Box sx={{ width: "150px" }}>{product?.name}</Box>
        <Box sx={{ width: "150px" }}>{product?.price}</Box>
        <Box sx={{ width: "150px" }}>0</Box>
        <Box sx={{ width: "150px" }}>0</Box>
        <Box sx={{ width: "150px" }}>0</Box>
      </Box>
    </Box>
  );
};

ListProductTemplate.propTypes = {};

export default ListProductTemplate;
