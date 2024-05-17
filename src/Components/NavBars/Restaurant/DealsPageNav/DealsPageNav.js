import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Box, IconButton, TextField, Typography } from "@mui/material";
import {
  fetchProductsOfOneDeal,
  fetchProductsOfOneMenu,
  resetSearchResults,
  searchProducts,
  setsearchValue,
} from "../../../../Redux/immigration/products/productsFetchSlice";
import { useLocation, useParams } from "react-router-dom";
import { setMenuAddProduct } from "../../../../Redux/immigration/globalStates/globalStatesSlice";
import OnePlusOneDeal from "../../../Deals/OnePlusOneDeal";
import DealsDefinder from "../../../Deals/DealsDefinder";

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
      console.log("selectedMenu", selectedMenu.productIds);
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

  console.log(" addProductsState", addProductsState);
  const show = useSelector((state) => state.globalStates.menuAddProduct);
  const clichOpen = () => {
    dispatch(setMenuAddProduct(!show));
  };

  console.log("shoooooow", show);

  return (
    <Box
      sx={{
        display: "flex",
        py: "4px",
        // border: "1px solid red",
        flexGrow: "1",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        height: "48px",
      }}
    >
      <DealsDefinder />
      {/* {dealsId &&
        menu?.map((menu) => (
          <Box>
            <Typography>{menu.name}</Typography>

            <Typography> : {menu.productIds.length}</Typography>
          </Box>
        ))} */}
      <TextField
        size="small"
        sx={{
          width: "260px",
          position: "absolute",
          top: "8px",
          transition: "800ms",
          right: show ? "16px" : "-350px",
        }}
        placeholder="Search for products to put in"
        InputProps={{
          style: {
            borderRadius: "32px",
          },
        }}
        value={searchTerm}
        onChange={handleSearch}
      />

      <IconButton
        onClick={() => clichOpen(dealsId)}
        sx={{
          transition: "800ms",
          backgroundColor: "#fff",
          transform: show ? "rotate(45deg)" : "rotate(0deg)",
          position: "absolute",
          top: "4px",
          right: show ? "286px" : "0px",
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 9H13.5"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 13.5V4.5"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconButton>
    </Box>
  );
};

DealsPageNav.propTypes = {
  productsData: PropTypes.array.isRequired,
};

export default DealsPageNav;
