import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Collapse, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

import { UserAuth } from "../../Auth/Auth";
import { getUserById } from "../../Redux/thunks/getUserById";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { setFetchedRestaurants } from "../../Redux/slices/restaurantsSlice";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";

import RestaurantHeaderFromOwner from "../../Pages/Locals/RestaurantHeaderFromOwner";
import RestaurantBannerMain from "../../Components/Banners/RestaurantBannerMain/RestaurantBannerMain";
import BannerDefinder from "../../Components/Banners/BannerDefinder/BannerDefinder";
import { fetchProducts, filterBy } from "../../app/features/ProductsSlice";
import { fetchRestaurantsData } from "../../Redux/immigration/restaurants/restaurantFetchSlice";
import {
  fetchDrinksData,
  fetchProductsData,
  fetchProductsOfOneMenu,
} from "../../Redux/immigration/products/productsFetchSlice";
import { fetchMenusRealTimeData } from "../../Redux/immigration/menusOfRestaurant/fetchMenusRealTime";
import { getTodayWeekday } from "../../Components/GetDay/GetDay";

const MainLayout = (props) => {
  const dispatch = useDispatch();
  // products to render

  const restaurantOfUser = useSelector(
    (state) => state.restaurants.userRestaurants
  );
  const [currentRestaurant, setCurrentRestaurant] = useState();

  const navigate = useNavigate();
  const { user } = UserAuth();
  const userId = user?.uid;
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log("scrollPosition", scrollPosition);
  const localsId = useParams();
  console.log("localsID", localsId);
  const [restaurantId, setRestaurantId] = useState();
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );
  useEffect(() => {
    restaurantsData &&
      restaurantsData.map((restaurant) => setRestaurantId(restaurant.id));
  }, [restaurantsData]);

  useEffect(() => {
    dispatch(fetchRestaurantsData(userId));
  }, [userId, dispatch]);

  console.log("currentRestaurant", currentRestaurant);

  useEffect(() => {
    if (restaurantId !== null) {
      dispatch(fetchProductsData(restaurantId));
      dispatch(fetchMenusRealTimeData(restaurantId));
      dispatch(fetchDrinksData(restaurantId));
    }
  }, [restaurantId, dispatch]);

  useEffect(() => {
    restaurantsData &&
      restaurantsData.map((restaurant) => setCurrentRestaurant(restaurant));
  }, [restaurantsData]);

  const realTimeMenus = useSelector(
    (state) => state.fetchRealTimeMenus.menusData
  );
  const thisMenu = realTimeMenus?.find(
    (menu) => menu?.name === getTodayWeekday()
  );
  useEffect(() => {
    thisMenu && dispatch(fetchProductsOfOneMenu(thisMenu));
  }, [thisMenu, dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // backgroundImage: `url(${currentRestaurant.background})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        overflow: "auto",
      }}
    >
      <RestaurantHeaderFromOwner />
      <BannerDefinder BG={currentRestaurant?.background} />
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

      {/* <div>
        {products.map((product) => {
          return (
            <div>
              <p>{product.name}</p>
            </div>
          );
        })}
      </div> */}
    </Box>
  );
};

export default MainLayout;
