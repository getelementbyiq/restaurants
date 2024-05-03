import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import CreateMenu from "../../Components/CreateMenu";
import CreateProduct from "../../Components/CreateProduct";
import ProductPreview from "./../../Components/ProductPreview/index";
import MenuDashboard from "../../Components/MenuDashboard";
import MenuPageNav from "../../Components/NavBars/Restaurant/MenuPageNav/MenuPageNav";
import MenuNavSearch from "../../Components/Search/Restaurant/MenuNavSearch";

const Menu = (props) => {
  return (
    <Grid container sx={{ display: "flex", flexGrow: "1" }}>
      <Grid
        item
        xs={4}
        md={4}
        sx={{
          // border: "1px solid red",
          display: "flex",
          flexGrow: "1",
          justifyContent: "center",
          pb: "8px",
        }}
      >
        <CreateMenu />
      </Grid>
      <Grid
        item
        xs={8}
        md={8}
        sx={{
          // border: "1px solid red",
          display: "flex",
          flexGrow: "1",
          alignItems: "center",
          pb: "8px",
          flexDirection: "column",
        }}
      >
        <MenuPageNav />
        <MenuNavSearch />
      </Grid>
    </Grid>
  );
};

Menu.propTypes = {};

export default Menu;
