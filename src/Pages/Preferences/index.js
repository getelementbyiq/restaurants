import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CircularProgress,
  InputBase,
  Typography,
} from "@mui/material";
import { UserAuth } from "../../Auth/Auth";
import { useSelector } from "react-redux";

const PreferencesPages = (props) => {
  const { logout, user } = UserAuth();
  const userById = useSelector((state) => state.userById);

  console.log("user from preference", user);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        border: "1px solid red",
        alignItmes: "center",
        justifyContent: "center",
      }}
    >
      {!user ? ( // Wenn user nicht vorhanden ist, wird die Ladeanzeige angezeigt
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        // Wenn user vorhanden ist, wird der eigentliche Inhalt der Komponente gerendert
        <>
          <Box
            sx={{
              display: "flex",
              //   border: "1px solid red",
              flexGrow: "1",
              borderRadius: "32px",
              backgroundColor: "#F6F6F6",
              alignItems: "center",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                py: "32px",
                px: "32px",
                width: "60%",
                backgroundColor: "#fff",
                borderRadius: "32px",
                flexDirection: "column",
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
                I prefer
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                py: "32px",
                px: "32px",
                width: "60%",
                backgroundColor: "#fff",
                borderRadius: "32px",
                flexDirection: "column",
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
                What i like
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  border: "1px solid white",
                  py: "4px",
                  px: "16px",
                  borderRadius: "32px",
                  alignItems: "center",
                  backgroundColor: "rgba(225,225,225,0.50)",
                  backdropFilter: "blur(15px)",
                  flexGrow: "1",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewGrid="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.1974 15.5171C14.5949 16.7171 15.5024 16.8371 16.1999 15.7871C16.8374 14.8271 16.4174 14.0396 15.2624 14.0396C14.4074 14.0321 13.9274 14.6996 14.1974 15.5171Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <InputBase
                  fullWidth
                  //   InputProps={{ InputLabel: { color: "#000" } }}
                  placeholder="Night Clubs, Indian Food, Pizza, Bars..."
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                py: "32px",
                px: "32px",
                width: "60%",
                backgroundColor: "#fff",
                borderRadius: "32px",
                flexDirection: "column",
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
                I have alergie for
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  border: "1px solid white",
                  py: "4px",
                  px: "16px",
                  borderRadius: "32px",
                  alignItems: "center",
                  backgroundColor: "rgba(225,225,225,0.50)",
                  backdropFilter: "blur(15px)",
                  flexGrow: "1",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewGrid="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25 15C11.9779 15 15 11.9779 15 8.25C15 4.52208 11.9779 1.5 8.25 1.5C4.52208 1.5 1.5 4.52208 1.5 8.25C1.5 11.9779 4.52208 15 8.25 15Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.1974 15.5171C14.5949 16.7171 15.5024 16.8371 16.1999 15.7871C16.8374 14.8271 16.4174 14.0396 15.2624 14.0396C14.4074 14.0321 13.9274 14.6996 14.1974 15.5171Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <InputBase
                  fullWidth
                  //   InputProps={{ InputLabel: { color: "#000" } }}
                  placeholder="Garlec, Nuts..."
                  // onFocus={handleInputFocus}
                  // onBlur={handleInputBlur}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

PreferencesPages.propTypes = {};

export default PreferencesPages;
