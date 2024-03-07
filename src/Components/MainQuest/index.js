import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import MainTest from "../MainTest";

const MainQuest = (props) => {
  return (
    <Box sx={{ display: "flex", border: "1px solid red" }}>
      <MainTest />
    </Box>
  );
};

MainQuest.propTypes = {};

export default MainQuest;
