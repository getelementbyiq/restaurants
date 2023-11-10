import React from "react";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";

const Footer = (props) => {
  return (
    <Box>
      <Box
        sx={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "499px",
            width: "100%",
            backgroundColor: "#014CAC",
            pt: "180px",
          }}
        >
          <Grid sx={{ justifyContent: "space-between", px: "100px" }}>
            <Box sx={{ maxWidth: "248px" }}>
              <Typography
                sx={{
                  fontFamily: "Integral CF Regular",
                  fontSize: "33px",
                  fontWeight: "700",
                  lineHeight: "40px",
                  letterSpacing: "0em",
                  textAlign: "left",
                }}
              >
                getcour
              </Typography>
              <Typography>
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </Typography>
              <Typography>2</Typography>
            </Box>
            <Box>
              <Typography>Company</Typography>
              <Typography>About</Typography>
              <Typography>Features</Typography>
              <Typography>Works</Typography>
              <Typography>Career</Typography>
            </Box>
            <Box>
              <Typography>Help</Typography>
              <Typography>Customer Support</Typography>
              <Typography>Delivery Details</Typography>
              <Typography>Term & Conditions</Typography>
              <Typography>Privacy Policy</Typography>
            </Box>
            <Box>
              <Typography>FAQ</Typography>
              <Typography>Account</Typography>
              <Typography>Manage Deliveries</Typography>
              <Typography>Orders</Typography>
              <Typography>Payments</Typography>
            </Box>
            <Box>
              <Typography>Resources</Typography>
              <Typography>Free eBooks</Typography>
              <Typography>Development Tutorial</Typography>
              <Typography>How to - Blog</Typography>
              <Typography>Youtube Playlist</Typography>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

Footer.propTypes = {};

export default Footer;
