import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Dialog, Typography } from "@mui/material";
import useMobileCheck from "../MobileCheck";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProductFullview,
  setProductFullview,
} from "../../Redux/slices/productFullView";
import ProductsMediumTemplate from "../ProductHomePage/ProductsMediumTemplate";

const ProductGridTemplate = ({ size, product }) => {
  const [clicked, setClicked] = useState(false);
  const isMobile = useMobileCheck();
  const dispatch = useDispatch();
  const productFullView = useSelector(
    (state) => state.productsFetchSlice.productsData
  );

  const styles = {
    productStyle: {
      margin: "0",
      padding: "0",
      // borderRadius: "16px",
      // backgroundColor: "red",
      display: "flex",
    },
    small: {
      gridRowEnd: isMobile ? "span 12" : "span 12",
    },
    medium: {
      gridRowEnd: isMobile ? "span 8" : "span 12",
    },
    large: {
      gridRowEnd: isMobile ? "span 10" : "span 12",
    },
  };
  return (
    <Box
      sx={{
        ...styles.productStyle,
        ...styles[size],
      }}
    >
      {/* {clicked && <Typography>clicked</Typography>} */}
      <ProductsMediumTemplate product={product} />
    </Box>
  );
};

ProductGridTemplate.propTypes = {};

export default ProductGridTemplate;
