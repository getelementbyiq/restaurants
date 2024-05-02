import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
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

const LocalsFullViewSecond = (props) => {
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
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
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
          borderRadius: "0 0 32px 32px",
          mb: "16px",
          maxHeight: "63vh",
          minHeight: "63vh",
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
          {/* <Box
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
        </Box> */}
          {/* <Box
          sx={{
            display: "flex",
            gap: "16px",
            fontFamily: "Quicksand",
            fontSize: "1vw",
            color: "#fff",
            alignItems: "center",
          }}
        >
          <Typography>{restaurantData.restaurantData.name}</Typography>
        </Box> */}
          {/* <Box
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
        </Box> */}
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: "1",
          display: "flex",
          border: "1px solid red",
          flexDirection: "column",
          gap: "8px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            border: "1px solid black",
            justifyContent: "space-between",
            alignItems: "center",
            px: "40px",
          }}
        >
          <Box>
            <Typography>{restaurantData.restaurantData.name}</Typography>
          </Box>
          <LocalsNavbar data={restaurantData?.restaurantData} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Button
              // onClick={() => goTo("signin")}
              sx={{
                px: "32px",
                py: "8px",
                borderRadius: "32px",
                backgroundColor: "rgba(225,225,225,0.3)",
                color: "#fff",
                cusor: "pointer",
                textTransform: "lowercase",
                "&&:hover": {
                  backgroundColor: "#242424",
                  color: "#FF00D6",
                },
              }}
            >
              <Typography>
                <span style={{ textTransform: "uppercase" }}>S</span>
                ign in
              </Typography>
            </Button>
            <Button
              // onClick={() => goTo("signup")}
              sx={{
                px: "32px",
                py: "8px",
                borderRadius: "32px",
                backgroundColor: "#EBFF00",
                color: "#000",
                cusor: "pointer",
                textTransform: "lowercase",
                "&&:hover": {
                  backgroundColor: "#242424",
                  color: "#EBFF00",
                },
              }}
            >
              <Typography>
                <span style={{ textTransform: "uppercase" }}>S</span>
                ign up
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            border: "1px solid blue",
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

LocalsFullViewSecond.propTypes = {};

export default LocalsFullViewSecond;
