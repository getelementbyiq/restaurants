import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CombiDealTemplate from "./CombiDealTemplate";
import SaleTemplate from "./SaleTemplate";

const DealsBannerDefinder = (props) => {
  const dealsState = useSelector((state) => state.globalStates.dealsState);
  return (
    <Box
      sx={{
        display: "flex",
        px: "40px",
        border: "1px solid red",
      }}
    >
      {dealsState === "combi" && <CombiDealTemplate />}
      {dealsState === "sale" && <SaleTemplate />}
      {dealsState === "others" && (
        <Box>
          <Typography>Others wurde gedrückt</Typography>
        </Box>
      )}
    </Box>
  );
};

DealsBannerDefinder.propTypes = {};

export default DealsBannerDefinder;
