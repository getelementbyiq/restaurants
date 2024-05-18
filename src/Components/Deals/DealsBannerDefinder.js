import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CombiDealTemplate from "./CombiDealTemplate";
import SaleTemplate from "./SaleTemplate";
import OtherDealTemplate from "./OtherDealTemplate";
import { useParams } from "react-router-dom";

const DealsBannerDefinder = (props) => {
  const { categoryState } = useParams();
  return (
    <Box
      sx={{
        display: "flex",
        px: "40px",
        border: "1px solid red",
      }}
    >
      {categoryState === "combi" && <CombiDealTemplate />}
      {categoryState === "sale" && <SaleTemplate />}
      {categoryState === "others" && <OtherDealTemplate />}
    </Box>
  );
};

DealsBannerDefinder.propTypes = {};

export default DealsBannerDefinder;
