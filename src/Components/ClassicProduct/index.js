import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const ClassicProduct = (product) => {
  console.log("product", product.product);
  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid blue",
        flexDirection: "column",
        px: "32px",
        py: "8px",
        borderRadius: "16px",
        background: "#FAFAFA",
      }}
    >
      <Box
        sx={{
          display: "flex",
          //   border: "1px solid red",
          justifyContent: "space-between",
        }}
      >
        <Typography>{product.product.name}</Typography>
        <Typography>{product.product.price} €</Typography>
      </Box>
      <Typography>{product.product.description}</Typography>
    </Box>
  );
};

ClassicProduct.propTypes = {};

export default ClassicProduct;
