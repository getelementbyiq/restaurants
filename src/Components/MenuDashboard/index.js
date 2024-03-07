import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Scrollbar } from "react-scrollbars-custom";
import TimestampComponent from "../TimeStampComponent";
import {
  setActionsActive,
  setAddProductsActive,
  setAllProductsActive,
  setSettingsActive,
} from "../../Redux/functions/slices/Category/AddProducts";
import CreateProduct from "../CreateProduct";
import Product from "../Product";
import ProductPreview from "../ProductPreview";
import Setteditems from "../SettedItems";
import Add from "../../assets/icons/add-black.svg";
import MenuDashboardNavbar from "../MenuDashboardNavbar";
import ClassicProduct from "../ClassicProduct";

const MenuDashboard = (props) => {
  const { id } = useParams();

  const [categoryD, setCategoryd] = useState();
  const restaurantId = id;
  const foodActive = useSelector((state) => state.foodActive);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.fetchProducts.fetchProducts);

  const restaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const categoryTypeData = useSelector((state) => state.categoryActive);
  const categoryType = categoryTypeData.categoryActive;
  const selectedCategoryId = useSelector((state) => state.selectedCategory);
  const categoryActive = useSelector((state) => state.categoryDash);
  const activeCat = categoryActive.active;
  const searchResults = useSelector((state) => state.searchResult);

  console.log("restaurantId:", restaurantId);
  console.log("categoryType:", categoryType);
  console.log("categoryD:", categoryD);
  console.error("selectedCategoryId:", selectedCategoryId);
  console.error("categoryActive:", categoryActive);
  console.error("product:", product);

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

          console.log(
            "categoryData--------------- aus dem Use-Effect",
            categoryData
          );
          if (categoryData) {
            setCategoryd(categoryData);
            // Hier könntest du auch weitere Aktionen ausführen, wenn categoryData vorhanden ist
          }
        } catch (error) {
          console.error(
            "Fehler beim Abrufen der Kategorie aus dem Use Effect:",
            error
          );
        }
      }
    };

    fetchData();

    // Der leere Abhängigkeitsarray [] stellt sicher, dass useEffect nur einmalig beim ersten Rendern ausgeführt wird
  }, [selectedCategoryId]);

  console.log("categoryD", categoryD);
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        // background: !foodActive ? "#fff" : "#fff",
        // backdropFilter: "blur(20px)",
        // border: "1px solid red",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          // border: "1px solid red",
        }}
      >
        <MenuDashboardNavbar categoryD={categoryD} />
      </Box>
      <Box sx={{ display: "flex", flexGrow: "1" }}>
        {activeCat === "add" && (
          <Grid container sx={{ display: "flex" }}>
            <Grid item xs={4} md={4} sx={{ display: "flex" }}></Grid>
            <Grid item xs={4} md={4} sx={{ display: "flex", p: "4px" }}>
              <CreateProduct />
            </Grid>
            <Grid
              item
              xs={4}
              md={4}
              sx={{
                display: "flex",
                // border: "1px solid red",
                flexWrap: "wrap",
                p: "4px",
              }}
            >
              <ProductPreview />
            </Grid>
          </Grid>
        )}
        {activeCat === "all" && (
          <Scrollbar
            style={{
              width: "100%",
              maxHeight: "100%",
            }}
          >
            <Grid container sx={{ display: "flex" }}>
              {/* {Object.values(product).map((product, index) => (
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  key={index}
                  sx={{ padding: "4px" }}
                >
                  <Product product={product} />
                </Grid>
              ))} */}
              {Object.values(product).map((product, index) => (
                <Grid
                  item
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  key={index}
                  sx={{
                    padding: "4px",
                    margin: "0 auto",
                    // border: "1px solid red",
                  }}
                >
                  <ClassicProduct product={product} />
                </Grid>
              ))}
            </Grid>
          </Scrollbar>
        )}
        {activeCat === "settings" && <Typography>Settings</Typography>}
        {activeCat === "actions" && <Typography>Actions</Typography>}
      </Box>
    </Box>
  );
};

MenuDashboard.propTypes = {};

export default MenuDashboard;
