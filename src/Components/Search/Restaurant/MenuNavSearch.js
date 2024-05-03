import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import ListProductTemplate from "../../Templates/ListProductTemplate/ListProductTemplate";
import ProductsImageTemplate from "../../Templates/ProductsImageTemplate/ProductsImageTemplate";

const MenuNavSearch = (props) => {
  const searchValue = useSelector(
    (state) => state.productsFetchSlice.searchResults
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      {searchValue?.map((product) => (
        <ProductsImageTemplate product={product} />
      ))}
    </Box>
  );
};

MenuNavSearch.propTypes = {};

export default MenuNavSearch;
