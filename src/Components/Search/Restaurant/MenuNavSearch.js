import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import ListProductTemplate from "../../Templates/ListProductTemplate/ListProductTemplate";
import ProductsImageTemplate from "../../Templates/ProductsImageTemplate/ProductsImageTemplate";
import { useParams } from "react-router-dom";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const MenuNavSearch = (props) => {
  const { menuId } = useParams();
  const searchValue = useSelector(
    (state) => state.productsFetchSlice.searchResults
  );

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
    </Box>
  );
};

MenuNavSearch.propTypes = {};

export default MenuNavSearch;
