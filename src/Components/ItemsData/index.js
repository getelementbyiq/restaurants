import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";
import { useDispatch, useSelector } from "react-redux";
import Add from "../../assets/icons/add.svg";
import { setOpenSecond } from "../../Redux/functions/slices/OpenSecond";
import { setItemsField } from "../../Redux/slices/ItemsList";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const ItemsData = (props) => {
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => state.createItemsList.itemsData);
  const openSecond = useSelector((state) => state.openSecond);
  const createdAt = serverTimestamp();
  const [unsubscribe, setUnsubscribe] = useState(null);

  const [itemsValue, setItemsValue] = useState({});
  const [textFieldValue, setTextFieldValue] = useState(""); // Zustand für das Textfeld

  console.log("Items Data From Firestore --------", itemsValue);
  useEffect(() => {
    const itemsRef = collection(db, "ItemsCollection");
    const q = query(itemsRef, orderBy("name"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedItems = {};
      snapshot.forEach((doc) => {
        updatedItems[doc.id] = doc.data().name;
      });
      setItemsValue(updatedItems);
    });

    return () => {
      // Unsubscribe beim Entladen der Komponente
      unsubscribe();
    };
  }, []); // Nur beim ersten Rendern abonnieren

  const handleAddItem = async () => {
    const value = textFieldValue; // Wert aus dem Zustand holen
    if (value) {
      try {
        // Hier die Daten in Firestore speichern
        const itemsRef = collection(db, "ItemsCollection");
        const docRef = await addDoc(itemsRef, { name: value }, value);

        setTextFieldValue(""); // Textfeld zurücksetzen
        console.error("Erfolgreich Hochgeladen");
      } catch (error) {
        console.error("Fehler beim Speichern in Firestore", error);
      }
    }
  };

  const handleRemoveArt = async (docId) => {
    try {
      const itemsRef = collection(db, "ItemsCollection");
      await deleteDoc(doc(itemsRef, docId));

      setItemsValue((prevArtsValue) => {
        const newArtsValue = { ...prevArtsValue };
        delete newArtsValue[docId];
        return newArtsValue;
      });

      console.error("Item erfolgreich gelöscht");
    } catch (error) {
      console.error("Fehler beim Löschen des Items aus Firestore", error);
    }
  };

  const handleSaveArtToFirestore = async () => {
    try {
      // Hier die Daten aus dem Redux-Store abrufen
      const dataToSave = itemsValue;
      const itemsRef = collection(db, "ItemsCollection");
      // Hier die Daten in Firestore speichern
      const docRef = await addDoc(itemsRef, { name: dataToSave });

      // Optional: Redux-Store zurücksetzen oder andere Aktionen ausführen
      // dispatch(setItemsField({ field: "items", value: {} }));
      console.error("Erfolgreich Hochgeladen");
    } catch (error) {
      console.error("Fehler beim Speichern in Firestore", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // If "Enter" key is pressed, simulate a click on the add button
      handleAddItem();
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", overflow: "auto" }}>
      <form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "#121212",

            backdropFilter: "blur(7.5px)",
            borderRadius: "28px 28px 28px 28px",
            px: "32px",
            py: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              color: "#fff",
            }}
          >
            <Typography sx={{}}>Add Items</Typography>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <TextField
                fullWidth
                placeholder="Add Hashtags"
                sx={{ fontSize: "16px" }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                InputProps={{
                  style: {
                    borderRadius: "32px",
                    background: "#fff",
                    fontSize: "16px",
                    background: "rgba(239, 239, 239, 0.15)",
                    backdropFilter: "blur(7.5px)",
                    color: "#fff",
                  },
                }}
                id="artField"
                value={textFieldValue} // Wert des Textfelds aus dem Zustand
                onChange={(e) => setTextFieldValue(e.target.value)} // Zustand aktualisieren
                onKeyPress={handleKeyPress}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={handleAddItem}
                  sx={{
                    background: "#5FD6DD",
                    "&:hover": { background: "#00E0ED" },
                  }}
                >
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
            {/* Rest deiner Komponente */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {Object.entries(itemsValue).map(([index, value]) => (
                <Box
                  key={index}
                  sx={{
                    py: "4px",
                    paddingLeft: "16px",
                    paddingRight: "4px",
                    borderRadius: "32px",
                    background: "#fff",
                    display: "flex",
                    color: "#000",
                    gap: "16px",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{value}</Typography>
                  <IconButton
                    onClick={() => handleRemoveArt(index)}
                    sx={{
                      background: "#5FD6DD",
                      width: "24px",
                      height: "24px",
                      "&:hover": { background: "#00E0ED" },
                    }}
                  >
                    <img
                      src={Add}
                      alt="Remove"
                      style={{
                        transition: "150ms",
                        rotate: "45deg",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  </IconButton>
                </Box>
              ))}
            </Box>
            {/* <Button
              onClick={handleSaveArtToFirestore}
              sx={{ mt: "24px", height: "56px", borderRadius: "32px" }}
            >
              Save
            </Button> */}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ItemsData;
