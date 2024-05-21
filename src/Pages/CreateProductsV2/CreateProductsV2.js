import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import CreateMenu from "../../Components/CreateMenu";
import CreateProduct from "../../Components/CreateProduct";
import ProductPreview from "../../Components/ProductPreview/index";
import MenuDashboard from "../../Components/MenuDashboard";
import ProductsTypeNavigation from "../../Components/CategoryNavigation/ProductsNavigation";
import ProductRenderInDeals from "../../Components/Search/Restaurant/ProductRenderInDeals";
import AllProductsRender from "../../Components/Search/Restaurant/AllProductsRender";

const CreateProductsV2 = (props) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        // flexGrow: "1",
        // border: "1px solid red",
        px: "16px",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
      }}
    >
      <ProductsTypeNavigation />
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
            display: "flex",
            flexGrow: "1",
            justifyContent: "center",
            pb: "8px",
            // backgroundColor: "red",
            position: "realtive",
            width: "20%",
            borderRadius: "16px",
            // border: "1px solid red",
          }}
        >
          <Box
            sx={{
              flexGrow: "1",
              display: "flex",
              // border: "1px solid blue",
              maxHeight: "100%",
            }}
          >
            <CreateProduct />
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
            width: "60%",
          }}
        >
          {/* <AllProductsRender /> */}
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
            width: "20%",
            flexDirection: "column",
          }}
        >
          <ProductPreview />
        </Grid>
      </Grid>
    </Grid>
  );
};

CreateProductsV2.propTypes = {};

export default CreateProductsV2;
