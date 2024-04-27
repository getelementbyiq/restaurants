import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/thunks/getUserById";
import MainPageOwner from "../Owner/MainPage";
import MainPageNUser from "../NUser/MainPage";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { setFetchedRestaurants } from "../../Redux/slices/restaurantsSlice";
import RestaurantPreview from "../../Components/RestaurantPreview";
import CreateRestaurantform from "../../Components/CreateRestaurant/CreateRestaurantForm";
import Art from "../../Components/Art";

const Main = (props) => {
  const dispatch = useDispatch();
  const { user } = UserAuth();

  const isCreated = useSelector((state) => state.restaurantIsCreated);
  const userId = user?.uid;
  const currentUserData = useSelector((state) => state.userById);

  const restaurantOfUser = useSelector((state) => state.restaurants.data);
  const userData = currentUserData.user;
  console.error("userId", userId);
  console.log("userData", userData);
  console.log("restaurantOfUser ----", restaurantOfUser);

  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     try {
  //       // Referenz auf die gesamte Sammlung "restaurants" erstellen
  //       const restaurantsRef = collection(db, "restaurants");

  //       // Daten der Restaurants aus Firestore abrufen
  //       const querySnapshot = await getDocs(restaurantsRef);

  //       // Array zum Speichern der Restaurantdaten erstellen
  //       const restaurants = [];

  //       // Durch die Dokumente im Query-Snapshot iterieren und Daten hinzufügen
  //       querySnapshot.forEach((doc) => {
  //         restaurants.push(doc.data());
  //       });

  //       // Restaurants im Redux-Store speichern
  //       dispatch(setFetchedRestaurants(restaurants));
  //     } catch (error) {
  //       console.error("Fehler beim Abrufen der Restaurants:", error);
  //     }
  //   };

  //   fetchRestaurants();
  // }, [dispatch]);

  // const fetchRestaurantsByUserId = async (userId) => {
  //   try {
  //     // Referenz auf die Sammlung "restaurants" erstellen
  //     const restaurantsRef = collection(db, "restaurants");

  //     // Query für Restaurants mit der angegebenen userId erstellen
  //     const querySnapshot = await getDocs(
  //       query(restaurantsRef, where("userId", "==", userId))
  //     );

  //     // Array zum Speichern der Restaurantdaten erstellen
  //     const restaurants = [];

  //     // Durch die Dokumente im Query-Snapshot iterieren und Daten hinzufügen
  //     querySnapshot.forEach((doc) => {
  //       restaurants.push(doc.data());
  //     });

  //     // Restaurants im Redux-Store speichern
  //     dispatch(setFetchedRestaurants(restaurants));
  //   } catch (error) {
  //     console.error("Fehler beim Abrufen der Restaurants:", error);
  //   }
  // };

  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid green",
        flexDirection: "column",
        height: "100%",
        py: "16px",
        gap: "16px",
      }}
    >
      <RestaurantPreview />
      <CreateRestaurantform />
      <Art />
    </Box>
  );
};

export default Main;
