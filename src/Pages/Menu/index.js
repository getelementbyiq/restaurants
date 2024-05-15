import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import CreateMenu from "../../Components/CreateMenu";
import MenuPageNav from "../../Components/NavBars/Restaurant/MenuPageNav/MenuPageNav";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import ProductsRender from "../../Components/Search/Restaurant/ProductsRender";

const Menu = (props) => {
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );
  const restaurantId = restaurantsData ? restaurantsData[0].id : [];

  const restaurantOfUser = useSelector(
    (state) => state.restaurants.userRestaurants
  );

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menusQuery = query(
          collection(db, "menus"),
          where("restaurantId", "==", restaurantId)
        );
        const querySnapshot = await getDocs(menusQuery);
        const menusData = [];
        querySnapshot.forEach((doc) => {
          const menuObject = { id: doc.id, ...doc.data() };
          // Überprüfen, ob das Menü bereits im Local Storage vorhanden ist
          const menusFromLocalStorage =
            JSON.parse(localStorage.getItem("menus")) || [];
          const existingMenuIndex = menusFromLocalStorage.findIndex(
            (menu) => menu.id === menuObject.id
          );
          if (existingMenuIndex === -1) {
            // Menü noch nicht im Local Storage, also hinzufügen
            menusFromLocalStorage.push(menuObject);
          } else {
            // Menü bereits im Local Storage, aktualisieren
            menusFromLocalStorage[existingMenuIndex] = menuObject;
          }
          localStorage.setItem("menus", JSON.stringify(menusFromLocalStorage));
          menusData.push(menuObject);
        });
      } catch (error) {
        console.error("Fehler beim Abrufen der Menüs:", error);
      }
    };
    fetchMenus();
  }, [restaurantId]);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexGrow: "1",
        // border: "1px solid red",
        px: "40px",
      }}
    >
      <Grid
        item
        xs={3}
        md={3}
        sx={{
          // border: "1px solid blue",
          display: "flex",
          flexGrow: "1",
          justifyContent: "center",
          pb: "8px",
          // backgroundColor: "red",
        }}
      >
        <CreateMenu />
      </Grid>
      <Grid
        item
        xs={9}
        md={9}
        sx={{
          // border: "1px solid black",
          display: "flex",
          flexGrow: "1",
          pb: "8px",
          flexDirection: "column",
          // backgroundColor: "green",
          gap: "16px",
        }}
      >
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <MenuPageNav />
        </Box>
        <ProductsRender />
      </Grid>
    </Grid>
  );
};

Menu.propTypes = {};

export default Menu;
