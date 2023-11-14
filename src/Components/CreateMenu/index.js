import { Box, IconButton, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Food from "../../assets/icons/food.svg";
import Drink from "../../assets/icons/drinks.svg";
import FoodNon from "../../assets/icons/food-non.svg";
import DrinkNon from "../../assets/icons/drinks-non.svg";
import Add from "../../assets/icons/add.svg";
import {
  deleteMenuCategory,
  setMenuCategory,
  setRestaurantField,
} from "../../Redux/slices/createLocalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setFoodActiveRed } from "../../Redux/functions/slices/FoodActive";
import { setDrinksActiveRed } from "../../Redux/functions/slices/DrinksActive";
import { setCategoryActive } from "../../Redux/functions/slices/CategoryActive";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { setSelectedCategory } from "../../Redux/functions/slices/SetSelectedCategory";

const CreateMenu = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const restaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const selectedCategoryIIID = useSelector((state) => state.selectedCategory);
  const localData = useSelector((state) => state.localData);

  console.log(
    "Local Data data from Create Menuu owner----MMMMM",
    restaurantData
  );
  const foodsMenu = Object.entries(restaurantData.menu.food).map(
    ([id, category]) => ({
      id,
      ...category,
    })
  );
  const drinksMenu = Object.entries(restaurantData.menu.drinks).map(
    ([id, category]) => ({
      id,
      ...category,
    })
  );
  // const drinksMenu = restaurantData.menu.drinks;
  const [categoryType, setCategoryType] = useState("food");
  console.log("category Type", categoryType);
  const [textFieldValue, setTextFieldValue] = useState(""); // Zustand für das Textfeld
  const [foodActive, setFoodActive] = useState(true);
  const [drinkActive, setDrinkActive] = useState(false);
  const [categoriesUpdated, setCategoriesUpdated] = useState(false);
  const toggleHandle = () => {
    setFoodActive(!foodActive);
    dispatch(setFoodActiveRed(foodActive));
    setDrinkActive(!drinkActive);
    dispatch(setDrinksActiveRed(drinkActive));

    if (categoryType === "food") {
      setCategoryType("drinks");
      dispatch(setCategoryActive(categoryType));
    } else {
      setCategoryType("food");
      dispatch(setCategoryActive(categoryType));
    }
  };

  const handleAddCategory = async () => {
    const value = textFieldValue.trim();

    if (value) {
      try {
        const restaurantId = id;

        // Füge die Kategorie zu Firestore hinzu
        const categoryDocRef = await addDoc(
          collection(db, "restaurants", restaurantId, categoryType),
          {
            name: value,
            createdAt: serverTimestamp(),
          }
        );

        // Aktualisiere den Redux-State mit der neuen Kategorie
        dispatch(
          setMenuCategory({
            categoryType,
            categoryData: {
              ...restaurantData.menu[categoryType],
              [categoryDocRef.id]: { name: value },
            },
          })
        );

        setTextFieldValue("");
        setCategoriesUpdated(true);
      } catch (error) {
        console.error(
          "Fehler beim Hinzufügen der Kategorie zu Firestore:",
          error
        );
      }
    }
  };
  const fetchCategoriesFromFirestore = (id) => {
    return new Promise((resolve, reject) => {
      try {
        const foodCategoriesRef = collection(db, "restaurants", id, "food");
        const drinkCategoriesRef = collection(db, "restaurants", id, "drinks");

        const unsubscribeFood = onSnapshot(
          query(foodCategoriesRef, orderBy("createdAt", "desc")),
          (snapshot) => {
            const foodCategories = {};
            snapshot.forEach((doc) => {
              foodCategories[doc.id] = {
                name: doc.data().name,
                // Weitere Felder, die du speichern möchtest
              };
            });

            dispatch(
              setMenuCategory({
                categoryType: "food",
                categoryData: foodCategories,
              })
            );
          }
        );

        const unsubscribeDrinks = onSnapshot(
          query(drinkCategoriesRef, orderBy("createdAt", "desc")),
          (snapshot) => {
            const drinkCategories = {};
            snapshot.forEach((doc) => {
              drinkCategories[doc.id] = {
                name: doc.data().name,
                // Weitere Felder, die du speichern möchtest
              };
            });

            dispatch(
              setMenuCategory({
                categoryType: "drinks",
                categoryData: drinkCategories,
              })
            );
          }
        );

        // Rückgabefunktion für das Aufheben der Abonnementen
        resolve(() => {
          unsubscribeFood();
          unsubscribeDrinks();
        });
      } catch (error) {
        console.error(
          "Fehler beim Abrufen der Kategorien aus Firestore:",
          error
        );
        reject(() => {}); // Leere Rückgabefunktion, falls ein Fehler auftritt
      }
    });
  };
  useEffect(() => {
    dispatch(setCategoryActive(categoryType));
    fetchCategoriesFromFirestore(id)
      .then((unsubscribeFunction) => {
        console.log("Abgerufene Kategorien");
        // ... Weitere Aktionen nach dem Abrufen der Kategorien
      })
      .catch((unsubscribeFunction) => {
        console.error("Fehler beim Abrufen der Kategorien");
        // ... Weitere Aktionen im Fehlerfall
      });

    // Setze categoriesUpdated wieder auf false, um zukünftige Updates zu verhindern
    setCategoriesUpdated(false);
  }, []);
  useEffect(() => {
    dispatch(setCategoryActive(categoryType));
  }, [categoryType]);

  const handleSelectCategory = (id) => {
    dispatch(setSelectedCategory(id));
  };
  const handleDeleteCategory = () => {
    const value = textFieldValue.trim();
    if (value) {
      dispatch(
        deleteMenuCategory({
          categoryType,
          categoryName: value,
        })
      );
      setTextFieldValue("");
    }
  };

  return (
    <Box
      sx={{
        borderRadius: "32px",
        maxWidth: "30%",
        background: foodActive
          ? "rgba(181, 197, 0, 0.30)"
          : " rgba(0, 185, 197, 0.30)",
        backdropFilter: "blur(7.5px)",
        height: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          padding: "4px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",

            px: "16px",
            py: "8px",
            width: "135px",
            borderRadius: "32px",
            justifyContent: "center",
            background: foodActive ? "#F5FF80" : "rgba(239, 239, 239, 0.15)",
            backdropFilter: foodActive ? "blur(7.5px)" : "none",
            cursor: "pointer",
          }}
        >
          <img src={foodActive ? Food : FoodNon} alt="" />
          <Box
            onClick={toggleHandle}
            sx={{
              flexGrow: 1,
              display: "flex",
              ml: "15%",
              color: foodActive ? "#000" : "#fff",
            }}
          >
            <Typography>Food</Typography>
          </Box>
        </Box>
        <Box
          onClick={toggleHandle}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",

            px: "16px",
            py: "8px",
            width: "135px",

            borderRadius: "32px",
            justifyContent: "center",
            background: drinkActive ? "#80F0FF" : "rgba(239, 239, 239, 0.15)",
            backdropFilter: drinkActive ? "blur(7.5px)" : "none",
            cursor: "pointer",
          }}
        >
          <img src={drinkActive ? Drink : DrinkNon} alt="" />
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              ml: "15%",
              color: drinkActive ? "black" : "#fff",
            }}
          >
            <Typography>Drinks</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          paddingLeft: "32px",
          paddingRight: "16px",
          mt: "8px",
          display: "flex",
          gap: "4px",
        }}
      >
        <Input
          fullWidth
          placeholder="Category name "
          value={textFieldValue}
          onChange={(e) => setTextFieldValue(e.target.value)}
          sx={{
            fontSize: "16px",
            color: "#fff",
            "&:hover": {
              focus: "border: 1px red ",
            },
          }}
          InputLabelProps={{
            style: { color: "#fff", height: "40px" },
          }}
          InputProps={{
            style: {
              borderRadius: "32px",
              background: "#fff",
              fontSize: "16px",
              background: "rgba(239, 239, 239, 0.2)",
              backdropFilter: "blur(7.5px)",
              color: "#fff",
            },
          }}
        />
        <IconButton onClick={handleAddCategory}>
          <img src={Add} alt="" />
        </IconButton>
      </Box>
      <Box
        sx={{
          px: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          mt: "8px",
          overflow: "auto",
          maxHeight: "60vh",
        }}
      >
        {foodActive
          ? foodsMenu.map((foodCategory) => (
              <Box
                onClick={() => handleSelectCategory(foodCategory.id)}
                key={foodCategory.id}
                sx={{
                  display: "flex",
                  border: "1px solid white",
                  py: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "32px",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                <Typography>{foodCategory.name}</Typography>
              </Box>
            ))
          : drinksMenu.map((drinkCategory) => (
              <Box
                onClick={() => handleSelectCategory(drinkCategory.id)}
                key={drinkCategory.id}
                sx={{
                  display: "flex",
                  border: "1px solid white",
                  py: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "32px",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                <Typography>{drinkCategory.name}</Typography>
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default CreateMenu;
