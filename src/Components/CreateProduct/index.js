import { Box, IconButton, Input, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductField } from "../../Redux/slices/createProductSlice";
import ItemsData from "../ItemsData";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Add from "../../assets/icons/add.svg";

const CreateProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.createProduct.productData);
  const [textFieldValue, setTextFieldValue] = useState(""); // Zustand für das Textfeld
  const itemsInputRef = useRef(null);
  console.log("product Data", product);
  const handleFieldChange = (field, value) => {
    dispatch(setProductField({ field, value }));
  };
  const productItems = product.items;
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [itemsValue, setItemsValue] = useState("");

  console.log("itemSuggestions", itemSuggestions);
  useEffect(() => {
    const fetchItemsSuggestions = async () => {
      try {
        const itemsRef = collection(db, "ItemsCollection");
        const querySnapshot = await getDocs(
          query(itemsRef, where("name", ">=", itemsValue))
        );
        const suggestions = [];
        querySnapshot.forEach((doc) => {
          suggestions.push(doc.data().name);
        });
        setItemSuggestions(suggestions);
      } catch (error) {
        console.error("Fehler beim Abrufen der Artikelvorschläge", error);
      }
    };

    if (itemsValue) {
      fetchItemsSuggestions();
    } else {
      setItemSuggestions([]); // Setze die Vorschläge zurück, wenn das Eingabefeld leer ist
    }
  }, [itemsValue]);

  const handleItemsSelect = (value) => {
    setItemsValue(value);
    const updatedItems = { ...productItems, [value]: value };
    dispatch(setProductField({ field: "items", value: updatedItems }));
    setItemSuggestions([]); // Vorschläge zurücksetzen
    setItemsValue(""); // Items-Wert zurücksetzen
    itemsInputRef.current.value = "";
  };

  const handleAddItem = async () => {
    const value = itemsValue; // Wert aus dem Zustand holen
    if (value) {
      try {
        // Überprüfen, ob das Element bereits in der Firestore-Sammlung vorhanden ist
        const itemsRef = collection(db, "ItemsCollection");
        const querySnapshot = await getDocs(
          query(itemsRef, where("lowercaseName", "==", value.toLowerCase()))
        );

        if (querySnapshot.empty) {
          // Das Element ist nicht in der Firestore-Sammlung vorhanden, daher hinzufügen
          const docRef = await addDoc(itemsRef, {
            name: value,
            lowercaseName: value.toLowerCase(),
          });

          // Redux-Store aktualisieren
          const updatedItems = Array.isArray(productItems)
            ? [...productItems, value]
            : [value];
          dispatch(setProductField({ field: "items", value: updatedItems }));

          // Zurücksetzen
          setTextFieldValue(""); // Textfeld zurücksetzen
          setItemsValue(""); // Items-Wert zurücksetzen
          setItemSuggestions([]); // Vorschläge zurücksetzen
          console.error("Erfolgreich Hochgeladen");
        } else {
          console.log(
            "Das Element ist bereits in der Firestore-Sammlung vorhanden."
          );
          // Redux-Store aktualisieren
          const updatedItems = Array.isArray(productItems)
            ? [...productItems, value]
            : [value];
          dispatch(setProductField({ field: "items", value: updatedItems }));

          // Zurücksetzen
          setTextFieldValue(""); // Textfeld zurücksetzen
          setItemsValue(""); // Items-Wert zurücksetzen
          setItemSuggestions([]); // Vorschläge zurücksetzen

          console.log("ist im redux Gespeichert");
        }
      } catch (error) {
        console.error("Fehler beim Speichern in Firestore", error);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxwidth: "100px",
        }}
      >
        <Input
          fullWidth
          sx={{ maxWidth: "250px", color: "#fff" }}
          placeholder="Name of product"
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
        <Input
          fullWidth
          sx={{ maxWidth: "250px", color: "#fff" }}
          placeholder="Price"
          onChange={(e) => handleFieldChange("price", e.target.value)}
        />
        <Input
          fullWidth
          sx={{ maxWidth: "250px", color: "#fff" }}
          multiline
          rows={4}
          placeholder="Description"
          onChange={(e) => handleFieldChange("description", e.target.value)}
        />
        <Input
          fullWidth
          sx={{ maxWidth: "250px", color: "#fff" }}
          placeholder="Background Image"
          type="file"
          onChange={(e) => handleFieldChange("background", e.target.files[0])}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            <Input
              fullWidth
              sx={{ color: "#fff" }}
              placeholder="Items"
              inputRef={itemsInputRef}
              onChange={(e) => {
                setItemsValue(e.target.value);
                setTextFieldValue("");
              }}
              list="itemSuggestions"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={handleAddItem}>
                <img
                  src={Add}
                  alt="Add"
                  style={{
                    transition: "150ms",
                  }}
                />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              overflowY: "auto",
              maxWidth: "250px",
              maxHeight: "150px",
              gap: "4px",
              mt: "8px",
            }}
          >
            {itemSuggestions.map((item, index) => (
              <Box
                sx={{
                  px: "8px",
                  py: "4px",
                  borderRadius: "32px",
                  background: "#fff",
                }}
                key={index}
                onClick={() => handleItemsSelect(item)}
                style={{ cursor: "pointer" }}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateProduct;
