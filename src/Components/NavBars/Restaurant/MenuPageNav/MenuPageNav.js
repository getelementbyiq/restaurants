import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { Box, TextField } from "@mui/material";
import { searchProducts } from "../../../../Redux/immigration/products/productsFetchSlice";

const MenuPageNav = (props) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    dispatch(searchProducts({ searchTerm: term }));
  };

  return (
    <Box sx={{ display: "flex", py: "16px" }}>
      <TextField
        size="small"
        sx={{ width: "300px" }}
        placeholder="Search for products to put in"
        InputProps={{ style: { borderRadius: "32px" } }}
        value={searchTerm}
        onChange={handleSearch}
      />
    </Box>
  );
};

MenuPageNav.propTypes = {
  productsData: PropTypes.array.isRequired,
};

export default MenuPageNav;
