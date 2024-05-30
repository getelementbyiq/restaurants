import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectViralError,
  selectViralLoading,
  selectViralProducts,
} from "../../Redux/immigration/products/productsForMainRestaurantPage";

const ViralProducts = (props) => {
  const products = useSelector(selectViralProducts);
  const loading = useSelector(selectViralLoading);
  const error = useSelector(selectViralError);
  const productWidths = [25, 40, 25, 55, 37, 25, 25, 40];
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        px: "40px",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexGrow: "1",
          px: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: "600",
              fontSize: "24px",
            }}
          >
            Angesagttesten Produkte um die Uhrzeit
          </Typography>
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: "200",
              fontSize: "16px",
            }}
          >
            Hier sind die Produkte, die um die Uhrzeit unsere Kunde mögen.
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: "200",
              fontSize: "16px",
            }}
          >
            Sie besitzen ein oder gar mehrere Läden?
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: "1",
          // border: "1px solid green",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // border: "1px solid black",
            flexWrap: "wrap",
            gap: "16px",
            margin: "0 auto",
            flexGrow: "1",
            justifyContent: "center",
          }}
        >
          {products?.map((product, index) => (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                width: `${productWidths[index % productWidths.length]}%`,
                // border: "1px solid red",
                height: "230px",
                borderRadius: "32px",
                backgroundImage: `url(${product.background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover", // Du kannst die Hintergrundgröße anpassen
                backgroundPosition: "center",
                transition: "250ms",
                "&&:hover": {
                  transform: "scale(1.01)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexgrow: "1",
                  px: "32px",
                  py: "16px",
                }}
              >
                <Typography>{product.name}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          // border: "1px solid red",
          flexGrow: "1",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: "100",
              fontSize: "20px",
            }}
          >
            Show more
          </Typography>
          <IconButton>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.5614 11.9336L17.8681 20.6269C16.8414 21.6536 15.1614 21.6536 14.1347 20.6269L5.44141 11.9336"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

ViralProducts.propTypes = {};

export default ViralProducts;
