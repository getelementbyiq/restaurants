import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import CreateProductsV2 from "../CreateProductsV2/CreateProductsV2";
import ProductsPageNav from "../../Components/NavBars/Restaurant/ProductsPageNav/ProductsPageNav";
import ProductsGrid from "../../Components/DataGrids/Restaurant/ProductsGrid/ProductsGrid";

const ProductsPage = (props) => {
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
