import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Avatar,
  Box,
  Collapse,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { Style } from "@mui/icons-material";
import { UserAuth } from "../../Auth/Auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantHeaderFromOwner = (props) => {
  const location = useLocation();
  const page = location.pathname;

  const navigate = useNavigate();
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );
  const [toRenderRestaurant, setToRenderRestaurant] = useState();
  const restaurantOfUser = useSelector((state) => state.restaurants.data);

  const { id } = useParams();
  const [isTab, setIsTab] = useState("main");
  const { logout } = UserAuth();
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    restaurantsData &&
      restaurantsData.map((restaurant) => setToRenderRestaurant(restaurant));
  }, [restaurantsData]);

  console.log("isCreate", isCreate);

  console.log("toRenderRestaurant", restaurantOfUser);

  const goTo = (txt) => {
    navigate(`${txt}`);
  };
  return (
    <AppBar
      sx={{
        display: "flex",
        justifyContent: "center",
        px: "40px",
        flexGrow: "1",
        backgroundColor: "rgba(0,0,0,0.2)",
        py: "8px",
        postion: "relative",
        zIndex: "5000",
        heigth: "60px",
        backdropFilter: "blur(1px)",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          flexGrow: "1",
        }}
      >
        <Grid
          Item
          xs={4}
          md={4}
          lg={4}
          sx={{
            display: "flex",
            gap: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              onClick={() => goTo("/")}
              src={toRenderRestaurant?.logo}
              sx={{
                width: "32px",
                height: "32px",
              }}
            />
            <Typography
              sx={{
                fontFamily: "Quicksand",
                fontWeight: "400",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              {toRenderRestaurant?.name}
            </Typography>
            <IconButton>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z"
                  stroke={"#fff"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 17.9902V14.9902"
                  stroke={"#fff"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </IconButton>
            <IconButton>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0201 2.91016C8.71009 2.91016 6.02009 5.60016 6.02009 8.91016V11.8002C6.02009 12.4102 5.76009 13.3402 5.45009 13.8602L4.30009 15.7702C3.59009 16.9502 4.08009 18.2602 5.38009 18.7002C9.69009 20.1402 14.3401 20.1402 18.6501 18.7002C19.8601 18.3002 20.3901 16.8702 19.7301 15.7702L18.5801 13.8602C18.2801 13.3402 18.0201 12.4102 18.0201 11.8002V8.91016C18.0201 5.61016 15.3201 2.91016 12.0201 2.91016Z"
                  stroke={"#fff"}
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
                <path
                  d="M13.8699 3.20043C13.5599 3.11043 13.2399 3.04043 12.9099 3.00043C11.9499 2.88043 11.0299 2.95043 10.1699 3.20043C10.4599 2.46043 11.1799 1.94043 12.0199 1.94043C12.8599 1.94043 13.5799 2.46043 13.8699 3.20043Z"
                  stroke={"#fff"}
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.02 19.0596C15.02 20.7096 13.67 22.0596 12.02 22.0596C11.2 22.0596 10.44 21.7196 9.90002 21.1796C9.36002 20.6396 9.02002 19.8796 9.02002 19.0596"
                  stroke={"#fff"}
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
              </svg>
            </IconButton>
          </Box>
        </Grid>
        <Grid
          Item
          xs={4}
          md={4}
          lg={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Box
            onClick={() => goTo("products/dashboard")}
            sx={{
              display: "flex",
              borderRadius: "32px",
              px: "12px",
              py: "4px",
              backgroundColor: page.includes("/products")
                ? "rgba(0,0,0,0.4)"
                : "none",
              "&&:hover": {
                backgroundColor: "rgba(225,225,225,0.3)",
              },
              cursor: "pointer",
            }}
          >
            <Typography sx={{ fontFamily: "Quicksand" }}>Products</Typography>
          </Box>
          <Box
            onClick={() => goTo("menu/dashboard")}
            sx={{
              display: "flex",
              borderRadius: "32px",
              px: "12px",
              py: "4px",
              backgroundColor: page.includes("/menu")
                ? "rgba(0,0,0,0.4)"
                : "none",
              "&&:hover": {
                backgroundColor: "rgba(225,225,225,0.3)",
              },
              cursor: "pointer",
            }}
          >
            <Typography sx={{ fontFamily: "Quicksand" }}>Menu</Typography>
          </Box>
          <Box
            onClick={() => goTo("/offers")}
            sx={{
              display: "flex",
              borderRadius: "32px",
              px: "12px",
              py: "4px",
              backgroundColor: page.includes("/offers")
                ? "rgba(0,0,0,0.4)"
                : "none",
              "&&:hover": {
                backgroundColor: "rgba(225,225,225,0.3)",
              },
              cursor: "pointer",
            }}
          >
            <Typography sx={{ fontFamily: "Quicksand" }}>Deals</Typography>
          </Box>
          <Box
            onClick={() => goTo("team")}
            sx={{
              display: "flex",
              borderRadius: "32px",
              px: "12px",
              py: "4px",
              backgroundColor: page.includes("/team")
                ? "rgba(0,0,0,0.4)"
                : "none",
              "&&:hover": {
                backgroundColor: "rgba(225,225,225,0.3)",
              },
              cursor: "pointer",
            }}
          >
            <Typography sx={{ fontFamily: "Quicksand" }}>Team</Typography>
          </Box>
          <Box
            onClick={() => goTo("contact")}
            sx={{
              display: "flex",
              borderRadius: "32px",
              px: "12px",
              py: "4px",
              backgroundColor: page.includes("/contact")
                ? "rgba(0,0,0,0.4)"
                : "none",
              "&&:hover": {
                backgroundColor: "rgba(225,225,225,0.3)",
              },
              cursor: "pointer",
            }}
          >
            <Typography sx={{ fontFamily: "Quicksand" }}>Constact</Typography>
          </Box>
          <Box
            onClick={() => goTo("jobs")}
            sx={{
              display: "flex",
              borderRadius: "32px",
              px: "12px",
              py: "4px",
              backgroundColor: page.includes("/jobs")
                ? "rgba(0,0,0,0.4)"
                : "none",
              "&&:hover": {
                backgroundColor: "rgba(225,225,225,0.3)",
              },
              cursor: "pointer",
            }}
          >
            <Typography sx={{ fontFamily: "Quicksand" }}>Jobs</Typography>
          </Box>
          <Box
            onClick={() => goTo("/rool")}
            sx={{
              display: "flex",
              borderRadius: "32px",
              px: "12px",
              py: "4px",
              backgroundColor: page.includes("/rool")
                ? "rgba(0,0,0,0.4)"
                : "none",
              "&&:hover": {
                backgroundColor: "rgba(225,225,225,0.3)",
              },
              cursor: "pointer",
            }}
          >
            <Typography sx={{ fontFamily: "Quicksand" }}>AGB</Typography>
          </Box>
        </Grid>
        <Grid
          Item
          xs={4}
          md={4}
          lg={4}
          sx={{
            display: "flex",
            gap: "8px",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Avatar
            onClick={logout}
            sx={{
              width: "32px",
              height: "32px",
            }}
          />
        </Grid>
      </Grid>
    </AppBar>
  );
};

RestaurantHeaderFromOwner.propTypes = {};

export default RestaurantHeaderFromOwner;
