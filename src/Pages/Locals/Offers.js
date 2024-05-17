import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import ProductsRender from "../../Components/Search/Restaurant/ProductsRender";
import CreateDeals from "../../Components/CreateDeals";
import DealsPageNav from "../../Components/NavBars/Restaurant/DealsPageNav/DealsPageNav";
import ProductRenderDelas from "../../Components/Search/Restaurant/ProductsRenderDeals";
import OnePlusOneDeal from "../../Components/Deals/OnePlusOneDeal";
import ProductRenderInDeals from "../../Components/Search/Restaurant/ProductRenderInDeals";
import ProductAddRight from "../../Components/Search/Restaurant/ProductAddRightBar";
import DealsDefinder from "../../Components/Deals/DealsDefinder";

const Offers = (props) => {
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
        <CreateDeals />
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
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <DealsPageNav />
          {/* <OnePlusOneDeal /> */}
        </Box>
        {/* <ProductRenderDelas /> */}
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            position: "relative",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              // border: "1px solid red",
            }}
          >
            {/* <DealsDefinder /> */}
            <ProductRenderInDeals />
          </Box>
          <ProductAddRight />
        </Box>
      </Grid>
    </Grid>
  );
};

Offers.propTypes = {};

export default Offers;
