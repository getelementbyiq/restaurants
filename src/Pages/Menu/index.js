import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import CreateMenu from "../../Components/CreateMenu";
import MenuPageNav from "../../Components/NavBars/Restaurant/MenuPageNav/MenuPageNav";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import ProductsRender from "../../Components/Search/Restaurant/ProductsRender";

const Menu = (props) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        px: "40px",
      }}
    >
      <Grid
        item
        xs={3}
        md={3}
        sx={{
          // border: "1px solid blue",
          display: "flex",
          flexGrow: "1",
          justifyContent: "center",
          pb: "8px",
          // backgroundColor: "red",
        }}
      >
        <CreateMenu />
      </Grid>
      <Grid
        item
        xs={9}
        md={9}
        sx={{
          // border: "1px solid black",
          display: "flex",
          flexGrow: "1",
          pb: "8px",
          flexDirection: "column",
          // backgroundColor: "green",
          gap: "16px",
        }}
      >
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <MenuPageNav />
        </Box>
        <ProductsRender />
      </Grid>
    </Grid>
  );
};

Menu.propTypes = {};

export default Menu;
