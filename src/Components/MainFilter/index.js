import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const MainFilter = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        gap: "16px",
        justifyContent: "center",
        my: "16px",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          px: "24px",
          py: "4px",
          borderRadius: "32px",
          // backgroundColor: "yellow",
          justifyContent: "center",
          flexDirection: "column",
          gap: "8px",
          fontSize: "20px",
          fontFamily: "Knewave, system-ui",
          fontWeight: "400",
          fontStyle: "normal",
          lineHeight: "90%",
          color: "#000",
        }}
      >
        Virals
        <Box
          sx={{
            display: "flex",
            height: "4px",
            borderRadius: "4px",
            backgroundColor: "#FF00D6",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          px: "24px",
          py: "4px",
          borderRadius: "32px",
          // backgroundColor: "#F2F2F2",
          alignItems: "center",
          gap: "8px",
        }}
      >
        Breakfast
      </Box>
      <Box
        sx={{
          px: "24px",
          py: "4px",
          borderRadius: "32px",
          // backgroundColor: "#F2F2F2",
        }}
      >
        Lunch
      </Box>
      <Box
        sx={{
          px: "24px",
          py: "4px",
          borderRadius: "32px",
          // backgroundColor: "#F2F2F2",
        }}
      >
        Dinner
      </Box>
    </Box>
  );
};

MainFilter.propTypes = {};

export default MainFilter;
