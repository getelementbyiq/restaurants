import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProductField } from "../../Redux/slices/createProductSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const ChooseItems = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.createProduct.productData);

  const [itemsValue, setItemsValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  const itemsInputRef = useRef(null);
  const productItems = product.items;

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

          setItemsValue("");

          console.log("ist im redux Gespeichert");
        }
      } catch (error) {
        console.error("Fehler beim Speichern in Firestore", error);
      }
    }
  };

  useEffect(() => {
    console.log("searchValue:", searchValue);
    console.log("storedItems:", storedItems);
    // Lokale Suche in den gespeicherten Items
    if (searchValue === "") {
      setSearchResults([]);
      console.log("aus dem Create Product");
      // Setze searchResults zurück, wenn searchValue leer ist
    } else {
      const results = storedItems.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchValue]);

  return (
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
  );
};

ChooseItems.propTypes = {};

export default ChooseItems;
