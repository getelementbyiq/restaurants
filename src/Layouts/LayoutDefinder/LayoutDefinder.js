import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/immigration/user/userSlice";
import { Box, CircularProgress } from "@mui/material";
import MainLayout from "../MainLayout/MainLayout";
import SecondMainLayout from "../SecondMainLayout/SecondMainLayout";
import { fetchProductsDataWithoutUser } from "../../Redux/immigration/products/productsFetchSlice";
import { fetchProductsAsync } from "../../Redux/immigration/products/productsForMain";
import Clock from "../../Components/Clock/Clock";
import { fetchUserRestaurants } from "../../Redux/immigration/restaurants/fetchRestaurantSlice";
import { useLocation } from "react-router-dom";
import {
  fetchProductsOfSaleMenu,
  fetchSaleMenus,
  selectLastDocument,
  selectSaleMenus,
} from "../../Redux/immigration/products/productsForMainRestaurantPageSales";

const LayoutDefinder = (props) => {
  const dispatch = useDispatch();
  const { user } = UserAuth();

  const uID = user?.uid ? user?.uid : null;
  const userData = useSelector((state) => state.fetchUser.userData);
  const userDataState = useSelector((state) => state.fetchUser.loading);
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );
  const products = useSelector(
    (state) => state.productsFetchSlice.productsDataWithoutUser
  );
  const [startAfterDocument, setStartAfterDocument] = useState(null);

  // const startAfterDocument = useSelector(
  //   (state) => state.productsForMain.lastDocument
  // );

  const [timeIsRedy, setTimeIsReady] = useState(false);

  const currentTime = Clock();
  useEffect(() => {
    if (currentTime) {
      setTimeIsReady(true);
    }
  }, [currentTime]);

  useEffect(() => {
    currentTime && console.log("currentTime", currentTime);
  }, [currentTime]);
  useEffect(() => {
    dispatch(fetchUserData(uID));
    dispatch(fetchUserRestaurants({ userId: uID }));
    // dispatch(fetchProductsDataWithoutUser());
  }, [dispatch, user]);

  useEffect(() => {
    currentTime &&
      dispatch(fetchProductsAsync(currentTime, startAfterDocument));
  }, [dispatch, startAfterDocument, timeIsRedy]); // Der Effekt wird beim Laden der Komponente und immer dann ausgeführt, wenn startAfterDocument aktualisiert wird

  useEffect(() => {
    products && handleLoadMore();
  }, [products]);

  const handleLoadMore = () => {
    if (products.length > 0) {
      const lastDocument = products[products.length - 1];
      setStartAfterDocument(lastDocument);
    }
  };

  console.log("user From Auth", uID);

  console.log("user From Layoutdefinder", user);
  console.log("user From firebase", userData);
  console.log("user From firebase status", userDataState);
  console.log("products From firebase products", products);

  if (userDataState === "loading") {
    <Box>
      <CircularProgress />
    </Box>;
  }

  const saleMenus = useSelector(selectSaleMenus);
  const lastDocument = useSelector(selectLastDocument);
  useEffect(() => {
    dispatch(fetchSaleMenus());
  }, []);
  useEffect(() => {
    if (saleMenus.length > 0) {
      dispatch(
        fetchProductsOfSaleMenu({
          menu: saleMenus[0],
          startAfterDocument: lastDocument,
        })
      );
    }
  }, [dispatch, saleMenus]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      {userData && userData.userType === "ownerUser" && <MainLayout />}
      {userData && userData.userType === "normalUser" && <SecondMainLayout />}
      {!user && <SecondMainLayout />}
    </Box>
  );
};

LayoutDefinder.propTypes = {};

export default LayoutDefinder;
