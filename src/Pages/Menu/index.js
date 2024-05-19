import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Input } from "@mui/material";
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
import ProductAddRight from "../../Components/Search/Restaurant/ProductAddRightBar";
import DealsPageNav from "../../Components/NavBars/Restaurant/DealsPageNav/DealsPageNav";
import ProductRenderInDeals from "../../Components/Search/Restaurant/ProductRenderInDeals";

const Menu = (props) => {
  const { categoryState } = useParams();
  const [textFieldValue, setTextFieldValue] = useState("");
  const show = useSelector((state) => state.globalStates.menuAddProduct);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        px: "16px",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <CategoryNavigation />
      <Grid
        container
        sx={{
          display: "flex",
          flexGrow: "1",
        }}
      >
        <Grid
          item
          sx={{
            // border: "1px solid blue",
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
            // border: "1px solid black",
            display: "flex",
            flexGrow: "1",
            pb: "8px",
            flexDirection: "column",
            // backgroundColor: "green",
            gap: "16px",
            transition: "600ms",
            width: show ? "60% " : "70%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // border: "1px solid red",
            }}
          >
            <DealsBannerDefinder />
          </Box>
          <ProductRenderInDeals />
        </Grid>
        <Grid
          item
          sx={{
            // border: "1px solid blue",
            display: "flex",
            flexGrow: "1",
            justifyContent: "center",
            pb: "8px",
            // backgroundColor: "red",
            transition: "600ms",
            width: show ? "20%" : "2%",
            flexDirection: "column",
          }}
        >
          <DealsPageNav />
          <Box
            sx={{
              display: "flex",
              flexGrow: "1",
              height: "100%",
              // position: "absolute",
              // backgroundColor: "red",
              // top: "0",
              // left: "0",
              // border: "1px solid red",
              position: "relative",
            }}
          >
            <ProductAddRight />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

Menu.propTypes = {};

export default Menu;
