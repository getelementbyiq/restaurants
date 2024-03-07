import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";

const MainPlattformMessage = (props) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        width: "100%",
        // border: "1px solid red",
        px: "40px",
        py: "16px",
        backgroundColor: "#FAFAFA",
        borderRadius: "40px",
        justifyContent: "space-between",
      }}
    >
      <Grid
        item
        xs={4}
        md={4}
        sx={{
          display: "flex",
          // border: "1px solid red",
          width: "100%",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Microsoft Uighur",
            fontSize: "90px",
            fontWeight: "800",
            lineHeight: "80%",
          }}
        >
          Gipo
        </Typography>
        <Typography
          sx={{
            fontFamily: "Noto Sans",
            fontSize: "16px",
            fontWeight: "100",
          }}
        >
          wird entwickelt um euren Geschmack zu 100% zu treffen, und bester
          Kellner zu sein.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Noto Sans",
            fontSize: "16px",
            fontWeight: "400",
            mt: "32px",
          }}
        >
          Die Zukunft der Gastronomie Guide’s
        </Typography>
        <svg
          width="160"
          height="80"
          viewBox="0 0 212 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: "8px", left: "80%" }}
        >
          <path
            d="M0.333333 112C0.333333 113.473 1.52724 114.667 3 114.667C4.47276 114.667 5.66667 113.473 5.66667 112C5.66667 110.527 4.47276 109.333 3 109.333C1.52724 109.333 0.333333 110.527 0.333333 112ZM149 58.5002L148.597 58.2043L149 58.5002ZM211.686 5.96447C211.942 5.86192 212.067 5.57093 211.964 5.31454L210.293 1.13639C210.19 0.880002 209.899 0.755294 209.643 0.857851C209.387 0.960407 209.262 1.25139 209.365 1.50778L210.85 5.22169L207.136 6.70725C206.88 6.80981 206.755 7.1008 206.858 7.35719C206.96 7.61358 207.251 7.73829 207.508 7.63573L211.686 5.96447ZM2.95193 112.498C32.2709 115.33 102.221 123.044 149.403 58.7962L148.597 58.2043C101.779 121.957 32.3958 114.337 3.04807 111.502L2.95193 112.498ZM149.403 58.7962C167.052 34.7634 180.893 20.8075 191.17 13.2377C196.308 9.45276 200.54 7.2762 203.898 6.2281C207.263 5.17794 209.703 5.27418 211.303 5.95981L211.697 5.04066C209.797 4.22629 207.091 4.18415 203.6 5.27351C200.104 6.36493 195.772 8.60579 190.577 12.4325C180.186 20.0859 166.277 34.13 148.597 58.2043L149.403 58.7962Z"
            fill="#444444"
          />
        </svg>
      </Grid>
      <Grid
        item
        xs={7}
        md={7}
        sx={{
          display: "flex",
          // border: "1px solid green",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // border: "1px solid red",
            py: "16px",
            px: "32px",
            borderRadius: "32px",
            backgroundColor: "#fff",
          }}
        >
          <Grid container>
            <Grid item xs={8} md={8}>
              <Typography
                sx={{
                  fontFamily: "Noto Sans",
                  fontSize: "16px",
                  fontWeight: "100",
                }}
              >
                Look in to this dish “Pasta Napoli” from Napoli Restaurant, it
                seems this dish is perfect match for your taste.if you whant i
                can reserve a table for you, or make an order for delivery
              </Typography>
            </Grid>
            <Grid item xs={4} md={4}></Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: "1" }}></Box>
        <Box
          sx={{
            display: "flex",
            // border: "1px solid red",
            py: "8px",
            px: "16px",
            borderRadius: "40px",
            backgroundColor: "#fff",
          }}
        >
          <Box sx={{ flexGrow: "1" }}></Box>
          <Box>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                stroke="#444444"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 20.4999V3.66992"
                stroke="#444444"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

MainPlattformMessage.propTypes = {};

export default MainPlattformMessage;
