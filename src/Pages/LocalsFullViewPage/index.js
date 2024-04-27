import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Grid, Typography } from "@mui/material";
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

const LocalsFullView = (props) => {
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

  console.log("restaurantData-----xx", restaurantData);
  console.log("restaurantData---", restaurantId);
  return (
    <Box
      sx={{
        display: "flex",
        // border: "2px solid blue",
        overflow: "hidden",
        // backgroundColor: "#936FF9",
        flexDirection: "column",
        backgroundImage: `url(${restaurantData.restaurantData.background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexGrow: "1",
        borderRadius: "32px",
        mb: "16px",
      }}
    >
      <Box
        item
        sx={{
          // border: "1px solid red",
          display: "flex",
          flexGrow: "1",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "200px",
            height: "200px",
            border: "1px solid red",
            objectFit: "cover",
            alignItems: "center",
          }}
        >
          <img
            src={restaurantData.restaurantData.logo}
            alt=""
            style={{ width: "100%", heigth: "100%" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            fontFamily: "Quicksand",
            fontSize: "1vw",
            color: "#fff",
            alignItems: "center",
          }}
        >
          <Avatar
            src={restaurantData.restaurantData.logo}
            sx={{ width: "32px", height: "32px" }}
          />
          <Typography>{restaurantData.restaurantData.name}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "4px",
            fontFamily: "Quicksand",
            fontSize: "1vw",
            color: "#fff",
            alignItems: "center",
          }}
        >
          {[1, 2, 3].map((item, index) => (
            <Avatar key={index} sx={{ width: "24px", height: "24px" }} />
          ))}
          <Typography>1.2K</Typography>
          <Box sx={{ px: "24px", py: "8px", borderRadius: "32px" }}>
            <Typography>FOLLOW</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: "1",
          display: "flex",
          // border: "1px solid red",
          flexDirection: "column",
          gap: "8px",
          justifyContent: "center",
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
    </Box>
  );
};

LocalsFullView.propTypes = {};

export default LocalsFullView;
