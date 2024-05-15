import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import ListProductTemplate from "../../Templates/ListProductTemplate/ListProductTemplate";
import ProductsImageTemplate from "../../Templates/ProductsImageTemplate/ProductsImageTemplate";
import { useParams } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import ProductSecondLayout from "../../ProductsecondLayout";
import useMobileCheck from "../../MobileCheck";
let productIndex = 0;
const size = ["small", "medium", "large"];
const ProductsRender = (props) => {
  const { menuId } = useParams();
  const isMobile = useMobileCheck();
  const searchValue = useSelector(
    (state) => state.productsFetchSlice.searchResults
  );

  const products = useSelector(
    (state) => state.productsFetchSlice.productsOfMenu.data
  );
  console.log("products menunav", products);

  const handleProductClick = async (productId) => {
    try {
      // Referenz zum Menüdokument in der "menus" Collection
      const menuDocRef = doc(db, "menus", menuId);

      // Aktualisiere das Menüdokument und füge die productId zur productIds-Liste hinzu
      await updateDoc(menuDocRef, {
        productIds: arrayUnion(productId),
      });
      console.log("productId wurde erfolgreich zum Menü hinzugefügt.");

      // Aktualisiere das Menüobjekt im Local Storage
      const menusFromLocalStorage =
        JSON.parse(localStorage.getItem("menus")) || [];
      const updatedMenus = menusFromLocalStorage.map((menu) => {
        if (menu.id === menuId) {
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
        display: "flex",
        flexGrow: "1",
        flexWrap: "wrap",
        gap: "8px",
        // border: "2px solid green",
        px: "50px",
      }}
    >
      {searchValue?.map((product) => (
        <Box
          onClick={() => handleProductClick(product.id)}
          sx={{ cursor: "pointer" }}
        >
          <ProductsImageTemplate product={product} />
        </Box>
      ))}

      <Box
        sx={{
          display: "grid",
          gap: "16px",
          // border: "1px solid green",
          width: isMobile ? "100vw" : "90vw",
          // backgroundColor: "black",
          // position: "absolute",
          // left: "50%",
          // transform: "translateX(-50%)",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fill,45%)"
            : "repeat(auto-fill,220px)",
          gridAutoRows: "10px",
          // justifyContent: "center",
        }}
      >
        {products &&
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
    </Box>
  );
};

ProductsRender.propTypes = {};

export default ProductsRender;
