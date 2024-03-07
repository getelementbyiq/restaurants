import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import MainNavigation from "../../Components/MainNavigation";
import AuthComponent from "../../Components/AuthComponent";
import MainPlattformMessage from "../../Components/MainPlattformMessage";
import MainContent from "../../Components/MainContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserAuth } from "../../Auth/Auth";
import MainQuest from "../../Components/MainQuest";
import MainProducts from "../../Components/MainProducts";
import MainProductsInfin from "../../Components/MainProductsInfin";

const HomePage = (props) => {
  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.userById.user);
  const userData = currentUserData?.user;
  const { user } = UserAuth();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* <MainProducts /> */}
      {/* <MainPlattformMessage /> */}
      <MainProductsInfin />
      {/* <MainContent /> */}
    </Box>
  );
};

HomePage.propTypes = {};

export default HomePage;
