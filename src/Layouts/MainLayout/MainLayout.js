import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Collapse, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

import { UserAuth } from "../../Auth/Auth";
import { getUserById } from "../../Redux/thunks/getUserById";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";

import RestaurantHeaderFromOwner from "../../Pages/Locals/RestaurantHeaderFromOwner";
import RestaurantBannerMain from "../../Components/Banners/RestaurantBannerMain/RestaurantBannerMain";
import BannerDefinder from "../../Components/Banners/BannerDefinder/BannerDefinder";
import { fetchProducts, filterBy } from "../../app/features/ProductsSlice";
import { fetchUserRestaurants } from "../../Redux/immigration/restaurants/fetchRestaurantSlice";

const MainLayout = (props) => {
  const dispatch = useDispatch();
  // products to render

  const restaurantOfUser = useSelector(
    (state) => state.restaurants.userRestaurants
  );

  const navigate = useNavigate();
  const { user } = UserAuth();
  const userId = user?.uid;
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log("scrollPosition", scrollPosition);
  const localsId = useParams();
  console.log("localsID", localsId);

  useEffect(() => {
    dispatch(fetchUserRestaurants(userId));
  }, [dispatch, user]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
      dispatch(
        setRestaurantField({
          field: "userId",
          value: userId,
        })
      );
      // fetchRestaurantsByUserId(userId);
      // dispatch(fetchProducts(userId));
      dispatch(fetchProducts());
    }
  }, [dispatch, userId]);

  const [toRenderRestaurant, setToRenderRestaurant] = useState(null);

  useEffect(() => {
    if (restaurantOfUser) {
      setToRenderRestaurant(restaurantOfUser[0]);
    }
  }, [restaurantOfUser]);

  console.log("to render Restaurant", toRenderRestaurant?.background);
  console.log("to render Restaurant", restaurantOfUser);

  useEffect(() => {
    toRenderRestaurant?.id && navigate(`/${toRenderRestaurant?.id}`);
  }, [toRenderRestaurant]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        // backgroundImage: `url(${restaurantData.restaurantData.background})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      <RestaurantHeaderFromOwner />
      <BannerDefinder BG={toRenderRestaurant?.background} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: "8px",
          pt: "70px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
