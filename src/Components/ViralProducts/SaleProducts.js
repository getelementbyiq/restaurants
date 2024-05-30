import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectViralError,
  selectViralLoading,
  selectViralProducts,
} from "../../Redux/immigration/products/productsForMainRestaurantPage";
import {
  selectSaleMenus,
  selectSaleProducts,
} from "../../Redux/immigration/products/productsForMainRestaurantPageSales";

const SaleProducts = (props) => {
  const products = useSelector(selectSaleProducts);
  const saleMenus = useSelector(selectSaleMenus);

  const loading = useSelector(selectViralLoading);
  const error = useSelector(selectViralError);
  const sizes = [1, 2, 1, 1];

  const styles = {
    productStyle: {
      margin: "0",
      padding: "0",
      // borderRadius: "16px",
      // backgroundColor: "red",
      display: "flex",
    },
    small: {
      gridRowEnd: "span 1",
    },
    medium: {
      gridRowEnd: "span 1",
    },
    large: {
      gridRowEnd: "span 2",
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        px: "40px",
        flexDirection: "column",
        gap: "20px",
        pb: "32px",
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
            Reduzierte Angebote für Sie
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {saleMenus?.map((menu, index) => (
              <Box
                key={menu.id}
                sx={{
                  display: "flex",
                  px: "24px",
                  py: "8px",
                  border: "16px",
                  backgroundColor: index === 0 ? "red" : "white",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Noto Sans",
                    fontWeight: "200",
                    fontSize: "16px",
                  }}
                >
                  {menu.name}
                </Typography>
              </Box>
            ))}
          </Box>
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
          gap: "16px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "repeat(2, auto)",
            gap: "16px",
            // border: "1px solid green",
            flexGrow: "1",
            px: "40px",
          }}
        >
          {products?.map((product, index) => (
            <Box
              key={product.id}
              sx={{
                gridColumn: index === 0 ? "span 4" : "span 2",
                gridRow: index === 1 ? "span 2" : "span 1",
                height: index === 1 ? "auto" : "240px", // oder eine andere feste Höhe für nicht-doppelte Produkte
                backgroundImage: `url(${product.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexGrow: index % 2 ? "1" : "none",
                // border: "1px solid red",
                borderRadius: "32px",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                {product.name} {index}
              </Typography>
            </Box>
          ))}
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
    </Box>
  );
};

SaleProducts.propTypes = {};

export default SaleProducts;
