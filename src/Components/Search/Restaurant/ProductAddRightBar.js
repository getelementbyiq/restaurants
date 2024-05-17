import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ListProductTemplate from "../../Templates/ListProductTemplate/ListProductTemplate";
import { useParams } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import useMobileCheck from "../../MobileCheck";
import ProductsImageTemplateDeals from "../../Templates/ProductsImageTemplate/ProductsImageTemplateDeals";
import ProductsImageTemplateDealsSmall from "../../Templates/ProductsImageTemplate/ProductsImageTemplateDealsSamll";
import ProductsImageTemplateDealsList from "../../Templates/ProductsImageTemplate/ProductsImageTemplateDealsList";
let productIndex = 0;
const size = ["small", "medium", "large"];
const ProductAddRight = (props) => {
  const { dealsId } = useParams();
  const isMobile = useMobileCheck();
  const searchValue = useSelector(
    (state) => state.productsFetchSlice.searchResults
  );
  const allProductData = useSelector(
    (state) => state.productsFetchSlice.productsData
  );

  const products = useSelector(
    (state) => state.productsFetchSlice.productsOfDeals.data
  );
  const loadingState = useSelector(
    (state) => state.productsFetchSlice.productsOfDeals.loading
  );
  const searchTerm = useSelector(
    (state) => state.productsFetchSlice.searchValue
  );
  console.log("products menunav", products);
  const show = useSelector((state) => state.globalStates.menuAddProduct);

  return (
    <Grid
      container
      sx={{
        position: "relative",
        display: "flex",
        transition: "600ms",
        maxWidth: show ? "36%" : "0px",
        // flexWrap: "wrap",
        // border: "1px solid green",
        // px: "5px",
        // overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          //   border: "1px solid blue",
          width: show ? "100%" : "0px",
          transition: "600ms",
          position: "absolute",
          right: show ? "0px" : "-400px",
          top: "0",
          overflow: "auto",
          maxHeight: "100%",
          // scrollbarWidth: "thin", // Macht den Scrollbalken schmaler in Firefox
          scrollbarWidth: "none", // Macht den Scrollbalken schmaler in Firefox
          "&::-webkit-scrollbar": {
            //   width: "2px", // Macht den Scrollbalken schmaler in Webkit-Browsern
            display: "none", // Für Webkit-Browser (Chrome, Safari, Edge)
          },
        }}
      >
        {show && (
          <Box
            sx={{
              //   width: "300px",
              //   border: "2px solid red",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              px: "16px",
              flexGrow: "1",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // border: "2px solid yellow",
                flexGrow: "1",
                // flexWrap: "wrap",
                gap: "8px",
                maxHeight: "100%",
                overflow: "scrollY",
                scrollbarWidth: "2px",

                // alignItems: "flex-start",
              }}
            >
              {searchTerm && searchValue.length === 0 ? (
                <Typography>
                  Es wurde für {searchTerm} nichts gefunden
                </Typography>
              ) : searchValue.length === 0 ? (
                allProductData?.map((product) => (
                  <Box
                    item
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                    }}
                  >
                    {/* <ProductsImageTemplateDealsSmall product={product} /> */}
                    <ProductsImageTemplateDealsList product={product} />
                  </Box>
                ))
              ) : (
                searchValue?.map((product) => (
                  <Box
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                    }}
                  >
                    {/* <ProductsImageTemplateDealsSmall product={product} /> */}
                    <ProductsImageTemplateDealsList product={product} />
                  </Box>
                ))
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

ProductAddRight.propTypes = {};

export default ProductAddRight;
