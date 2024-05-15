import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Box, TextField, Typography } from "@mui/material";
import {
  fetchProductsOfOneMenu,
  searchProducts,
} from "../../../../Redux/immigration/products/productsFetchSlice";
import { useParams } from "react-router-dom";

const MenuPageNav = (props) => {
  
  const { menuId } = useParams();
  const dispatch = useDispatch();
  const menuData = useSelector((state) => state.fetchMenus?.menusData);
  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenus] = useState();
  const [menu, setMenu] = useState(null);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    dispatch(searchProducts({ searchTerm: term }));
  };
  useEffect(() => {
    menuData && setMenus(menuData);
  }, [menuData]);

  useEffect(() => {
    menuData && setMenu(menuData.filter((menu) => menu.id === menuId));
  }, [menuData, menuId]);

  useEffect(() => {
    if (menuData) {
      // Filtere das Menü anhand der übergebenen menuId
      const selectedMenu = menuData.find((menu) => menu.id === menuId);
      console.log("selectedMenu", selectedMenu);
      // Wenn ein Menü mit der entsprechenden ID gefunden wurde
      if (selectedMenu) {
        // Rufe die Produkte für das ausgewählte Menü ab
        dispatch(fetchProductsOfOneMenu(selectedMenu));
      }
    }
  }, [menuData, menuId, dispatch]);
  // console.log("menus from Navmenu", menuData);

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
      {" "}
      {menuId && (
        <>
          <Typography>
            Products {menu?.map((menu) => menu.productIds.length)}
          </Typography>
          <Typography>{menu?.map((menu) => menu.name)}</Typography>
        </>
      )}
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
