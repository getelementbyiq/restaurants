import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Box, TextField, Typography } from "@mui/material";
import { searchProducts } from "../../../../Redux/immigration/products/productsFetchSlice";
import { useParams } from "react-router-dom";

const MenuPageNav = (props) => {
  const { menuId } = useParams();
  const dispatch = useDispatch();
  const menuData = useSelector((state) => state.fetchMenus?.menusData);
  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenus] = useState([]);
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
    menus && setMenu(menus.filter((menu) => menu.id === menuId));
  }, [menus, menuId]);

  console.log("menus from Navmenu", menus);

  return (
    <Box
      sx={{
        display: "flex",
        py: "16px",
        // border: "1px solid red",
        flexGrow: "1",
        justifyContent: "space-around",
      }}
    >
      {" "}
      {menuId && (
        <>
          <Typography>
            Products {menus.map((menu) => menu.productIds.length)}
          </Typography>
          <Typography>{menus.map((menu) => menu.name)}</Typography>
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
