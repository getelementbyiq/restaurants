import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import GipoImg from "../../assets/img/techpark.jpg";
import { Pagination, Navigation } from "swiper/modules";
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
import { Swiper, SwiperSlide } from "swiper/react";
import ProductMainQuest from "../ProductMainQuest";

const restaurantId = "d8TVB71rJl1AqGh3XcMO ";

const MainQuestContent = () => {
  const [restaurantData, setRestaurantData] = useState(null);

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

  return (
    <Grid
      container
      sx={{
        display: "flex",
        // border: "2px solid blue",
        // borderRadius: "32px",
        overflow: "hidden",
        backgroundColor: "#936FF9",
        px: "32px",
        py: "16px",
      }}
    >
      <Grid
        item
        xs={4}
        md={4}
        sx={{
          display: "flex",
          // border: "1px solid red",
          width: "100%",
          flexDirection: "column",
          position: "relative",
          px: "32px",
          py: "16px",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "16px" }}>
            <svg
              width="35"
              height="52"
              viewBox="0 0 35 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.17949 31.7143L33 2M2 46.9524L33 13.4286M10.7436 50L19.4872 40.8571"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
            <Typography
              sx={{
                fontFamily: "Microsoft Uighur",
                fontSize: "90px",
                fontWeight: "800",
                lineHeight: "80%",
                color: "#fff",
              }}
            >
              Gipo
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "16px", pl: "80px" }}>
            <Typography
              sx={{
                fontFamily: "Dancing Script, cursive",
                fontSize: "32px",
                fontWeight: "200",
                lineHeight: "80%",
                color: "#fff",
              }}
            >
              find your taste
            </Typography>
          </Box>
        </Box>
        {/* <Box sx={{ display: "flex", pl: "80px" }}>
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontSize: "16px",
              fontWeight: "400",
              mt: "32px",
              color: "#fff",
            }}
          >
            The future of gastronomy guide’s
          </Typography>
        </Box> */}
      </Grid>
      <Grid
        item
        xs={8}
        md={8}
        sx={{
          display: "flex",
          flexGrow: "1",
          overflow: "hidden",
          // border: "1px solid red",
          px: "32px",
          py: "16px",
        }}
      >
        <Swiper
          slidesPerView={3}
          spaceBetween={8}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {restaurantData?.map((restaurant) => (
            <Box key={restaurant.id}>
              {restaurant.menus.food.map((menu) => (
                <Box
                  key={menu.id}
                  sx={{
                    display: "flex",
                    flexGrow: "1",
                  }}
                >
                  {menu.products.map((product, index) => (
                    <SwiperSlide key={index}>
                      {console.log(product)}
                      <ProductMainQuest key={product.id} product={product} />
                    </SwiperSlide>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

MainQuestContent.propTypes = {};

export default MainQuestContent;
