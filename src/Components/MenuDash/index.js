import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
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

const MenuDash = (props) => {
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

  console.log("restaurantId:", restaurantId);
  console.log("categoryType:", categoryType);
  console.log("categoryD:", categoryD);
  console.error("selectedCategoryId:", selectedCategoryId);
  console.error("categoryActive:", categoryActive);
  console.error("fetchedProducts--------", product);

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

  const handleAllActive = () => {
    dispatch(setAllProductsActive());
  };

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
        display: "flex",
        flexGrow: "1",
        // background: !foodActive ? "#fff" : "#fff",
        // backdropFilter: "blur(20px)",
        border: "1px solid red",
      }}
    >
      {categoryD && (
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            border: "1px soalid red",
            flexDirection: "column",
          }}
        >
          <Box
            className="Navbar"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#363636",
              mb: "8px",
              border: "1px solid red",
            }}
          >
            <Box sx={{ display: "flex", gap: "8px", flexGrow: "1" }}>
              <Tooltip title="All Products" placement="top">
                <IconButton
                  onClick={handleAllActive}
                  sx={{
                    border: activeCat === "all" ? "1px solid red" : "none",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 13H12"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 17H16"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings" placement="top">
                <IconButton
                  onClick={handleSettingsActive}
                  sx={{
                    border: activeCat === "settings" ? "1px solid red" : "none",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.5698 18.5001V14.6001"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.5698 7.45V5.5"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.5702 12.65C17.0062 12.65 18.1702 11.4859 18.1702 10.05C18.1702 8.61401 17.0062 7.44995 15.5702 7.44995C14.1343 7.44995 12.9702 8.61401 12.9702 10.05C12.9702 11.4859 14.1343 12.65 15.5702 12.65Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.43018 18.5V16.55"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.43018 9.4V5.5"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.43008 16.5501C9.86602 16.5501 11.0301 15.386 11.0301 13.9501C11.0301 12.5142 9.86602 11.3501 8.43008 11.3501C6.99414 11.3501 5.83008 12.5142 5.83008 13.9501C5.83008 15.386 6.99414 16.5501 8.43008 16.5501Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </IconButton>
              </Tooltip>
              <Tooltip title="Actions" placement="top">
                <IconButton
                  onClick={handleActionsActive}
                  sx={{
                    border: activeCat === "actions" ? "1px solid red" : "none",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.2902 4.13999L17.2202 7.92997C17.2102 8.44997 17.5403 9.13999 17.9603 9.44999L20.4403 11.33C22.0303 12.53 21.7703 14 19.8703 14.6L16.6403 15.61C16.1003 15.78 15.5303 16.37 15.3903 16.92L14.6203 19.86C14.0103 22.18 12.4902 22.41 11.2302 20.37L9.47024 17.52C9.15024 17 8.39024 16.61 7.79024 16.64L4.45028 16.81C2.06028 16.93 1.38027 15.55 2.94027 13.73L4.92025 11.43C5.29025 11 5.46024 10.2 5.29024 9.65998L4.28029 6.42997C3.69029 4.52997 4.75028 3.47999 6.64028 4.09999L9.59029 5.06999C10.0903 5.22999 10.8403 5.11998 11.2603 4.80998L14.3403 2.58998C16.0003 1.38998 17.3302 2.08999 17.2902 4.13999Z"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.9103 22L18.8804 18.97"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </IconButton>
              </Tooltip>
            </Box>
            <Typography sx={{ fontSize: "18px" }}>{categoryD.name}</Typography>
          </Box>
          {activeCat === "all" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid red",
                flexGrow: "1",
                flexDirection: "column",
              }}
            >
              <Box
                className="Navbar"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#363636",
                  mb: "8px",
                  border: "1px solid red",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    flexGrow: "1",
                    justifyContent: "space-around",
                  }}
                >
                  <Tooltip title="Add Product" placement="top">
                    <Button
                      onClick={handleAddActive}
                      sx={{
                        border: activeCat === "add" ? "1px solid red" : "none",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 12H18"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 18V6"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <Typography>Add Product</Typography>
                    </Button>
                  </Tooltip>

                  <Tooltip title="Choose From Products" placement="top">
                    <Button
                      onClick={handleAllActive}
                      sx={{
                        border: activeCat === "all" ? "1px solid red" : "none",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8 13H12"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8 17H16"
                          stroke="#292D32"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <Typography>Choose from existing Products</Typography>
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
              {activeCat === "add" && (
                <Box sx={{ display: "flex", mt: "4px" }}>
                  <CreateProduct />
                  <Box
                    sx={{
                      flexGrow: "1",
                      px: "12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{ color: "#363636", mb: "20px", fontSize: "12px" }}
                    >
                      Choosen Items
                    </Typography>
                    <Setteditems />
                  </Box>
                  <ProductPreview />
                </Box>
              )}
              {activeCat === "all" && (
                <Box
                  sx={{
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid green",
                    flexGrow: "1",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      overflow: "auto",
                      border: "1px solid red",
                      flexGrow: "1",
                    }}
                  >
                    {Object.values(product).map((product) => (
                      <Product product={product} />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

MenuDash.propTypes = {};

export default MenuDash;
