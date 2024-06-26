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
import ProductMediumTemplateSales from "../ProductHomePage/ProductMediumTemplateSales";
import ProductHomePage from "../ProductHomePage";

const ListMediumTemplate = ({ size, product }) => {
  const isMobile = useMobileCheck();

  const styles = {
    productStyle: {
      margin: "0",
      padding: "0",
      // borderRadius: "16px",
      // backgroundColor: "red",
      display: "flex",
    },
    small: {
      gridRowEnd: isMobile ? "span 12" : "span 14",
    },
    medium: {
      gridRowEnd: isMobile ? "span 8" : "span 10",
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
      {/* <ProductsMediumTemplate product={product} /> */}
      <ProductHomePage product={product} />
    </Box>
  );
};

ListMediumTemplate.propTypes = {};

export default ListMediumTemplate;
