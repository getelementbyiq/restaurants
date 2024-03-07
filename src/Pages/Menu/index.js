import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import CreateMenu from "../../Components/CreateMenu";
import CreateProduct from "../../Components/CreateProduct";
import ProductPreview from "./../../Components/ProductPreview/index";
import MenuDashboard from "../../Components/MenuDashboard";

const Menu = (props) => {
  return (
    <Grid container sx={{ display: "flex", flexGrow: "1" }}>
      <Grid
        item
        xs={4}
        md={4}
        sx={{
          border: "1px solid red",
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
          border: "1px solid red",
          display: "flex",
          flexGrow: "1",
          justifyContent: "center",
          pb: "8px",
        }}
      >
        <MenuDashboard />
      </Grid>
    </Grid>
  );
};

Menu.propTypes = {};

export default Menu;
