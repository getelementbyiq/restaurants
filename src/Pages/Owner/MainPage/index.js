import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SetBackGround from "../../../Components/CreateRestaurant/SetBackgroundFoto";
import SetNameLogo from "../../../Components/CreateRestaurant/NameLogo";
import SetAddress from "../../../Components/CreateRestaurant/SetAdress";
import "./index.css";
import Art from "../../../Components/Art";

const MainPageOwner = (props) => {
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  console.log("restaurant data from Mainpage owner----", createRestaurantData);
  const blob = new Blob([createRestaurantData.logo]);
  const dispatch = useDispatch();
  const show = useSelector((state) => state.show);
  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);
  const openThird = useSelector((state) => state.openThird);
  const openForth = useSelector((state) => state.openForth);

  return (
    <Box sx={{ px: "40px", height: "89vh" }}>
      {openFirst && <SetNameLogo />}
      {openSecond && <SetBackGround />}
      {openThird && <SetAddress />}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Art />
      </Box>
    </Box>
  );
};

export default MainPageOwner;
