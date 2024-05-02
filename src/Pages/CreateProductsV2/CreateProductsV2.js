import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import CreateMenu from "../../Components/CreateMenu";
import CreateProduct from "../../Components/CreateProduct";
import ProductPreview from "../../Components/ProductPreview/index";
import MenuDashboard from "../../Components/MenuDashboard";

const CreateProductsV2 = (props) => {
  const [activestate, setActiveState] = useState("Info");
  const open = (txt) => {
    setActiveState(txt);
  };
  return (
    <Grid container sx={{ display: "flex", flexGrow: "1", px: "40px" }}>
      <Grid
        item
        xs={6}
        md={6}
        sx={{
          // border: "1px solid red",
          display: "flex",
          flexGrow: "1",
          justifyContent: "center",
          pb: "8px",
        }}
      >
        <Grid container sx={{ display: "flex" }}>
          <Grid
            item
            xs={6}
            md={6}
            sx={{ display: "flex", p: "4px", flexDirection: "column" }}
          >
            {/* <Box
              sx={{
                display: "flex",
                // border: "1px solid red",
                justifyContent: "space-around",
              }}
            >
              <Box
                onClick={() => open("Info")}
                sx={{
                  display: "flex",
                  // border: "1px solid black",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  backgroundColor:
                    activestate === "Info"
                      ? "rgba(0,0,0,0.1)"
                      : "rgba(0,0,0,0.05)",
                }}
              >
                <Typography>Info</Typography>
                <Box
                  sx={{
                    display: "flex",
                    borderRadius: "2px",
                    height: "2px",
                    backgroundColor:
                      activestate === "Info" ? "#FF00D6" : "white",
                    width: "100%",
                  }}
                ></Box>
              </Box>
              <Box
                onClick={() => open("Time")}
                sx={{
                  display: "flex",
                  // border: "1px solid black",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  visibility: activestate === "Time" ? "100%" : "60%",
                  backgroundColor:
                    activestate === "Time"
                      ? "rgba(0,0,0,0.1)"
                      : "rgba(0,0,0,0.05)",
                }}
              >
                <Typography>Time</Typography>
                <Box
                  sx={{
                    display: "flex",
                    borderRadius: "2px",
                    height: "2px",
                    backgroundColor:
                      activestate === "Time" ? "#FF00D6" : "white",
                    width: "100%",
                  }}
                ></Box>
              </Box>
            </Box> */}
            <CreateProduct />
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            sx={{
              display: "flex",
              // border: "1px solid orange",
              flexWrap: "wrap",
              p: "4px",
            }}
          >
            <ProductPreview />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={6}
        md={6}
        sx={{
          border: "1px solid red",
          display: "flex",
          flexGrow: "1",
          justifyContent: "center",
          pb: "8px",
        }}
      ></Grid>
    </Grid>
  );
};

CreateProductsV2.propTypes = {};

export default CreateProductsV2;
