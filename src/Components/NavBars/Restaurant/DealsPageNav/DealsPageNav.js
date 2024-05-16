import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Box, TextField, Typography } from "@mui/material";
import {
  fetchProductsOfOneDeal,
  fetchProductsOfOneMenu,
  resetSearchResults,
  searchProducts,
  setsearchValue,
} from "../../../../Redux/immigration/products/productsFetchSlice";
import { useLocation, useParams } from "react-router-dom";
import { setMenuAddProduct } from "../../../../Redux/immigration/globalStates/globalStatesSlice";

const DealsPageNav = (props) => {
  const { dealsId } = useParams();
  const dispatch = useDispatch();
  const dealsData = useSelector((state) => state.fetchDeals?.dealsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [menus, setMenus] = useState();
  const [menu, setMenu] = useState(null);
  const location = useLocation();

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    dispatch(searchProducts({ searchTerm: term }));
    dispatch(setsearchValue(term));
  };
  useEffect(() => {
    !searchTerm && dispatch(resetSearchResults());
  }, [searchTerm, dispatch]);

  useEffect(() => {
    dealsData && setMenus(dealsData);
  }, [dealsData]);

  useEffect(() => {
    dealsData && setMenu(dealsData.filter((menu) => menu.id === dealsId));
  }, [dealsData, dealsId]);

  useEffect(() => {
    if (dealsData) {
      // Filtere das Menü anhand der übergebenen dealsId
      const selectedMenu = dealsData.find((menu) => menu.id === dealsId);
      console.log("selectedMenu", selectedMenu);
      // Wenn ein Menü mit der entsprechenden ID gefunden wurde
      if (selectedMenu) {
        // Rufe die Produkte für das ausgewählte Menü ab
        dispatch(fetchProductsOfOneDeal(selectedMenu));
      }
    }
  }, [dealsData, dealsId, dispatch]);
  // console.log("menus from Navmenu", menuData);
  const addProductsState = useSelector(
    (state) => state.globalStates.menuAddProduct
  );
  const clickButton = () => {
    //esli addProductState hranit ID von kategorie
    //esli addProductState  ID von kategorie === dealsId to sdelai Null
    if (addProductsState === dealsId) {
      dispatch(setMenuAddProduct(null));
    } else if (addProductsState === null) {
      //no esli net to sdelai dealsId
      dispatch(setMenuAddProduct(dealsId));
      //esli user clickts an anderen Menu
    } else {
    }
    //
  };
  console.log(" addProductsState", addProductsState);

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
      {dealsId &&
        menu?.map((menu) => (
          <Box>
            <Typography>{menu.name}</Typography>

            <Typography> : {menu.productIds.length}</Typography>
          </Box>
        ))}
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

DealsPageNav.propTypes = {
  productsData: PropTypes.array.isRequired,
};

export default DealsPageNav;
