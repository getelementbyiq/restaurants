import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const DealsDefinder = (props) => {
  return (
    <Box sx={{ display: "flex", border: "1px solid red", gap: "16px" }}>
      <Typography>combi</Typography>
      <Typography>sale</Typography>
      <Typography>other...</Typography>
    </Box>
  );
};

DealsDefinder.propTypes = {};

export default DealsDefinder;
