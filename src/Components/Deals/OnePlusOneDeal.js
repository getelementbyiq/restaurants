import React from "react";
import PropTypes from "prop-types";
import { Box, TextField, Typography } from "@mui/material";

const OnePlusOneDeal = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <Typography>13€ + 25€ = </Typography>
      <TextField
        size="small"
        sx={{ width: "100px" }}
        placeholder="Please put how much it should cost"
        InputProps={{ style: { borderRadius: "32px" } }}
        // value={searchTerm}
        // onChange={handleSearch}
      />
    </Box>
  );
};

OnePlusOneDeal.propTypes = {};

export default OnePlusOneDeal;
