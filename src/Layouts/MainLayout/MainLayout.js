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
import { fetchProductsData } from "../../Redux/immigration/products/productsFetchSlice";

const MainLayout = (props) => {
  const dispatch = useDispatch();
  // products to render
  const products = useSelector((state) => state.products.filteredProducts);
  const show = useSelector((state) => state.show);
  const localData = useSelector((state) => state.localData);
  const currentUserData = useSelector((state) => state.userById);
  const restaurantData = useSelector((state) => state.oneRestaurantData);

  const navigate = useNavigate();
  const { user } = UserAuth();
  const userId = user?.uid;
  const userData = currentUserData?.user;
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log("scrollPosition", scrollPosition);
  const localsId = useParams();
  console.log("localsID", localsId);
  const [restaurantId, setRestaurantId] = useState();
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );
  useEffect(() => {
    restaurantsData && setRestaurantId(restaurantsData[0]?.id);
  }, [restaurantsData]);

  useEffect(() => {
    dispatch(fetchRestaurantsData(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (restaurantId !== null) {
      dispatch(fetchProductsData(restaurantId));
    }
  }, [restaurantId, dispatch]);

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
      {/* <BannerDefinder BG={toRenderRestaurant?.background} /> */}
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
