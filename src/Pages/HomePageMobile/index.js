import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import MainNavigation from "../../Components/MainNavigation";
import AuthComponent from "../../Components/AuthComponent";
import MainPlattformMessage from "../../Components/MainPlattformMessage";
import MainContent from "../../Components/MainContent";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserAuth } from "../../Auth/Auth";
import MainQuest from "../../Components/MainQuest";
import MainProducts from "../../Components/MainProducts";
import MainProductsInfin from "../../Components/MainProductsInfin";
import MainProductsList from "../../Components/MainProductsList";
import NonAccount from "../../Components/Reminder/NonAccount";
import useDeviceType from "../../Components/MediaQueries";
import AlertDialog from "../FullScreenProductMobile";
import FullscreenProductView from "../FullScreenProductMobile";
import ProductSwiper from "../FullScreenProductMobile";
import useMobileCheck from "../../Components/MobileCheck";

const HomePageMobile = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.userById.user);
  const userData = currentUserData?.user;
  const { user } = UserAuth();
  const product = useSelector((state) => state.productFullView);
  const restaurantData = useSelector((state) => state.restaurantDataFromMain);
  const isMobile = useMobileCheck();

  const devicetype = useDeviceType();

  console.log("restaurantDataFromMain", restaurantData);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        // flexDirection: "column",
        gap: "16px",
        // border: "1px solid green",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* <MainProducts /> */}
      {/* <MainPlattformMessage /> */}
      {/* <MainProductsInfin /> */}

      {restaurantData && <ProductSwiper />}
      <MainProductsList />
      {/* <AlertDialog product={product} /> */}
      {/* <MainContent /> */}
      {/* <FullscreenProductView /> */}
    </Box>
  );
};

HomePageMobile.propTypes = {};

export default HomePageMobile;
