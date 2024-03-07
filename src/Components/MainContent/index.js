import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import MainContentMessage from "../MainContentMessage";
import MainTest from "../MainTest";

const MainContent = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid red",
        px: "40px",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* <MainContentMessage /> */}
      <MainTest />
    </Box>
  );
};

MainContent.propTypes = {};

export default MainContent;
