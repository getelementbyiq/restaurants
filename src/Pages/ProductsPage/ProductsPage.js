import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import CreateProductsV2 from "../CreateProductsV2/CreateProductsV2";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../../Redux/immigration/products/productsFetchSlice";
import ProductsTypeNavigation from "../../Components/CategoryNavigation/ProductsNavigation";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const [restaurantId, setRestaurantId] = useState();
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );
  useEffect(() => {
    restaurantsData &&
      restaurantsData?.map((restaurant) => setRestaurantId(restaurant.id));
  }, [restaurantsData]);

  useEffect(() => {
    dispatch(fetchProductsData(restaurantId));
  }, [restaurantId, dispatch]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        border: "1px solid red",
        flexGrow: "1",
        maxHeight: "100%",
      }}
    >
      {/* <ProductsGrid /> */}
      <CreateProductsV2 />
    </Box>
  );
};

ProductsPage.propTypes = {};

export default ProductsPage;
