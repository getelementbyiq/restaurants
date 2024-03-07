import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const UpdateProduct = (product) => {
  return (
    <Box>
      <Typography
        sx={{
          postition: "relative",
          zIndex: "3",
          m: "0 auto",
          top: "16px",
        }}
      >
        Settings
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: "32px",
          color: "#fff",
        }}
      >
        <Button
          sx={{
            color: "#fff",
            "&:hover": {
              background: "rgba(225,225,225, 0.3)",
            },
          }}
        >
          Change
        </Button>
        <Button
          sx={{
            color: "#fff",
            "&:hover": {
              background: "rgba(225,225,225, 0.3)",
            },
          }}
        >
          Copy
        </Button>
        <Button
          sx={{
            color: "#fff",
            "&:hover": {
              background: "rgba(225,225,225, 0.3)",
            },
          }}
        >
          Share
        </Button>
        <Button
          sx={{
            color: "#fff",
            "&:hover": {
              background: "rgba(225,225,225, 0.3)",
            },
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

UpdateProduct.propTypes = {};

export default UpdateProduct;
