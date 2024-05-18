import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import CreateMenu from "../../Components/CreateMenu";
import MenuPageNav from "../../Components/NavBars/Restaurant/MenuPageNav/MenuPageNav";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import ProductsRender from "../../Components/Search/Restaurant/ProductsRender";
import DealsDefinder from "../../Components/Deals/DealsDefinder";
import CategoryNavigation from "../../Components/CategoryNavigation/CategoryNavigation";
import CombiDealTemplate from "../../Components/Deals/CombiDealTemplate";
import { useParams } from "react-router-dom";
import DealsBannerDefinder from "../../Components/Deals/DealsBannerDefinder";

const Menu = (props) => {
  const { categoryState } = useParams();

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        // px: "40px",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <CategoryNavigation />
      <Box
        sx={{
          display: "flex",
          flexGrow: "1",
        }}
      >
        <Grid
          item
          sx={{
            border: "1px solid blue",
            display: "flex",
            flexGrow: "1",
            justifyContent: "center",
            pb: "8px",
            // backgroundColor: "red",
            position: "realtive",
            width: "20%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              // position: "absolute",
              // backgroundColor: "red",
              // top: "0",
              // left: "0",
            }}
          >
            <CreateMenu />
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            border: "1px solid black",
            display: "flex",
            flexGrow: "1",
            pb: "8px",
            flexDirection: "column",
            // backgroundColor: "green",
            gap: "16px",
            width: "80%",
          }}
        >
          <Box
            sx={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <MenuPageNav />
          </Box>
          <ProductsRender />
          <DealsBannerDefinder />
        </Grid>
      </Box>
    </Grid>
  );
};

Menu.propTypes = {};

export default Menu;
