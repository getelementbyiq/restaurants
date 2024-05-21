import React, { useRef } from "react";
import PropTypes from "prop-types";
import Clock from "../../Components/Clock/Clock";
import { Box, Typography } from "@mui/material";
import MainProductsList from "../../Components/MainProductsList";
import ProductSecondLayout from "../../Components/ProductsecondLayout";
import AllProductsRender from "../../Components/Search/Restaurant/AllProductsRender";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HomePageNewOwner = (props) => {
  const scrollRef = useRef();

  return (
    <Box>
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          height: "240vh",
          // height: "100%",
          backgroundColor: "#000",
          mb: "300px",
          color: "#fff",
          alignItems: "center",
          pt: "120px",
          flexDirection: "column",
          gap: "40px",
          position: "relative",

          // overflow: "hidden",
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
            // border: "1px solid red",
            height: "250px",
            backgroundFilter: "blur(15px)",
          }}
        ></Box>
        <Box
          className="products"
          sx={{
            display: "flex",
            height: "100%",
            width: "80%",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%) scale(1)",
            // border: "1px solid red",
          }}
        >
          <AllProductsRender />
        </Box>
      </Box>
    </Box>
  );
};

HomePageNewOwner.propTypes = {};

export default HomePageNewOwner;
