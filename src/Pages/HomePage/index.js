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

const HomePage = (props) => {
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
        mt: "16px",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* <MainProducts /> */}
      {/* <MainPlattformMessage /> */}
      {/* <MainProductsInfin /> */}
      <Box
        sx={{
          display: "flex",
          // border: "1px solid red",
          px: isMobile ? "0px" : "40px",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            maxWidth: "40%",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Angesagttesten Produkte für jetzt
          </Typography>
          <Typography>realtime Angebote in Ihrer Umgebung</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",

            maxWidth: "32%",
            position: "relative",
            zIndex: "2000",
          }}
        >
          <Typography sx={{ cursor: "pointer" }}>
            Sie besitzen ein oder gar mehrere Läden? für uns kein Problem{" "}
            <span
              style={{
                fontFamily: "Knewave, system-ui",
                fontSize: "16px",
                fontWeight: "400",
                fontStyle: "normal",
                lineHeight: "90%",
                color: "#FF00D6",
                letterSpacing: "0.11em",
              }}
            >
              kontaktieren Sie uns
            </span>
          </Typography>
        </Box>
      </Box>
      {/* {restaurantData && <ProductSwiper />} */}
      <MainProductsList />
      {/* <AlertDialog product={product} /> */}
      {/* <MainContent /> */}
      {/* <FullscreenProductView /> */}
    </Box>
  );
};

HomePage.propTypes = {};

export default HomePage;
