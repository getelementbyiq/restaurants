import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ListProductTemplate from "../../Templates/ListProductTemplate/ListProductTemplate";
import { useParams } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import ProductSecondLayout from "../../ProductsecondLayout";
import useMobileCheck from "../../MobileCheck";
import ProductsImageTemplateDeals from "../../Templates/ProductsImageTemplate/ProductsImageTemplateDeals";
let productIndex = 0;
const size = ["small", "medium", "large"];
const ProductRenderDelas = (props) => {
  const { dealsId } = useParams();
  const isMobile = useMobileCheck();
  const searchValue = useSelector(
    (state) => state.productsFetchSlice.searchResults
  );
  const allProductData = useSelector(
    (state) => state.productsFetchSlice.productsData
  );
  const addProductsState = useSelector(
    (state) => state.globalStates.menuAddProduct
  );

  const products = useSelector(
    (state) => state.productsFetchSlice.productsOfDeals.data
  );
  const searchTerm = useSelector(
    (state) => state.productsFetchSlice.searchValue
  );
  console.log("products menunav", products);

  const handleProductClick = async (productId) => {
    try {
      // Referenz zum Menüdokument in der "menus" Collection
      const menuDocRef = doc(db, "deals", dealsId);

      // Aktualisiere das Menüdokument und füge die productId zur productIds-Liste hinzu
      await updateDoc(menuDocRef, {
        productIds: arrayUnion(productId),
      });
      console.log("productId wurde erfolgreich zum Menü hinzugefügt.");

      // Aktualisiere das Menüobjekt im Local Storage
      const menusFromLocalStorage =
        JSON.parse(localStorage.getItem("deals")) || [];
      const updatedMenus = menusFromLocalStorage.map((menu) => {
        if (menu.id === dealsId) {
          return { ...menu, productIds: [...menu.productIds, productId] };
        }
        return menu;
      });
      localStorage.setItem("deals", JSON.stringify(updatedMenus));
      console.log(
        "Menüobjekt im Local Storage wurde erfolgreich aktualisiert."
      );
    } catch (error) {
      console.error("Fehler beim Hinzufügen der productId zum Menü:", error);
    }
  };

  const [show, setShow] = useState(false);
  const [linkId, setLinkId] = useState(null);
  const clichOpen = (id) => {
    if (show === false && linkId === null) {
      setLinkId(id);
      setShow(true);
    } else if (show === true && linkId === dealsId) {
      setLinkId(null);
      setShow(false);
    } else if (show === true && id !== linkId) {
      setShow(false);
      setLinkId(null);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexGrow: "1",
        // flexWrap: "wrap",
        // border: "2px solid green",
        // px: "5px",
        position: "relative",
        // overflow: "hidden",
      }}
    >
      <IconButton
        onClick={() => clichOpen(dealsId)}
        sx={{
          position: "absolute",
          top: "-80px",
          right: "0",
          zIndex: "3000",
          transition: "150ms",
          backgroundColor: "#fff",
          transform: show ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 9H13.5"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 13.5V4.5"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconButton>

      <Box
        sx={{
          display: "grid",
          gap: "16px",
          // border: "2px solid red",
          width: isMobile ? "100vw" : show ? "64%" : "100%",
          // backgroundColor: "black",
          // position: "absolute",
          // left: "50%",
          // transform: "translateX(-50%)",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fill,45%)"
            : "repeat(auto-fill,220px)",
          gridAutoRows: "10px",
          // justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {!addProductsState &&
          products &&
          products.map((product, index) => {
            const currentSize = size[productIndex % size.length];
            productIndex++;
            return (
              <ProductSecondLayout
                key={product.id}
                size={currentSize}
                product={product}
              />
            );
          })}
      </Box>
      {/* {addProductsState &&
        products &&
        products.map((product, index) => (
          <Box key={index}>
            <ProductsImageTemplate product={product} />
          </Box>
        ))}{" "} */}
      {show && (
        <Box
          sx={{
            width: "36%",
            border: "2px solid yellow",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              // border: "2px solid yellow",
              flexWrap: "wrap",
              gap: "8px",
              maxHeight: "100%",
              overflow: "scrollY",
              scrollbarWidth: "2px",
              // alignItems: "flex-start",
            }}
          >
            {searchTerm && searchValue.length === 0 ? (
              <Typography>Es wurde für {searchTerm} nichts gefunden</Typography>
            ) : searchValue.length === 0 ? (
              allProductData?.map((product) => (
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={() => handleProductClick(product.id)}
                >
                  <ProductsImageTemplateDeals product={product} />
                </Box>
              ))
            ) : (
              searchValue?.map((product) => (
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                  }}
                  onClick={() => handleProductClick(product.id)}
                >
                  <ProductsImageTemplateDeals product={product} />
                </Box>
              ))
            )}
          </Box>
        </Box>
      )}
    </Grid>
  );
};

ProductRenderDelas.propTypes = {};

export default ProductRenderDelas;
