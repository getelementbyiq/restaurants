import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { setLocalData } from "../../Redux/functions/slices/LocalDataFromFirestore";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import CreateMenu from "../../Components/CreateMenu";
import MenuDash from "../../Components/MenuDash";
import { setMenuCategory } from "../../Redux/slices/createLocalSlice";

const Local = (props) => {
  const dispatch = useDispatch();
  // Verwende useParams, um den Restaurantnamen aus der URL zu extrahieren
  const { id } = useParams();

  // State, um die Restaurantdaten zu speichern
  const [restaurantData, setRestaurantData] = useState(null);

  // Funktion zum Abrufen aller Kategorietypen

  useEffect(() => {
    // Überprüfe, ob der Local Storage leer ist
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    console.log("from Local Itemscollection ");

    if (storedItems.length === 0) {
      // Der Local Storage ist leer, führe den einmaligen Fetch aus
      const fetchItems = async () => {
        try {
          const itemsRef = collection(db, "ItemsCollection");
          const snapshot = await getDocs(itemsRef);

          const items = [];
          snapshot.forEach((doc) => {
            items.push(doc.data().name);
          });

          // Aktualisiere den Local Storage
          localStorage.setItem("items", JSON.stringify(items));
        } catch (error) {
          console.error("Fehler beim Abrufen der Items aus Firestore", error);
        }
      };

      // Führe den einmaligen Fetch aus
      fetchItems();
    } else {
      // Der Local Storage ist nicht leer, füge einen Firestore-Listener hinzu
      const itemsRef = collection(db, "ItemsCollection");
      console.log("from Local Itemscollection ");
      const unsubscribe = onSnapshot(
        query(itemsRef),
        (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            items.push(doc.data().name);
          });

          // Aktualisiere den Local Storage
          localStorage.setItem("items", JSON.stringify(items));
        },
        (error) => {
          console.error("Fehler beim Abhören der Items-Collection", error);
        }
      );

      // Cleanup-Funktion, um den Listener zu entfernen
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const fetchAllCategories = async (id) => {
    const categoryTypes = ["food", "drinks"];

    for (const categoryType of categoryTypes) {
      await fetchCategoriesFromFirestore(id, categoryType);
    }
  };

  const fetchCategoriesFromFirestore = async (id, categoryType) => {
    try {
      const categoriesQuery = await getDocs(
        collection(db, "restaurants", id, categoryType),
        orderBy("createdAt", "asc")
      );

      console.log(
        "Unsortierte Daten:----------------------------------------------------------",
        categoriesQuery.docs.map((doc) => doc.data())
      );

      const categories = {};
      categoriesQuery.forEach((doc) => {
        categories[doc.id] = doc.data().name;
      });
      console.log(
        "Sortierte Daten:--------------------------------------------------------",
        categories
      );

      dispatch(
        setLocalData({
          menu: {
            ...{ [categoryType]: categories },
          },
        })
      );
      dispatch(
        setMenuCategory({
          categoryType,
          categoryData: categories,
        })
      );

      return categories;
    } catch (error) {
      console.error("Fehler beim Abrufen der Kategorien aus Firestore:", error);
      return {};
    }
  };

  useEffect(() => {
    // Funktion, um die Restaurantdaten aus Firebase abzurufen
    const fetchRestaurantData = async () => {
      try {
        // Erstelle eine Referenz zum Restaurant-Dokument in Firebase
        const restaurantDocRef = collection(db, "restaurants");

        // Rufe die Daten des Restaurants aus Firebase ab
        const restaurantDocSnapshot = await getDoc(doc(restaurantDocRef, id));

        // Wenn das Restaurant existiert, setze die Daten im State
        if (restaurantDocSnapshot.exists()) {
          setRestaurantData(restaurantDocSnapshot.data());
          dispatch(setLocalData(restaurantDocSnapshot.data()));
        } else {
          // Handle den Fall, dass das Restaurant nicht gefunden wurde
          console.error("Restaurant nicht gefunden");
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Restaurantdaten:", error);
      }
    };

    // Rufe die Restaurantdaten ab, wenn der Restaurantname vorhanden ist
    if (id) {
      fetchRestaurantData();
      fetchAllCategories(id);
    }
  }, [id]);

  // Wenn die Daten noch geladen werden, zeige eine Ladeanzeige an
  if (!restaurantData) {
    return <div>Loading...</div>;
  }

  // Zeige die Restaurantdaten an
  return (
    <Box
      sx={{
        height: "90vh",
        px: "28px",
        mt: "8px",
        display: "flex",
        gap: "16px",
      }}
    >
      <CreateMenu />
      <MenuDash />
    </Box>
  );
};

Local.propTypes = {};

export default Local;
