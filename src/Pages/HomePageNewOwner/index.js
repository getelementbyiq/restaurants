import React from "react";
import PropTypes from "prop-types";
import Clock from "../../Components/Clock/Clock";
import { Box, Typography } from "@mui/material";
import MainProductsList from "../../Components/MainProductsList";
import ProductSecondLayout from "../../Components/ProductsecondLayout";

const HomePageNewOwner = (props) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          height: "90vh",
          backgroundColor: "#000",
          mb: "300px",
          color: "#fff",
          alignItems: "center",
          pt: "60px",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "120px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
            color: "#FF00D6",
          }}
        >
          Sales
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            flexDirection: "column",
            backgroundColor: "rgba(225,225,225,0.15)",
            borderRadius: "16px",
            border: "1px solid red",
            height: "250px",
            backgroundFilter: "blur(15px)",
          }}
        ></Box>
        <ProductSecondLayout />
      </Box>
    </Box>
  );
};

HomePageNewOwner.propTypes = {};

export default HomePageNewOwner;
