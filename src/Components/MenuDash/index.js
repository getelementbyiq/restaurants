import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import TimestampComponent from "../TimeStampComponent";
import {
  setActionsActive,
  setAddProductsActive,
  setSettingsActive,
} from "../../Redux/functions/slices/Category/AddProducts";
import CreateProduct from "../CreateProduct";
import Product from "../Product";
import ProductPreview from "../ProductPreview";
import Setteditems from "../SettedItems";

const MenuDash = (props) => {
  const { id } = useParams();

  const [categoryD, setCategoryd] = useState();
  const restaurantId = id;
  const foodActive = useSelector((state) => state.foodActive);
  const dispatch = useDispatch();
  const restaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const categoryTypeData = useSelector((state) => state.categoryActive);
  const categoryType = categoryTypeData.categoryActive;
  const selectedCategoryId = useSelector((state) => state.selectedCategory);
  const categoryActive = useSelector((state) => state.categoryDash);
  const activeCat = categoryActive.active;

  console.log("restaurantId:", restaurantId);
  console.log("categoryType:", categoryType);
  console.log("categoryD:", categoryD);
  console.log("selectedCategoryId:", selectedCategoryId);
  console.error("selectedCategoryId:", categoryActive);
  console.error("selectedCategoryId:", activeCat);

  const fetchCategory = async (restaurantId, categoryType, categoryId) => {
    const categoryRef = doc(
      db,
      "restaurants",
      restaurantId,
      categoryType,
      categoryId
    );

    try {
      // Daten der Kategorie aus Firestore abrufen
      const categoryDoc = await getDoc(categoryRef);

      if (categoryDoc.exists()) {
        return categoryDoc.data();
      } else {
        console.error("Kategorie nicht gefunden");
        return null;
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Kategorie:", error);
      return null;
    }
  };

  const updateCategory = async (
    restaurantId,
    categoryType,
    categoryId,
    updatedData
  ) => {
    const categoryRef = doc(
      db,
      "restaurants",
      restaurantId,
      categoryType,
      categoryId
    );

    try {
      // Daten der Kategorie aus Firestore abrufen
      const categoryDoc = await getDoc(categoryRef);

      if (categoryDoc.exists()) {
        const currentData = categoryDoc.data();

        // Aktualisiere die Daten mit den neuen Informationen
        const newData = { ...currentData, ...updatedData };

        // Daten in Firestore aktualisieren
        await updateDoc(categoryRef, newData);

        // Aktualisierte Daten im Redux Store setzen
        dispatch(
          updateCategory({
            categoryType,
            categoryId,
            updatedData: newData,
          })
        );
      } else {
        console.error("Kategorie nicht gefunden");
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Kategorie:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategoryId) {
        try {
          const categoryData = await fetchCategory(
            restaurantId,
            categoryType,
            selectedCategoryId
          );

          console.log("categoryData---------------", categoryData);
          if (categoryData) {
            setCategoryd(categoryData);
            // Hier könntest du auch weitere Aktionen ausführen, wenn categoryData vorhanden ist
          }
        } catch (error) {
          console.error("Fehler beim Abrufen der Kategorie:", error);
        }
      }
    };

    fetchData();

    // Der leere Abhängigkeitsarray [] stellt sicher, dass useEffect nur einmalig beim ersten Rendern ausgeführt wird
  }, [selectedCategoryId]);

  const handleAddActive = () => {
    dispatch(setAddProductsActive());
  };
  const handleSettingsActive = () => {
    dispatch(setSettingsActive());
  };
  const handleActionsActive = () => {
    dispatch(setActionsActive());
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: "32px",
        background: !foodActive
          ? "rgba(202, 206, 0, 0.30)"
          : " rgba(0, 185, 197, 0.30)",
        backdropFilter: "blur(20px)",
        height: "80vh",
      }}
    >
      {categoryD && (
        <Box sx={{ px: "16px", pt: "8px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#fff",
            }}
          >
            <Typography sx={{ fontSize: "18px" }}>{categoryD.name}</Typography>

            <Box sx={{ display: "flex", gap: "32px" }}>
              <Box
                onClick={handleAddActive}
                sx={{
                  cursor: "pointer",
                  opacity: activeCat === "add" ? "100%" : "50%",
                }}
              >
                <Typography>Add Products</Typography>
                {activeCat === "add" && (
                  <Box
                    sx={{
                      display: "flex",
                      height: "2px",
                      borderRadius: "4px",
                      background: "#fff",
                    }}
                  ></Box>
                )}
              </Box>
              <Box
                onClick={handleSettingsActive}
                sx={{
                  cursor: "pointer",
                  opacity: activeCat === "settings" ? "100%" : "50%",
                }}
              >
                <Typography>Settings</Typography>
                {activeCat === "settings" && (
                  <Box
                    sx={{
                      display: "flex",
                      height: "2px",
                      borderRadius: "4px",
                      background: "#fff",
                    }}
                  ></Box>
                )}
              </Box>
              <Box
                onClick={handleActionsActive}
                sx={{
                  cursor: "pointer",
                  opacity: activeCat === "actions" ? "100%" : "50%",
                }}
              >
                <Typography>Actions</Typography>
                {activeCat === "actions" && (
                  <Box
                    sx={{
                      display: "flex",
                      height: "2px",
                      borderRadius: "4px",
                      background: "#fff",
                    }}
                  ></Box>
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", mt: "32px" }}>
            <CreateProduct />
            <Box
              sx={{
                flexGrow: "1",
                px: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#fff" }}>Choosen Items</Typography>
              <Setteditems />
            </Box>
            <ProductPreview />
          </Box>
        </Box>
      )}
    </Box>
  );
};

MenuDash.propTypes = {};

export default MenuDash;
