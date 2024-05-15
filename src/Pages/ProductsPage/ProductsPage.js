import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import CreateProductsV2 from "../CreateProductsV2/CreateProductsV2";
import ProductsPageNav from "../../Components/NavBars/Restaurant/ProductsPageNav/ProductsPageNav";
import ProductsGrid from "../../Components/DataGrids/Restaurant/ProductsGrid/ProductsGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../../Redux/immigration/products/productsFetchSlice";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const restaurantOfUser = useSelector(
    (state) => state.restaurants.userRestaurants
  );

  const restaurantsId = restaurantOfUser[0]?.id;
  useEffect(() => {
    dispatch(fetchProductsData(restaurantsId));
  }, [restaurantsId, dispatch]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <ProductsPageNav />
      <ProductsGrid />
      <CreateProductsV2 />
    </Box>
  );
};

ProductsPage.propTypes = {};

export default ProductsPage;
