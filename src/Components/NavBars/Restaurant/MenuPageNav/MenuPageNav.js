import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { Box, TextField, Typography } from "@mui/material";
import { searchProducts } from "../../../../Redux/immigration/products/productsFetchSlice";
import { useParams } from "react-router-dom";

const MenuPageNav = (props) => {
  const { menuId } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenus] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    dispatch(searchProducts({ searchTerm: term }));
  };

  useEffect(() => {
    const storedMenus = JSON.parse(localStorage.getItem("menus")) || [];
    const menusWithMenuId = storedMenus.filter((menu) => menu.id === menuId);
    setMenus(menusWithMenuId);
  }, [menuId]);

  return (
    <Box
      sx={{
        display: "flex",
        py: "16px",
        border: "1px solid red",
        flexGrow: "1",
        justifyContent: "space-around",
      }}
    >
      <Typography>
        Products {menus.map((menu) => menu.productIds.length)}
      </Typography>
      <Typography>{menus.map((menu) => menu.name)}</Typography>
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
