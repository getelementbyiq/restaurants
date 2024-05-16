import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

const ProductsImageTemplateDeals = ({ product }) => {
  const { dealsId } = useParams();
  const [choosen, setChoosen] = useState(false);
  const products = useSelector(
    (state) => state.productsFetchSlice.productsOfDeals.data
  );
  useEffect(() => {
    setChoosen(
      products?.some((selectedProduct) => selectedProduct.id === product.id)
    );
  }, [dealsId, product.id, products]);
  console.log("products from List", product.id);

  const addOrDeleteProduct = (productId) => {
    if (choosen) {
      removeFromMenu(productId);
    } else {
      handleProductClick(productId);
    }
  };

  const removeFromMenu = async (productId) => {
    try {
      // Referenz zum Menüdokument in der "menus" Collection
      const menuDocRef = doc(db, "deals", dealsId);

      // Abrufen des aktuellen Menüdokuments
      const menuDocSnapshot = await getDoc(menuDocRef);
      if (menuDocSnapshot.exists()) {
        // Extrahieren des aktuellen Array-Werts von productIds
        const currentProductIds = menuDocSnapshot.data().productIds || [];

        // Entfernen des productId aus dem aktuellen Array
        const updatedProductIds = currentProductIds.filter(
          (id) => id !== productId
        );

        // Aktualisieren des Menüdokuments mit dem aktualisierten Array
        await updateDoc(menuDocRef, {
          productIds: updatedProductIds,
        });

        console.log("productId wurde erfolgreich aus dem Menü entfernt.");
      } else {
        console.log("Das Menüdokument existiert nicht.");
      }
    } catch (error) {
      console.error("Fehler beim Entfernen der productId aus dem Menü:", error);
    }
  };

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
        JSON.parse(localStorage.getItem("menus")) || [];
      const updatedMenus = menusFromLocalStorage.map((menu) => {
        if (menu.id === dealsId) {
          return { ...menu, productIds: [...menu.productIds, productId] };
        }
        return menu;
      });
      localStorage.setItem("menus", JSON.stringify(updatedMenus));
      console.log(
        "Menüobjekt im Local Storage wurde erfolgreich aktualisiert."
      );
    } catch (error) {
      console.error("Fehler beim Hinzufügen der productId zum Menü:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${product?.background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        width: "120px",
        height: "120px",
        position: "relative",
        overflow: "hidden",
        p: "16px",
        color: "#fff",
      }}
    >
      <IconButton
        onClick={() => addOrDeleteProduct(product.id)}
        sx={{
          position: "absolute",
          bottom: "50px",
          right: "50px",
          zIndex: "3000",
          transition: "150ms",
          backgroundColor: choosen ? "#FFAC9A" : "#fff",
          transform: choosen ? "rotate(45deg)" : "rotate(0deg) ",
          "&&:hover": {
            backgroundColor: choosen
              ? "rgba(255, 152, 130, 0.68)"
              : "rgba(225,225,225,0.8)",
            transform: choosen
              ? "rotate(45deg) scale(1.4)"
              : "rotate(0deg) scale(1.4)",
          },
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
          display: "flex",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          backgroundColor: choosen ? "rgba(4, 223, 0, 0.5)" : "rgba(0,0,0,0.5)",
        }}
      ></Box>

      <Typography
        sx={{
          fontFamily: "Quicksand",
          fontSize: "16px",
          position: "absolute",
          top: "8px",
          left: "8px",
        }}
      >
        {product?.tag}
      </Typography>
      <Box
        sx={{
          position: "relative",
          zIndex: "300",
          display: "flex",
          flexDirection: "column",
          mt: "16px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Quicksand",
            fontSize: "16px",
            color: "#fff",
          }}
        >
          {product?.name}
        </Typography>
      </Box>
    </Box>
  );
};

ProductsImageTemplateDeals.propTypes = {};

export default ProductsImageTemplateDeals;
