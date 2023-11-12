import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setLocalData } from "../../Redux/functions/slices/LocalDataFromFirestore";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

const Local = (props) => {
  const dispatch = useDispatch();
  // Verwende useParams, um den Restaurantnamen aus der URL zu extrahieren
  const { id } = useParams();

  // State, um die Restaurantdaten zu speichern
  const [restaurantData, setRestaurantData] = useState(null);

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
    }
  }, [id]);

  // Wenn die Daten noch geladen werden, zeige eine Ladeanzeige an
  if (!restaurantData) {
    return <div>Loading...</div>;
  }

  // Zeige die Restaurantdaten an
  return (
    <Box sx={{ height: "90vh" }}>
      <h1>{restaurantData.name}</h1>
      <p>Street: {restaurantData.street}</p>
      <p>City: {restaurantData.city}</p>
      {/* Füge hier weitere Informationen hinzu, die du anzeigen möchtest */}
    </Box>
  );
};

Local.propTypes = {};

export default Local;
