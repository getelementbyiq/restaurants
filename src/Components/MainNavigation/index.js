import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Typography } from "@mui/material";
import SearchComponent from "../SearchComponent";
import AuthComponent from "../AuthComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserAuth } from "../../Auth/Auth";
import NavBarUser from "../NavBarUser";
import NavBarOwner from "../NavBarOwner";

const MainNavigation = (props) => {
  const id = useParams();
  console.log("food id", id);
  const restaurantId = id.locals;
  const menuId = id?.menu;
  const foodId = id.id;
  const categoryType = id.categoryType;
  const location = useLocation();
  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;
  const { user } = UserAuth();

  const goTo = (txt) => {
    navigate(`/${restaurantId}/${txt}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        // border: "1px solid red",
        heigth: "50px",
        alignItems: "center",
        py: "8px",
        justifyContent: "space-between",
        position: "sticky",
        top: "0",
        backgroundColor: "#fff",
        zIndex: "1000",
      }}
    >
      {location.pathname !== "/main" && (
        <Box
          sx={{
            display: "flex",
            // width: "100%",
            // border: "1px solid red",
            flexGrow: "1",
          }}
        >
          <NavBarUser />
          <SearchComponent />
        </Box>
      )}
      <AuthComponent />
    </Box>
  );
};

MainNavigation.propTypes = {};

export default MainNavigation;
