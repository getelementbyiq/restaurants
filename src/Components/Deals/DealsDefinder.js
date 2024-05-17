import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { setDealsState } from "../../Redux/immigration/globalStates/globalStatesSlice";
import { useDispatch, useSelector } from "react-redux";

const DealsDefinder = (props) => {
  const dispatch = useDispatch();
  const dealsState = useSelector((state) => state.globalStates.dealsState);

  const openDeal = (txt) => {
    dispatch(setDealsState(txt));
  };
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid red",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <Box
        onClick={() => openDeal("combi")}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContenr: "center",
          px: "12px",
          py: "4px",
          backgroundColor: dealsState === "combi" ? "red" : "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
            color: "#000",
          }}
        >
          combi
        </Typography>
      </Box>
      <Box
        onClick={() => openDeal("sale")}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContenr: "center",
          px: "12px",
          py: "4px",
          backgroundColor: dealsState === "sale" ? "red" : "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
            color: "#000",
          }}
        >
          sale
        </Typography>
      </Box>
      <Box
        onClick={() => openDeal("others")}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContenr: "center",
          px: "12px",
          py: "4px",
          backgroundColor: dealsState === "others" ? "red" : "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
            color: "#000",
          }}
        >
          other...
        </Typography>
      </Box>
    </Box>
  );
};

DealsDefinder.propTypes = {};

export default DealsDefinder;
