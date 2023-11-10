import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar, Typography } from "@mui/material";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import "./index.css";

const MainLayout = (props) => {
  const show = useSelector((state) => state.show);
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const blob = new Blob([createRestaurantData.background]);
  const backgroundURL = show ? URL.createObjectURL(blob) : "";

  return (
    <Box
      className={show ? "background-image" : ""}
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundImage: show ? `url(${backgroundURL})` : "none",
      }}
    >
      {show && <Box className="overlay"></Box>}
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;
