import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurantData } from "../../Redux/slices/onerestaurantData";
import LocalsNavbar from "../../Components/Localsnavbar";
import HomeOfLocal from "../../Components/LocalsPage/HomeOfLocal";
import StoryOfLocal from "../../Components/LocalsPage/StoryOfLocal/index";
import TeamOfLocal from "../../Components/LocalsPage/TeamOfLocal/index";
import ContactOfLocal from "../../Components/LocalsPage/ContactOfLocal/index";
import CareerOfLocal from "../../Components/LocalsPage/CareerOfLocal/index";

const LocalsPage = (props) => {
  const dispatch = useDispatch();
  const id = useParams();
  const restaurantId = id.locals;
  const navState = useSelector((state) => state.localNavState);
  useEffect(() => {
    if (restaurantId) {
      const fetchRestaurantData = async () => {
        const restaurantRef = doc(db, "restaurants", restaurantId);
        const restaurantData = await getDoc(restaurantRef);
        dispatch(setRestaurantData(restaurantData.data()));
      };
      fetchRestaurantData();
    }
  }, [restaurantId]);
  const restaurantData = useSelector((state) => state.oneRestaurantData);

  console.log("restaurantData-----", restaurantData);
  console.log("restaurantData---", restaurantId);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        // border: "2px solid blue",
        overflow: "hidden",
        // backgroundColor: "#936FF9",
        flexGrow: "1",
        flexDirection: "column",
      }}
    >
      <Box
        item
        sx={{
          // border: "1px solid red",
          display: "flex",
          height: "50%",
          backgroundImage: `url(${restaurantData.restaurantData.background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "32px",
        }}
      ></Box>
      <Box
        sx={{
          flexGrow: "1",
          display: "flex",
          // border: "1px solid red",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <LocalsNavbar data={restaurantData?.restaurantData} />
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            // border: "1px solid blue",
            flexDirection: "column",
            px: "72px",
          }}
        >
          {navState && navState === "home" && <HomeOfLocal />}
          {navState && navState === "story" && <StoryOfLocal />}
          {navState && navState === "team" && <TeamOfLocal />}
          {navState && navState === "contact" && <ContactOfLocal />}
          {navState && navState === "career" && <CareerOfLocal />}
        </Box>
      </Box>
    </Grid>
  );
};

LocalsPage.propTypes = {};

export default LocalsPage;
