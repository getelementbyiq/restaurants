import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";

const CombinedProduct = (product) => {
  console.log("product", product.product);
  return (
    <Grid
      sx={{
        display: "flex",
        // border: "1px solid blue",

        borderRadius: "16px",
        background: "#FAFAFA",
        overflow: "hidden",
        minHeight: "130px",
      }}
    >
      <Grid item xs={4} md={4} lg={4} sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            // border: "1px solid blue",
            backgroundImage: `url(${product.product.background})`,

            //   backgroundImage: `url(${localData.background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // Du kannst die Hintergrundgröße anpassen
            backgroundPosition: "center",
          }}
        ></Box>
      </Grid>
      <Grid
        item
        xs={8}
        md={4}
        lg={8}
        sx={{
          // border: "1px solid red",
          display: "flex",
          flexDirection: "column",
          px: "32px",
          py: "8px",
          background: "#FAFAFA",
        }}
      >
        <Box
          sx={{
            display: "flex",
            //   border: "1px solid red",
            justifyContent: "space-between",
          }}
        >
          <Typography>{product.product.name}</Typography>
          <Typography>{product.product.price} €</Typography>
        </Box>
        <Typography>{product.product.description}</Typography>
      </Grid>
    </Grid>
  );
};

CombinedProduct.propTypes = {};

export default CombinedProduct;
