import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const ProductsImageTemplate = ({ product }) => {
  console.log("products from List", product);
  return (
    <Box
      sx={{
        backgroundImage: `url(${product?.background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        width: "120px",
        height: "120px",
        position: "relative",
        overflow: "hidden",
        p: "16px",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      ></Box>

      <Typography
        sx={{
          fontFamily: "Quicksand",
          fontSize: "16px",
          position: "absolute",
          top: "8px",
          left: "8px",
        }}
      >
        {product?.tag}
      </Typography>
      <Box
        sx={{
          position: "relative",
          zIndex: "300",
          display: "flex",
          flexDirection: "column",
          mt: "16px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Quicksand",
            fontSize: "16px",
            color: "#fff",
          }}
        >
          {product?.name}
        </Typography>
        <Typography
          sx={{ fontFamily: "Quicksand", fontSize: "16px", color: "#fff" }}
        >
          {product?.price}
        </Typography>
      </Box>
    </Box>
  );
};

ProductsImageTemplate.propTypes = {};

export default ProductsImageTemplate;
