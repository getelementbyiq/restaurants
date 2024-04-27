import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const NonAccount = (props) => {
  const location = useLocation();
  return (
    <Box
      sx={{
        position: "absolute",
        top: "70px",
        right: "70px",
        zIndex: "2600",
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        color: location.pathname.includes("signin") ? "#EBFF00" : "#FF00D6",
      }}
    >
      {location.pathname.includes("signin") && (
        <Typography
          sx={{
            fontSize: "20px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
          }}
        >
          or create new account
        </Typography>
      )}
      {location.pathname.includes("signup") && (
        <Typography
          sx={{
            fontSize: "20px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
          }}
        >
          or you have an account?
        </Typography>
      )}
      <Box
        sx={{
          position: "relative",
          transform: "translateY(-6px)",
        }}
      >
        <svg
          width="44"
          height="54"
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 51.5C0.447715 51.5 0 51.9477 0 52.5C0 53.0523 0.447715 53.5 1 53.5V51.5ZM35 0.5L32.9104 11.8564L43.7901 7.98783L35 0.5ZM1 52.5C1 53.5 1.00045 53.5 1.00099 53.5C1.0013 53.5 1.00194 53.5 1.00255 53.5C1.00378 53.5 1.0054 53.5 1.00739 53.5C1.01137 53.5 1.01686 53.5 1.02385 53.4999C1.03783 53.4998 1.05777 53.4997 1.08354 53.4994C1.13506 53.4988 1.20986 53.4976 1.30667 53.4953C1.50028 53.4907 1.78203 53.4816 2.14187 53.4636C2.86141 53.4275 3.89409 53.3556 5.15936 53.2124C7.68768 52.9262 11.1566 52.3537 14.9168 51.2065C22.4161 48.9186 31.2196 44.2968 35.8944 34.9472L34.1056 34.0528C29.7804 42.7032 21.5839 47.0814 14.3332 49.2935C10.7184 50.3963 7.37482 50.9488 4.93439 51.2251C3.71528 51.3631 2.72453 51.4319 2.04172 51.4661C1.70039 51.4832 1.43625 51.4917 1.25925 51.4959C1.17076 51.498 1.10408 51.499 1.06045 51.4995C1.03863 51.4998 1.02258 51.4999 1.01246 51.4999C1.00739 51.5 1.00381 51.5 1.00173 51.5C1.00069 51.5 1.00002 51.5 0.999731 51.5C0.999587 51.5 0.999654 51.5 0.999582 51.5C0.999743 51.5 1 51.5 1 52.5ZM35.8944 34.9472C40.9668 24.8025 40.4672 15.2737 38.9905 8.75879L37.04 9.20092C38.4464 15.4056 38.9148 24.4344 34.1056 34.0528L35.8944 34.9472Z"
            fill={location.pathname.includes("signin") ? "#EBFF00" : "#FF00D6"}
          />
        </svg>
      </Box>
    </Box>
  );
};

NonAccount.propTypes = {};

export default NonAccount;
