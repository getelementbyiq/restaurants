import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ListProductTemplate from "../../Templates/ListProductTemplate/ListProductTemplate";
import { useParams } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import useMobileCheck from "../../MobileCheck";
import ListMediumTemplate from "../../ProductsecondLayout/ListMediumTemplate";
import { fetchProductsOfOneMenu } from "../../../Redux/immigration/products/productsFetchSlice";

let productIndex = 0;
const size = ["small", "medium", "large"];

const ProductsForSale = (props) => {
  const isMobile = useMobileCheck();

  const products = useSelector(
    (state) => state.productsFetchSlice.productsOfMenu.data
  );

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexGrow: "1",
        position: "relative",
        width: isMobile ? "100vw" : "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          maxHeight: "100%",
          position: "relative",
          width: "100%",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Grid
          sx={{
            display: "grid",
            gap: "16px",
            flexGrow: "1",
            transition: "200ms",
            width: "100%",
            position: "absolute",
            gridTemplateColumns: isMobile
              ? "repeat(auto-fill,45%)"
              : "repeat(auto-fill,30%)",
            gridAutoRows: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
            top: "0",
            left: "0",
          }}
        >
          {products?.map((product, index) => {
            const currentSize = size[productIndex % size.length];
            productIndex++;
            return (
              <ListMediumTemplate
                className="productsCard"
                key={product.id}
                size={currentSize}
                product={product}
              />
            );
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

ProductsForSale.propTypes = {};

export default ProductsForSale;
