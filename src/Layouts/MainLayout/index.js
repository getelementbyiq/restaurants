import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Collapse, IconButton, Toolbar, Typography } from "@mui/material";
import Footer from "../../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import SideBar from "../../Components/Header/SideBar";
import MainNavigation from "../../Components/MainNavigation";
import RightBar from "../../Components/Header/RightBar";
import { UserAuth } from "../../Auth/Auth";
import { getUserById } from "../../Redux/thunks/getUserById";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { setFetchedRestaurants } from "../../Redux/slices/restaurantsSlice";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";
import MainQuestContent from "../../Components/MainQuestContent";
import { Scrollbar } from "react-scrollbars-custom";
import { selectProductRef } from "../../Redux/slices/productRefSlice";
import SideBarLayout from "../../Components/Header/SideBarLayout";

const MainLayout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = UserAuth();
  const userId = user?.uid;
  const show = useSelector((state) => state.show);
  const localData = useSelector((state) => state.localData);
  const currentUserData = useSelector((state) => state.userById);
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
  const blob = new Blob([createRestaurantData.background]);
  const backgroundURL = show ? URL.createObjectURL(blob) : "";
  const isLocalIdPath = location.pathname.includes("/locals/");

  const clickLocal = (id) => {
    navigate(`locals/${id}`);
  };

  const [requestCount, setRequestCount] = useState(0);

  const fetchData = async () => {
    try {
      // Inkrementiere den Zähler vor dem Senden der Anfrage
      setRequestCount(requestCount + 1);
      const response = await fetch("API_ENDPOINT");
      const data = await response.json();
      // Verarbeite die Daten...
    } catch (error) {
      // Fehlerbehandlung...
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        // justifyContent: "space-between",
        // gap: "16px",
        flexDirection: "column",
      }}
    >
      <Scrollbar
        onScroll={({ scrollTop }) => setScrollPosition(scrollTop)}
        scrollTop={scrollPosition}
        behavior="smooth"
        style={{
          width: "100%",
          maxHeight: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // border: "1px solid red",
            position: "relative",
            transition: "150ms",
          }}
        >
          {!location.pathname.includes(`/${localsId.locals}`) &&
            !location.pathname.includes(`/${localsId.id}`) && (
              <MainQuestContent />
            )}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <SideBarLayout />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              flexGrow: 1,
              gap: "8px",
            }}
          >
            {location.pathname !== "/addlocation" && !isLocalIdPath && (
              <MainNavigation />
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                // border: "1px solid red",
                height: "100%",
              }}
            >
              <Outlet />
            </Box>
          </Box>
          <RightBar />
        </Box>
      </Scrollbar>

      {/* <Footer /> */}
    </Box>
  );
};

export default MainLayout;
