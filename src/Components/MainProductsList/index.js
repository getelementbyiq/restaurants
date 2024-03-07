import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import GipoImg from "../../assets/img/techpark.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
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
import ProductHomePage from "../ProductHomePage";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProductRef } from "../../Redux/slices/productRefSlice";

const restaurantId = "d8TVB71rJl1AqGh3XcMO ";

const MainProductsList = ({ updateProductRef }) => {
  const dispatch = useDispatch();
  const id = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const productRef = useRef(null);

  useEffect(() => {
    dispatch(setProductRef(productRef.current));
    console.log("productRef", productRef.current);
    // Produkt-Ref im Redux-Store aktualisieren
  }, [dispatch, productRef.current]);
  // const fetchRestaurantsByCity = (city) => {
  //   try {
  //     // Referenz auf die Sammlung "restaurants" erstellen
  //     const restaurantsRef = collection(db, "restaurants");

  //     // Echtzeit-Listener für Änderungen an den Restaurants hinzufügen
  //     const unsubscribe = onSnapshot(
  //       query(restaurantsRef, where("city", "==", city)),
  //       (snapshot) => {
  //         const restaurants = [];
  //         snapshot.forEach((doc) => {
  //           // Daten des Restaurants und ID abrufen
  //           const restaurantData = doc.data();
  //           const restaurantId = doc.id;
  //           // Restaurantobjekt um die ID erweitern
  //           const restaurantWithId = { id: restaurantId, ...restaurantData };
  //           restaurants.push(restaurantWithId);
  //         });
  //         // Aktualisierte Restaurantdaten im Redux-Store speichern
  //         setRestaurantData(restaurants);
  //       }
  //     );

  //     // Unsubscribe-Funktion zurückgeben, um den Listener zu entfernen
  //     return unsubscribe;
  //   } catch (error) {
  //     console.error("Fehler beim Abrufen der Restaurants:", error);
  //     return null;
  //   }
  // };

  // const fetchMenusForRestaurants = async (restaurants) => {
  //   try {
  //     const restaurantsWithMenus = [];

  //     // Durchlaufe jedes Restaurant
  //     for (const restaurant of restaurants) {
  //       // Referenz auf die Menüs des Restaurants erstellen
  //       console.log("restaurantId", restaurant.id);
  //       const menuRef = collection(db, "restaurants", restaurant.id, "food");

  //       // Menüs des Restaurants abrufen
  //       const menuSnapshot = await getDocs(menuRef);

  //       console.log("menus", menuSnapshot.docs);

  //       // Wenn Menüs vorhanden sind, füge sie dem Restaurant hinzu
  //       if (!menuSnapshot.empty) {
  //         const menus = [];
  //         menuSnapshot.forEach((menuDoc) => {
  //           menus.push(menuDoc.data());
  //         });
  //         // Füge das Restaurant mit seinen Menüs zur Liste hinzu
  //         restaurantsWithMenus.push({ ...restaurant, menus });
  //       }
  //     }

  //     // Aktualisierte Daten zurückgeben
  //     return restaurantsWithMenus;
  //   } catch (error) {
  //     console.error(
  //       "Fehler beim Abrufen der Menüs für die Restaurants:",
  //       error
  //     );
  //     return [];
  //   }
  // };

  // const fetchMenusForRestaurant = async (restaurantId) => {
  //   try {
  //     // Referenz auf die Menüs des Restaurants erstellen
  //     const foodMenuRef = collection(db, "restaurants", restaurantId, "food");
  //     const drinksMenuRef = collection(
  //       db,
  //       "restaurants",
  //       restaurantId,
  //       "drinks"
  //     );

  //     // Menüs für Essen abrufen
  //     const foodMenuSnapshot = await getDocs(foodMenuRef);
  //     const foodMenus = [];
  //     foodMenuSnapshot.forEach((menuDoc) => {
  //       foodMenus.push(menuDoc.data());
  //     });

  //     // Menüs für Getränke abrufen
  //     const drinksMenuSnapshot = await getDocs(drinksMenuRef);
  //     const drinksMenus = [];
  //     drinksMenuSnapshot.forEach((menuDoc) => {
  //       drinksMenus.push(menuDoc.data());
  //     });

  //     // Rückgabe der Menüs für das Restaurant
  //     return { food: foodMenus, drinks: drinksMenus };
  //   } catch (error) {
  //     console.error("Fehler beim Abrufen der Menüs für das Restaurant:", error);
  //     return { food: [], drinks: [] };
  //   }
  // };

  const fetchMenusForRestaurant = async (restaurantId) => {
    try {
      // Referenz auf die Menüs des Restaurants erstellen
      const foodMenuRef = collection(db, "restaurants", restaurantId, "food");
      const drinksMenuRef = collection(
        db,
        "restaurants",
        restaurantId,
        "drinks"
      );

      // Menüs für Essen abrufen
      const foodMenuSnapshot = await getDocs(foodMenuRef);
      const foodMenus = [];
      for (const menuDoc of foodMenuSnapshot.docs) {
        const menuData = menuDoc.data();
        const menuId = menuDoc.id;
        const productsRef = collection(
          db,
          "restaurants",
          restaurantId,
          "food",
          menuId,
          "products"
        );
        const productsSnapshot = await getDocs(productsRef);
        const products = productsSnapshot.docs.map((doc) => {
          const productData = doc.data();
          // Füge die Produkt-ID zum Produktobjekt hinzu
          return { id: doc.id, ...productData };
        });
        foodMenus.push({ id: menuId, ...menuData, products });
      }

      // Menüs für Getränke abrufen
      const drinksMenuSnapshot = await getDocs(drinksMenuRef);
      const drinksMenus = [];
      for (const menuDoc of drinksMenuSnapshot.docs) {
        const menuData = menuDoc.data();
        const menuId = menuDoc.id;
        console.log("menu Id", menuId);
        const productsRef = collection(
          db,
          "restaurants",
          restaurantId,
          "drinks",
          menuId,
          "products"
        );
        const productsSnapshot = await getDoc(productsRef);
        const products = productsSnapshot.docs.map((doc) => doc.data());
        drinksMenus.push({ id: menuId, ...menuData, products });
      }

      // Rückgabe der Menüs für das Restaurant
      return { food: foodMenus, drinks: drinksMenus };
    } catch (error) {
      console.error("Fehler beim Abrufen der Menüs für das Restaurant:", error);
      return { food: [], drinks: [] };
    }
  };

  const fetchRestaurantsAndMenusByCity = async (city) => {
    try {
      // Referenz auf die Sammlung "restaurants" erstellen
      const restaurantsRef = collection(db, "restaurants");

      // Restaurants basierend auf der Stadt abrufen
      const snapshot = await getDocs(
        query(restaurantsRef, where("city", "==", city))
      );

      // Menüs für jedes Restaurant abrufen und Restaurantdaten mit Menüs speichern
      const restaurantsWithMenus = [];
      for (const doc of snapshot.docs) {
        const restaurantData = doc.data();
        const restaurantId = doc.id;
        const menus = await fetchMenusForRestaurant(restaurantId);
        const restaurantWithMenus = {
          id: restaurantId,
          ...restaurantData,
          menus,
        };
        restaurantsWithMenus.push(restaurantWithMenus);
      }

      // Rückgabe der Restaurantdaten mit Menüs
      return restaurantsWithMenus;
    } catch (error) {
      console.error("Fehler beim Abrufen der Restaurants und Menüs:", error);
      return [];
    }
  };

  // Beispielaufruf
  useEffect(() => {
    const fetchRestaurantsAndMenus = async () => {
      try {
        const restaurants = await fetchRestaurantsAndMenusByCity("villach");
        setRestaurantData(restaurants);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };

    fetchRestaurantsAndMenus();

    // Füge `restaurantId` als Abhängigkeit hinzu, um sicherzustellen, dass die Abfrage jedes Mal aktualisiert wird, wenn sich `restaurantId` ändert
  }, []);
  // `restaurantId` als Abhängigkeit hinzu, um sicherzustellen, dass die Abfrage jedes Mal aktualisiert wird, wenn sich `restaurantId` ändert

  console.log("restaurantData----", restaurantData);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        // border: "2px solid red",
        borderRadius: "32px",
        overflow: "hidden",
        backgroundColor: "#FAFAFA",
        px: "64px",
      }}
    >
      {restaurantData?.map((restaurant) =>
        restaurant.menus.food.map((menu) =>
          menu.products.map((product, index) => (
            <Grid
              item
              xs={3}
              md={3}
              lg={3}
              key={index} // moved key to the Grid component
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                // border: "1px solid blue",
                px: "4px",
                py: "4px",
              }}
            >
              <ProductHomePage product={product} />
            </Grid>
          ))
        )
      )}
    </Grid>
  );
};

MainProductsList.propTypes = {};

export default MainProductsList;
