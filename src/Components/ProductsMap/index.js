import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import Product from "../Product";
import { useSelector } from "react-redux";

const ProductsMap = (props) => {
  const fetchetProducts = useSelector(
    (state) => state.fetchProducts.fetchProducts
  );

  const restaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  const product = Object.entries(restaurantData.menu.categoryType.products).map(
    ([id, category]) => ({
      id,
      ...category,
    })
  );

  console.error("-------Products from Products", fetchetProducts);
  return (
    <Box>
      <Product />
    </Box>
  );
};

ProductsMap.propTypes = {};

export default ProductsMap;
