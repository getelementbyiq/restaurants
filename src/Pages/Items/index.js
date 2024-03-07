import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { setLocalData } from "../../Redux/functions/slices/LocalDataFromFirestore";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, TextField } from "@mui/material";
import CreateMenu from "../../Components/CreateMenu";
import MenuDash from "../../Components/MenuDash";
import { setMenuCategory } from "../../Redux/slices/createLocalSlice";
import ItemsData from "../../Components/ItemsData";
import { setProductField } from "../../Redux/slices/createProductSlice";
import { setSearchResult } from "../../Redux/functions/slices/OpenThird";

const AddItemsToProduct = (props) => {
  const { id } = useParams();
  const itemsInputRef = useRef(null);
  const [itemsValue, setItemsValue] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("");
  const [itemsFromFirebase, setItemsFromFirebase] = useState("");
  const dispatch = useDispatch();

  const product = useSelector((state) => state.createProduct.productData);
  const productItems = product.items;
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  const storedItemsArray = Object.values(storedItems);
  // Verwende useParams, um den Restaurantnamen aus der URL zu extrahieren
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("searchValue:", searchValue);
    console.log("storedItems:", storedItems);
    // Lokale Suche in den gespeicherten Items
    if (searchValue === "") {
      setSearchResults([]);
      console.log("aus dem Create Product");
      // Setze searchResults zurück, wenn searchValue leer ist
    } else {
      const results = storedItemsArray.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
      dispatch(setSearchResult(results));
    }
  }, [searchValue]);

  const handleItemsSelect = (value) => {
    setItemsValue(value);
    const updatedItems = { ...productItems, [value]: value };
    dispatch(setProductField({ field: "items", value: updatedItems }));
    setItemsValue(""); // Items-Wert zurücksetzen
    itemsInputRef.current.value = "";
    setSearchResults([]);
  };

  const handleAddItem = async () => {
    const value = itemsValue;
    if (value) {
      try {
        const storedItems = JSON.parse(localStorage.getItem("items")) || [];

        // Überprüfen, ob das Element bereits im Local Storage vorhanden ist
        const isItemInStorage = storedItems.some(
          (item) => item.toLowerCase() === value.toLowerCase()
        );

        if (!isItemInStorage) {
          const itemsRef = collection(db, "ItemsCollection");
          const docRef = await addDoc(itemsRef, {
            name: value,
            lowercaseName: value.toLowerCase(),
          });
          // Das Element zum Redux-Store hinzufügen
          const updatedItems = Array.isArray(productItems)
            ? [...productItems, value]
            : [value];
          dispatch(setProductField({ field: "items", value: updatedItems }));

          // Das Element zum Local Storage hinzufügen
          localStorage.setItem(
            "items",
            JSON.stringify([...storedItems, value])
          );
          setSearchResults([]); // Vorschläge zurücksetzen

          // Zurücksetzen
          setTextFieldValue("");
          setItemsValue("");
          console.error("Erfolgreich Hochgeladen");
        } else {
          console.log("Das Element ist bereits im Local Storage vorhanden.");

          // Das Element zum Redux-Store hinzufügen
          const updatedItems = Array.isArray(productItems)
            ? [...productItems, value]
            : [value];
          dispatch(setProductField({ field: "items", value: updatedItems }));

          // Zurücksetzen
          setSearchResults([]); // Vorschläge zurücksetzen

          setTextFieldValue("");
          setItemsValue("");

          console.log("ist im redux Gespeichert");
        }
      } catch (error) {
        console.error("Fehler beim Speichern in Firestore", error);
      }
    }
  };
  // Zeige die Restaurantdaten an
  return (
    <Box sx={{ display: "flex", flexGrow: "1" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex" }}>
          {/* <Input
              fullWidth
              sx={{ color: "#363636" }}
              placeholder="Items"
              inputRef={itemsInputRef}
              onChange={(e) => {
                setItemsValue(e.target.value);
                setSearchValue(e.target.value);
              }}
              list="itemSuggestions"
            /> */}
          <TextField
            name="Items"
            fullWidth
            inputRef={itemsInputRef}
            size="small"
            list="itemSuggestions"
            placeholder={"Items"}
            sx={{ fontSize: "16px" }}
            InputLabelProps={{
              style: { color: "#444444" },
            }}
            InputProps={{
              style: {
                borderRadius: "32px",
                background: "#fff",
                fontSize: "16px",
                background: "#fff",
                // backdropFilter: "blur(7.5px)",
                color: "#444444",
              },
            }}
            onChange={(e) => {
              setItemsValue(e.target.value);
              setSearchValue(e.target.value);
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={handleAddItem}>+</IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            overflow: "hidden",
            maxHeight: "130px",
            // border: "1px solid red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              overflowY: "auto",
              maxWidth: "250px",
              // flexGrow: 1,
              gap: "4px",
              mt: "8px",
              mb: "8px",
              overflow: "auto",
            }}
          >
            {searchResults &&
              searchResults.map((item, index) => (
                <Box sx={{ display: "block" }}>
                  <Box
                    sx={{
                      px: "8px",
                      py: "4px",
                      borderRadius: "32px",
                      background: "#363636",
                      color: "#fff",
                    }}
                    key={index}
                    onClick={() => handleItemsSelect(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item}
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

AddItemsToProduct.propTypes = {};

export default AddItemsToProduct;
