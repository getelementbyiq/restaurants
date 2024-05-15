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
  const [scrolled, setScrolled] = useState(false);
  const scrollState = useSelector((state) => state.scrollState);
  const swiperIndex = useSelector((state) => state.swiperIndex);
  const restaurantOfUser = useSelector(
    (state) => state.restaurants.userRestaurants
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
    if (restaurantOfUser) {
      setToRenderRestaurant(restaurantOfUser[0]);
    }
  }, [restaurantOfUser]);

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
              : "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
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
              : "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
            height: isMobile ? "100vh" : "85vh",

            backgroundImage: toRenderRestaurant
              ? `url(${toRenderRestaurant.background})`
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
            <Box sx={{ border: "1px solid red" }}>
              <svg
                width="302"
                height="185"
                viewBox="0 0 302 185"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M253.952 90.0805C255.706 88.8276 257.877 88.5352 260.467 89.2035C260.968 89.287 261.469 89.3288 261.971 89.3288C263.808 85.5698 266.982 83.6068 271.493 83.4398C272.663 83.3562 274.292 83.1474 276.38 82.8133C278.468 82.4791 280.974 82.5627 283.898 83.0639C286.905 83.5651 289.536 84.4421 291.791 85.6951C296.72 88.3681 299.685 92.2106 300.688 97.2225C302.692 104.573 302.4 112.592 299.811 121.28C297.054 130.886 292.376 138.571 285.777 144.335C282.77 147.008 279.596 148.678 276.255 149.346C272.913 150.098 269.906 150.516 267.233 150.599C264.56 150.683 262.096 150.683 259.841 150.599C257.669 150.599 255.539 150.391 253.45 149.973C248.94 149.054 245.222 146.924 242.299 143.583C238.874 139.824 237.412 133.977 237.913 126.041C238.247 119.024 240.002 111.966 243.176 104.866C246.434 97.682 250.026 92.7536 253.952 90.0805ZM276.004 115.265C273.916 115.934 271.953 116.226 270.115 116.143C269.196 117.061 268.361 118.064 267.609 119.15C266.941 120.152 266.022 121.113 264.852 122.032C263.683 122.867 263.098 123.201 263.098 123.034C261.678 125.039 260.509 127.127 259.59 129.299C258.671 131.387 258.671 133.517 259.59 135.689C262.931 136.023 265.395 135.94 266.982 135.438C268.57 134.937 270.031 133.977 271.368 132.557C272.788 131.137 273.874 129.466 274.626 127.545C276.129 123.953 276.589 119.86 276.004 115.265Z"
                  fill="white"
                />
                <path
                  d="M192.945 92.3354C197.122 86.0705 202.927 82.3115 210.362 81.0585C212.784 80.6409 215.75 80.3485 219.258 80.1815C222.85 80.0144 225.899 80.808 228.405 82.5621C230.994 84.3163 232.915 86.5716 234.168 89.3282C236.34 94.2566 236.674 100.313 235.171 107.496C234.335 111.422 233.333 115.766 232.164 120.527C230.994 125.205 229.24 129.841 226.901 134.435C224.562 139.03 221.513 143.332 217.754 147.341C213.995 151.351 209.109 154.525 203.094 156.864C199.503 158.284 196.328 158.785 193.572 158.367C190.899 158.033 188.894 157.49 187.557 156.739C186.221 155.987 185.302 154.901 184.801 153.481C183.13 158.242 181.543 163.045 180.04 167.89C178.62 172.818 176.698 177.496 174.276 181.923C172.605 183.009 170.559 183.803 168.136 184.304C165.714 184.889 163.333 184.763 160.994 183.928C158.655 183.176 156.985 181.756 155.982 179.668C154.896 177.663 154.354 175.45 154.354 173.027C154.354 169.77 155.147 165.802 156.734 161.124C159.073 154.191 160.994 148.845 162.498 145.086C163.918 141.327 164.837 138.904 165.254 137.819C165.672 136.649 166.09 135.438 166.507 134.185C168.345 129.34 169.682 125.414 170.517 122.407C171.436 119.316 172.271 116.643 173.023 114.388V114.263C173.858 110.587 175.153 106.703 176.907 102.61C178.745 98.4332 179.998 95.8855 180.666 94.9666C182.086 93.5466 183.548 92.6695 185.052 92.3354C186.555 92.0012 188.267 91.7924 190.189 91.7089H190.565L192.945 92.3354ZM202.468 113.26C201.466 115.014 199.795 116.643 197.456 118.147L196.328 120.778C195.493 122.95 194.699 125.163 193.948 127.419C193.196 129.674 192.361 131.888 191.442 134.06C192.277 134.895 192.904 135.688 193.321 136.44C197.999 132.347 202.259 126.959 206.102 120.277C207.605 117.52 208.566 114.764 208.983 112.007C209.485 109.251 209.61 107.496 209.359 106.745C209.109 105.993 208.691 105.617 208.106 105.617C207.605 105.617 207.062 105.784 206.477 106.118C205.976 106.369 205.559 106.661 205.224 106.995C204.974 107.246 205.016 107.246 205.35 106.995C204.431 108.081 203.763 109.042 203.345 109.877C202.927 110.629 202.635 111.757 202.468 113.26Z"
                  fill="white"
                />
                <path
                  d="M139.028 89.3252C140.114 86.5687 142.704 84.6892 146.797 83.6868C150.639 82.6844 154.231 82.8097 157.572 84.0627C160.997 85.3992 162.543 87.5711 162.208 90.5782C161.29 93.5018 160.12 97.0937 158.7 101.354C157.364 105.53 156.069 109.832 154.816 114.26C151.475 125.62 149.553 133.639 149.052 138.317C147.799 145.835 145.711 149.886 142.787 150.471C141.952 150.638 141.158 150.763 140.407 150.847C138.569 150.93 137.399 151.431 136.898 152.35C136.397 153.269 135.562 153.937 134.392 154.355C133.223 154.856 131.928 155.065 130.508 154.981C129.172 154.981 127.793 154.647 126.373 153.979C124.953 153.394 123.742 152.517 122.74 151.348C120.401 148.508 119.941 144.707 121.361 139.946C122.698 130.841 126.081 119.271 131.51 105.238C134.1 98.3049 136.606 93.0006 139.028 89.3252ZM162.71 70.5305C158.617 71.3659 155.275 71.1153 152.686 69.7788C150.18 68.4422 148.718 66.8551 148.3 65.0174C147.883 63.0962 148.467 61.1332 150.055 59.1284C151.892 56.6225 154.649 54.9936 158.324 54.2418C159.995 54.0747 161.206 53.9912 161.958 53.9912C162.71 53.9912 163.629 54.1583 164.714 54.4924C167.471 54.743 169.267 55.9542 170.102 58.126C171.272 59.9637 171.355 62.052 170.353 64.3909C169.434 66.7298 166.886 68.7764 162.71 70.5305Z"
                  fill="white"
                />
                <path
                  d="M77.0739 1.68152C95.1168 -1.95212 109.15 0.303249 119.174 8.44762C123.935 12.3319 127.068 17.9703 128.571 25.3628C130.2 32.7554 129.386 41.0251 126.128 50.1718C124.75 54.432 122.369 57.6271 118.986 59.7571C115.603 61.8872 112.095 63.1402 108.461 63.5161C104.953 63.7667 101.758 63.3281 98.8758 62.2004C95.9939 60.9475 94.4277 59.1933 94.1771 56.9379L92.4856 53.179C89.4784 48.6683 84.2785 48.1044 76.886 51.4875C70.4958 54.3693 64.1056 59.3812 57.7154 66.5232C50.9493 74.1664 46.5639 81.0578 44.5591 87.1974C42.3037 93.9635 41.176 98.4116 41.176 100.542C40.9254 105.303 42.617 109.563 46.2506 113.322C51.5131 116.705 56.7756 118.271 62.0382 118.021C67.3007 117.645 71.9994 116.454 76.1342 114.45C80.269 112.32 83.6521 109.939 86.2833 107.308C88.9146 104.676 90.2302 102.797 90.2302 101.669C90.6061 100.918 90.982 100.166 91.3579 99.4139C91.7338 98.6622 92.047 97.9104 92.2976 97.1586C91.7964 97.1586 91.9217 97.1586 92.6735 97.1586C93.4253 97.0333 93.6132 97.0333 93.2374 97.1586C92.8615 97.1586 93.0494 97.2212 93.8012 97.3465L94.9289 97.7224C88.7893 103.236 82.8376 104.363 77.0739 101.105C74.8186 99.7272 72.8138 98.2863 71.0596 96.7827C69.3054 95.1538 67.6766 94.402 66.173 94.5273C63.4164 93.0237 62.7899 90.0792 64.2935 85.6938C64.92 83.9396 66.0477 82.3108 67.6766 80.8072C69.4307 79.1783 71.6235 78.0506 74.2547 77.4241C86.7845 72.0363 98.3746 70.7834 109.025 73.6652C113.786 74.9182 117.044 77.4868 118.798 81.371C120.678 85.13 121.492 89.3901 121.241 94.1514C120.991 98.9128 119.926 103.737 118.046 108.623C116.292 113.51 114.35 117.457 112.22 120.464C110.09 123.346 107.083 126.792 103.199 130.801C99.4396 134.811 94.6783 138.695 88.9146 142.454C74.7559 151.601 59.5948 155.986 43.4314 155.61C20.0007 155.234 6.15526 145.649 1.89513 126.854C0.516854 120.84 -0.109636 114.074 0.0156622 106.556C1.26864 84.7541 7.78413 64.3932 19.5621 45.4732C25.2006 36.4517 32.7811 27.5556 42.3037 18.7847C48.318 13.3969 55.0841 9.26206 62.602 6.3802C66.6115 4.75133 71.4355 3.1851 77.0739 1.68152Z"
                  fill="white"
                />
              </svg>
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
