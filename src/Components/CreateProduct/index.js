import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEventsDate,
  setOfferEnd,
  setOfferStart,
  setProductField,
} from "../../Redux/slices/createProductSlice";
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
import { timeToNumericFormat } from "../AAATimeToNum/TimeToNum";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function valuetext(value) {
  return `${value}°C`;
}

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

  const [selectedDate, setSelectedDate] = React.useState(dayjs());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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

  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  console.log("valueage", from);

  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
  };
  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };

  useEffect(() => {
    dispatch(setOfferStart(timeToNumericFormat(from)));
    dispatch(setOfferEnd(timeToNumericFormat(to)));
    dispatch(setEventsDate(selectedDate.toDate()));
  }, [from, to, dispatch, selectedDate]);

  const [nav, setNav] = useState(false);
  const [prodTag, setProdTag] = useState("food");
  const nextBtn = () => {
    setNav((open) => !open);
  };

  const chooseTag = (txt) => {
    setProdTag(txt);
  };

  console.log("prodTag", prodTag);
  useEffect(() => {
    dispatch(setProductField({ field: "tag", value: prodTag }));
  }, [prodTag, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // border: "1px solid blue",
        flexGrow: "1",
        borderRadius: "16px",
        p: "8px",
        background: "#FAFAFA",
        maxHeight: "75vh",
        overflow: "auto",
        scrollbarWidth: "none", // Macht den Scrollbalken schmaler in Firefox
        "&::-webkit-scrollbar": {
          //   width: "2px", // Macht den Scrollbalken schmaler in Webkit-Browsern
          display: "none", // Für Webkit-Browser (Chrome, Safari, Edge)
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: "1",
          flexDirection: "column",
          gap: "16px",
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
          rows={3}
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
        <Box sx={{ display: "flex", flexGrow: "1" }}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            // border: "1px solid blue",
            gap: "8px",
          }}
        >
          {prodTag === "event" && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "MobileDatePicker",
                  "DesktopDatePicker",
                  "StaticDatePicker",
                ]}
              >
                <DemoItem label="Desktop variant">
                  <DesktopDatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </DemoItem>
                {/* Hier können weitere DemoItems für andere DatePicker-Typen hinzugefügt werden */}
              </DemoContainer>
            </LocalizationProvider>
          )}
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              my: "16px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Von</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={from}
                label="Von"
                onChange={handleChangeFrom}
              >
                <MenuItem value={"01:00"}>01:00</MenuItem>
                <MenuItem value={"02:00"}>02:00</MenuItem>
                <MenuItem value={"03:00"}>03:00</MenuItem>
                <MenuItem value={"04:00"}>04:00</MenuItem>
                <MenuItem value={"05:00"}>05:00</MenuItem>
                <MenuItem value={"06:00"}>06:00</MenuItem>
                <MenuItem value={"07:00"}>07:00</MenuItem>
                <MenuItem value={"08:00"}>08:00</MenuItem>
                <MenuItem value={"09:00"}>09:00</MenuItem>
                <MenuItem value={"10:00"}>10:00</MenuItem>
                <MenuItem value={"11:00"}>11:00</MenuItem>
                <MenuItem value={"12:00"}>12:00</MenuItem>
                <MenuItem value={"13:00"}>13:00</MenuItem>
                <MenuItem value={"14:00"}>14:00</MenuItem>
                <MenuItem value={"15:00"}>15:00</MenuItem>
                <MenuItem value={"16:00"}>16:00</MenuItem>
                <MenuItem value={"17:00"}>17:00</MenuItem>
                <MenuItem value={"18:00"}>18:00</MenuItem>
                <MenuItem value={"19:00"}>19:00</MenuItem>
                <MenuItem value={"20:00"}>20:00</MenuItem>
                <MenuItem value={"21:00"}>21:00</MenuItem>
                <MenuItem value={"22:00"}>22:00</MenuItem>
                <MenuItem value={"23:00"}>23:00</MenuItem>
                <MenuItem value={"24:00"}>24:00</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Bis</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={to}
                label="Bis"
                onChange={handleChangeTo}
              >
                <MenuItem value={"01:00"}>01:00</MenuItem>
                <MenuItem value={"02:00"}>02:00</MenuItem>
                <MenuItem value={"03:00"}>03:00</MenuItem>
                <MenuItem value={"04:00"}>04:00</MenuItem>
                <MenuItem value={"05:00"}>05:00</MenuItem>
                <MenuItem value={"06:00"}>06:00</MenuItem>
                <MenuItem value={"07:00"}>07:00</MenuItem>
                <MenuItem value={"08:00"}>08:00</MenuItem>
                <MenuItem value={"09:00"}>09:00</MenuItem>
                <MenuItem value={"10:00"}>10:00</MenuItem>
                <MenuItem value={"11:00"}>11:00</MenuItem>
                <MenuItem value={"12:00"}>12:00</MenuItem>
                <MenuItem value={"13:00"}>13:00</MenuItem>
                <MenuItem value={"14:00"}>14:00</MenuItem>
                <MenuItem value={"15:00"}>15:00</MenuItem>
                <MenuItem value={"16:00"}>16:00</MenuItem>
                <MenuItem value={"17:00"}>17:00</MenuItem>
                <MenuItem value={"18:00"}>18:00</MenuItem>
                <MenuItem value={"19:00"}>19:00</MenuItem>
                <MenuItem value={"20:00"}>20:00</MenuItem>
                <MenuItem value={"21:00"}>21:00</MenuItem>
                <MenuItem value={"22:00"}>22:00</MenuItem>
                <MenuItem value={"23:00"}>23:00</MenuItem>
                <MenuItem value={"24:00"}>24:00</MenuItem>
              </Select>
            </FormControl>
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
                maxHeight: "45vh",
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
          <Box sx={{ display: "flex", flexGrow: "1" }}></Box>

          <Button
            onClick={nextBtn}
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              py: "16px",
              borderRadius: "32px",
              backgroundColor: "#F4F4F4",
              color: "rgba(0,0,0,0.4)",
              mb: "16px",
              "&&:hover": {
                backgroundColor: "#000",
                color: "#EBFF00",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontFamily: "Knewave, system-ui",
                fontWeight: "400",
                fontStyle: "normal",
                lineHeight: "90%",
              }}
            >
              upload
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateProduct;
