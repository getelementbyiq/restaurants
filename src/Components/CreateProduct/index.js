import {
  Box,
  Button,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductField } from "../../Redux/slices/createProductSlice";
import ItemsData from "../ItemsData";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import Add from "../../assets/icons/add-black.svg";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useParams } from "react-router-dom";
import { setFetchedProducts } from "../../Redux/slices/fetchProducts";

const CreateProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.createProduct.productData);
  const [textFieldValue, setTextFieldValue] = useState(""); // Zustand für das Textfeld
  const itemsInputRef = useRef(null);
  console.log("product Data", product);
  const handleFieldChange = (field, value) => {
    dispatch(setProductField({ field, value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      // Wenn eine Datei ausgewählt wurde
      dispatch(setProductField({ field: "background", value: file }));
    }
  };
  const existingProducts = useSelector(
    (state) => state.fetchProducts.fetchProducts
  );

  const productItems = product.items;
  const categoryTypeData = useSelector((state) => state.categoryActive);

  const categoryType = categoryTypeData.categoryActive;

  const selectedCategoryId = useSelector((state) => state.selectedCategory);
  const { id } = useParams();
  const restaurantId = id;

  console.error("categoryType", categoryType);
  console.error("selectedCategoryId", selectedCategoryId);
  console.error("restaurantId from Create product", restaurantId);
  const [itemSetOn, setItemSetOn] = useState(false);
  const [itemsValue, setItemsValue] = useState("");
  const [itemsFromFirebase, setItemsFromFirebase] = useState("");

  console.log("itemsValue", itemsFromFirebase);

  useEffect(() => {
    const itemsRef = collection(db, "ItemsCollection");
    const q = query(itemsRef, orderBy("name"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedItems = {};
      snapshot.forEach((doc) => {
        updatedItems[doc.id] = doc.data().name;
      });
      setItemsFromFirebase(updatedItems);
      localStorage.setItem("items", JSON.stringify(updatedItems));
    });

    return () => {
      // Unsubscribe beim Entladen der Komponente
      unsubscribe();
    };
  }, []);

  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  const storedItemsArray = Object.values(storedItems);

  console.log("storedItems", storedItems);

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
    }
  }, [searchValue]);

  console.log("Restaurant Id aus dem Create Product", restaurantId);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleItemsSelect = (value) => {
    setItemsValue(value);
    const updatedItems = { ...productItems, [value]: value };
    dispatch(setProductField({ field: "items", value: updatedItems }));
    setItemSetOn(true);
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

  const handleUploadProduct = async () => {
    const backgroundBlob = new Blob([product.background]);
    const storage = getStorage();
    const imagesRef = ref(storage, "products");

    const {
      name,
      price,
      description,
      comments,
      likes,
      background,
      createdAt,
      restaurantsId,
      items,
    } = product;

    const backgroundRef = ref(imagesRef, `${name}_background.jpg`);

    try {
      await uploadBytes(backgroundRef, backgroundBlob);
      const backgroundUrl = await getDownloadURL(backgroundRef);
      const productCollectionRef = collection(
        db,
        "restaurants",
        restaurantId,
        categoryType,
        selectedCategoryId,
        "products"
      );

      await addDoc(productCollectionRef, {
        name,
        price,
        description,
        comments,
        likes,
        background: backgroundUrl,
        createdAt,
        restaurantId,
        categoryType,
        categoryId: selectedCategoryId,
        items,
        // Weitere Produktinformationen hier hinzufügen...
      });

      const updatedProducts = [
        ...existingProducts,
        {
          name,
          price,
          description,
          comments,
          likes,
          background: backgroundUrl,
          createdAt,
          restaurantId,
          categoryType,
          categoryId: selectedCategoryId,
          items,
          // Weitere Produktinformationen hier hinzufügen...
        },
      ];

      dispatch(setFetchedProducts(updatedProducts));
      console.log("Produkt erfolgreich zu Firestore hinzugefügt.");
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Produkts zu Firestore:", error);
    }
  };

  const fileName = selectedFile?.name;
  const firstThreeChars = fileName?.substring(0, 3); // Die ersten 3 Zeichen des Dateinamens
  const lastFourChars = fileName?.slice(-4);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // border: "1px solid blue",
        flexGrow: "1",
        borderRadius: "32px",
        p: "8px",
        background: "#FAFAFA",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          // border: "1px solid red",
          gap: "8px",
        }}
      >
        <TextField
          name="name"
          fullWidth
          size="small"
          placeholder={product.name ? `${product.name}` : "Name of product"}
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
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
        <TextField
          name="price"
          fullWidth
          size="small"
          placeholder={product.price ? `${product.price}` : "Price"}
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
          onChange={(e) => handleFieldChange("price", e.target.value)}
        />
        <TextField
          name="description"
          fullWidth
          multiline
          rows={4}
          size="small"
          placeholder={
            product.description ? `${product.description}` : "Description"
          }
          sx={{ fontSize: "16px" }}
          InputLabelProps={{
            style: { color: "#444444" },
          }}
          InputProps={{
            style: {
              borderRadius: "16px",
              background: "#fff",
              fontSize: "16px",
              background: "#fff",
              // backdropFilter: "blur(7.5px)",
              color: "#444444",
            },
          }}
          onChange={(e) => handleFieldChange("description", e.target.value)}
        />

        <Box
          sx={{
            display: "flex",
            width: "100%",
            border: "1px solid rgba(0,0,0,0.2)",
            height: "40px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "40px",
          }}
        >
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            onChange={handleFileSelect}
            style={{ display: "none", cursor: "pointer" }}
            id="productBackground"
          />
          <label htmlFor="productBackground">
            {selectedFile ? (
              <p>
                {firstThreeChars}...{lastFourChars}
              </p>
            ) : (
              <p style={{ color: "rgba(0,0,0,0.3)" }}>Select your Background</p>
            )}
          </label>
        </Box>

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
              flexGrow: "1",
              overflow: "hidden",
              maxHeight: "120px",
              borderRadius: "16px",
              // border: "1px solid red",
              mt: "4px",
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
    </Box>
  );
};

export default CreateProduct;
