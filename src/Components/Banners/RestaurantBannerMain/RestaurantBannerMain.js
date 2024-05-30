import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Typography,
} from "@mui/material";
// import BGHover from "../../../assets/img/Copy-of-Diet.png";
import Secondheader from "../../Header/Secondheader";
import { color } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { resetScrolled } from "../../../Redux/slices/globalScrollState";
import Typewriter from "../../Typewriter";
import AnimatedText from "../../AnimatedText";
import TypewriterPlaceholder from "../../PlaceholderTypewriter";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../Auth/Auth";
import useDeviceType from "../../MediaQueries";
import useMobileCheck from "../../MobileCheck";
import CreatePost from "../../../Pages/Locals/CreatePost";

const textArray = [
  "your taste",
  "the right place for you",
  "your cuisine",
  "your lovely drinks",
];

const RestaurantBannerMain = (props) => {
  // const { BG } = props;
  // console.log("restaurantsBanner", BG);
  const { user, logout } = UserAuth();
  const devicetype = useDeviceType();
  const isMobile = useMobileCheck();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [currentRestaurant, setCurrentRestaurant] = useState();

  const [scrolled, setScrolled] = useState(false);
  const scrollState = useSelector((state) => state.scrollState);
  const swiperIndex = useSelector((state) => state.swiperIndex);
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );
  console.log("scrollState", scrollState);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  const [placeholderText, setPlaceholderText] = useState("");
  const handleTypewriterOutput = (output) => {
    setPlaceholderText(output);
  };
  const goTo = (txt) => {
    navigate(`${txt}`);
  };

  useEffect(() => {
    if (swiperIndex > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    console.log("swiperIndexfrom", swiperIndex);
  }, [swiperIndex]);

  const [toRenderRestaurant, setToRenderRestaurant] = useState(null);

  useEffect(() => {
    restaurantsData &&
      restaurantsData?.map((restaurant) => setCurrentRestaurant(restaurant));
  }, [restaurantsData]);

  return (
    <Grid
      sx={{
        display: "flex",
        height: scrolled ? "30vh" : isMobile ? "100vh" : "85vh",
        opacity: scrolled ? 0 : 1,
        transition: isMobile
          ? "height 100ms ease, opacity 120ms ease"
          : "height 250ms ease, opacity 300ms ease",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid blue",
        // flexGrow: "1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          position: "relative",
          flexGrow: "1",
          objectFit: "cover",
          // backgroundImage: `url(${blobUrl})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "1200",
            clipPath: isMobile
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            height: isMobile ? "100vh" : "85vh",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            overflow: "hidden",
            position: "relative",
            flexGrow: "1",
            objectFit: "cover",
            transition: "150ms",

            clipPath: isMobile
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            height: isMobile ? "100vh" : "85vh",

            backgroundImage: currentRestaurant
              ? `url(${currentRestaurant?.background})`
              : null,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid green",
          }}
        >
          {/* <img src={BG} alt="" style={{ height: "100%", objectFit: "cover" }} /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "3500",
            color: "#fff",
            flexDirection: "column",
            // border: "1px solid blue",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexGrow: "1",
              justifyContent: isMobile ? "center" : "flex-end",
              px: "24px",
              pt: "8px",
              pb: "60px",
              alignItems: "center",
              flexDirection: "column",
              border: "1px solid red",
            }}
          >
            <Box
              sx={
                {
                  // border: "1px solid red"
                }
              }
            >
              <Typography
                sx={{
                  fontFamily: "Noto Sans",
                  fontWeight: "800",
                  fontSize: "128px",
                }}
              >
                {currentRestaurant?.name?.toUpperCase()}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "40%",
                flexDirection: "column",
                transform: "rotate(-2.86deg) translateY(-20px)",
                // border: "1px solid red",
                gap: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  color: "#fff",
                  //   border: "1px solid red",
                  gap: "16px",
                  py: "24px",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  className="bounce-text"
                  bounce-text
                  sx={{
                    fontSize: "50px",
                    fontFamily: "Knewave, system-ui",
                    fontWeight: "400",
                    fontStyle: "normal",
                    lineHeight: "90%",
                    color: "#FF00D6",
                  }}
                >
                  Geschmack
                </Typography>
                {/* <Typography
                  className="bounce-text"
                  sx={{
                    fontSize: "50px",
                    fontFamily: "Knewave, system-ui",
                    fontWeight: "400",
                    fontStyle: "normal",
                    lineHeight: "90%",
                    color: "#FF00D6",
                  }}
                >
                  Events
                </Typography>
                <Typography
                  className="bounce-text"
                  sx={{
                    fontSize: "50px",
                    fontFamily: "Knewave, system-ui",
                    fontWeight: "400",
                    fontStyle: "normal",
                    lineHeight: "90%",
                    color: "#FF00D6",
                  }}
                >
                  Restaurants, Café's, Bar's
                </Typography> */}
              </Box>
              {/* {!isMobile && (
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    border: "1px solid white",
                    py: "4px",
                    px: "16px",
                    borderRadius: "32px",
                    alignItems: "center",
                    backgroundColor: "rgba(225,225,225,0.50)",
                    backdropFilter: "blur(15px)",
                    flexGrow: "1",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewGrid="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15Z"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.1974 15.5171C14.5949 16.7171 15.5024 16.8371 16.1999 15.7871C16.8374 14.8271 16.4174 14.0396 15.2624 14.0396C14.4074 14.0321 13.9274 14.6996 14.1974 15.5171Z"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <InputBase
                    fullWidth
                    InputProps={{ InputLabel: { color: "white" } }}
                    placeholder="Burger, Pasta, Pizza..."
                    // onFocus={handleInputFocus}
                    // onBlur={handleInputBlur}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewGrid="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 4.875H12"
                      stroke="white"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.5 4.875H1.5"
                      stroke="white"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.5 7.5C8.94975 7.5 10.125 6.32475 10.125 4.875C10.125 3.42525 8.94975 2.25 7.5 2.25C6.05025 2.25 4.875 3.42525 4.875 4.875C4.875 6.32475 6.05025 7.5 7.5 7.5Z"
                      stroke="white"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.5 13.125H13.5"
                      stroke="white"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 13.125H1.5"
                      stroke="white"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.5 15.75C11.9497 15.75 13.125 14.5747 13.125 13.125C13.125 11.6753 11.9497 10.5 10.5 10.5C9.05025 10.5 7.875 11.6753 7.875 13.125C7.875 14.5747 9.05025 15.75 10.5 15.75Z"
                      stroke="white"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Box>
              )} */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

RestaurantBannerMain.propTypes = {};

export default RestaurantBannerMain;
