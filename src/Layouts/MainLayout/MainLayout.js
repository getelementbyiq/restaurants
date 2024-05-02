import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Collapse, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

import { UserAuth } from "../../Auth/Auth";
import { getUserById } from "../../Redux/thunks/getUserById";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { setFetchedRestaurants } from "../../Redux/slices/restaurantsSlice";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";

import RestaurantHeaderFromOwner from "../../Pages/Locals/RestaurantHeaderFromOwner";
import RestaurantBannerMain from "../../Components/Banners/RestaurantBannerMain/RestaurantBannerMain";
import BannerDefinder from "../../Components/Banners/BannerDefinder/BannerDefinder";

const MainLayout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = UserAuth();
  const userId = user?.uid;
  const show = useSelector((state) => state.show);
  const localData = useSelector((state) => state.localData);
  const currentUserData = useSelector((state) => state.userById);
  const restaurantData = useSelector((state) => state.oneRestaurantData);
  const userData = currentUserData?.user;
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log("scrollPosition", scrollPosition);
  const localsId = useParams();
  console.log("localsID", localsId);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(getUserById(userId));
  //   }
  // }, [dispatch, userId]);

  // const fetchRestaurantsByUserId = (userId) => {
  //   try {
  //     // Referenz auf die Sammlung "restaurants" erstellen
  //     const restaurantsRef = collection(db, "restaurants");

  //     // Echtzeit-Listener für Änderungen an den Restaurants hinzufügen
  //     const unsubscribe = onSnapshot(
  //       query(restaurantsRef, where("userId", "==", userId)),
  //       (snapshot) => {
  //         const restaurants = [];
  //         snapshot.forEach((doc) => {
  //           restaurants.push(doc.data());
  //         });
  //         // Aktualisierte Restaurantdaten im Redux-Store speichern
  //         dispatch(setFetchedRestaurants(restaurants));
  //       }
  //     );

  //     // Unsubscribe-Funktion zurückgeben, um den Listener zu entfernen
  //     return unsubscribe;
  //   } catch (error) {
  //     console.error("Fehler beim Abrufen der Restaurants:", error);
  //     return null;
  //   }
  // };

  const handleScroll = ({ scrollTop, scrollHeight, clientHeight }) => {
    // Prüfe, ob der Benutzer am unteren Ende der Seite ist und lade mehr Produkte
    if (scrollTop + clientHeight === scrollHeight) {
    }
    // Verfolge die aktuelle Scrollposition
    setScrollPosition(scrollTop);
  };

  const fetchRestaurantsByUserId = (userId) => {
    try {
      // Referenz auf die Sammlung "restaurants" erstellen
      const restaurantsRef = collection(db, "restaurants");

      // Echtzeit-Listener für Änderungen an den Restaurants hinzufügen
      const unsubscribe = onSnapshot(
        query(restaurantsRef, where("userId", "==", userId)),
        (snapshot) => {
          const restaurants = [];
          snapshot.forEach((doc) => {
            // Daten des Restaurants und ID abrufen
            const restaurantData = doc.data();
            const restaurantId = doc.id;
            // Restaurantobjekt um die ID erweitern
            const restaurantWithId = { id: restaurantId, ...restaurantData };
            restaurants.push(restaurantWithId);
          });
          // Aktualisierte Restaurantdaten im Redux-Store speichern
          dispatch(setFetchedRestaurants(restaurants));
        }
      );

      // Unsubscribe-Funktion zurückgeben, um den Listener zu entfernen
      return unsubscribe;
    } catch (error) {
      console.error("Fehler beim Abrufen der Restaurants:", error);
      return null;
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
      dispatch(
        setRestaurantField({
          field: "userId",
          value: userId,
        })
      );
      fetchRestaurantsByUserId(userId);
    }
  }, [dispatch, userId]);

  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const restaurantOfUser = useSelector((state) => state.restaurants.data);
  const toRenderRestaurant = restaurantOfUser[0];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        gap: "16px",
        flexDirection: "column",
        // justifyContent: "space-between",
        // backgroundImage: `url(${restaurantData.restaurantData.background})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      <RestaurantHeaderFromOwner />
      <BannerDefinder BG={toRenderRestaurant?.background} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid red",
          flexGrow: 1,
          gap: "8px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
