import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const MainContentMessage = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          px: "24px",
          py: "16px",
          // border: "1px solid red",
          borderRadius: "32px",
          backgroundColor: "#FAFAFA",
        }}
      >
        <Typography>
          Bis unser Kellner einsatzbereit ist können Sie gerne unsere
          Restaurantnts kennenlernen
        </Typography>
      </Box>
    </Box>
  );
};

MainContentMessage.propTypes = {};

export default MainContentMessage;
