import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/immigration/user/userSlice";
import { Box, CircularProgress } from "@mui/material";
import MainLayout from "../MainLayout/MainLayout";
import SecondMainLayout from "../SecondMainLayout/SecondMainLayout";
import { fetchProductsDataWithoutUser } from "../../Redux/immigration/products/productsFetchSlice";

const LayoutDefinder = (props) => {
  const dispatch = useDispatch();
  const { user } = UserAuth();
  const uID = user?.uid;
  const userData = useSelector((state) => state.fetchUser.userData);
  const userDataState = useSelector((state) => state.fetchUser.loading);
  const products = useSelector(
    (state) => state.productsFetchSlice.productsDataWithoutUser
  );

  useEffect(() => {
    dispatch(fetchUserData(uID));
    dispatch(fetchProductsDataWithoutUser());
  }, [dispatch, user]);

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
