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
import { setFetchedProducts } from "../../Redux/slices/fetchProducts";

const CreateMenu = (props) => {
  const { id } = useParams();
  const restaurantId = id;
  const dispatch = useDispatch();
  const restaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const selectedCategoryIIID = useSelector((state) => state.selectedCategory);
  const localData = useSelector((state) => state.localData);

  const fetchetProducts = useSelector(
    (state) => state.fetchProducts.fetchProducts
  );

  console.log(
    "Local Data data from Create Menuu owner----MMMMM",
    restaurantData
  );
  console.log(
    "Local Data data from Create Menuu owner----xxxxxxxxxxxxxxxxxx",
    fetchetProducts
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
  const [unsubscribeProductsListener, setUnsubscribeProductsListener] =
    useState(null);
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
      // fetchCategoriesAndProducts()
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

  const handleSelectCategory = async (id) => {
    dispatch(setSelectedCategory(id));

    const categoryId = id;
    const productCollectionRef = collection(
      db,
      "restaurants",
      restaurantId,
      categoryType,
      categoryId,
      "products"
    );

    try {
      const productsSnapshot = await getDocs(productCollectionRef);
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.error("hier sind die  Produkte:", productsData);

      dispatch(setFetchedProducts(productsData));
    } catch (error) {
      console.error("Fehler beim Abrufen der Produkte:", error);
    }
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
        display: "flex",
        borderRadius: "32px",
        // border: "1px solid red",
        px: "8px",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.97 22H4.96997C1.96997 22 1.96997 20.65 1.96997 19V18C1.96997 17.45 2.41997 17 2.96997 17H20.97C21.52 17 21.97 17.45 21.97 18V19C21.97 20.65 21.97 22 18.97 22Z"
              stroke={foodActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.72 13V17H3.27002V13C3.27002 9.16 5.98002 5.95 9.59002 5.18C10.13 5.06 10.69 5 11.27 5H12.72C13.3 5 13.87 5.06 14.41 5.18C18.02 5.96 20.72 9.16 20.72 13Z"
              stroke={foodActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.5 4.5C14.5 4.74 14.47 4.96 14.41 5.18C13.87 5.06 13.3 5 12.72 5H11.27C10.69 5 10.13 5.06 9.59 5.18C9.53 4.96 9.5 4.74 9.5 4.5C9.5 3.12 10.62 2 12 2C13.38 2 14.5 3.12 14.5 4.5Z"
              stroke={foodActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 11H9"
              stroke={foodActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <Box
            onClick={toggleHandle}
            sx={{
              flexGrow: 1,
              display: "flex",
              ml: "15%",
              color: foodActive ? "#444444" : "#BCBCBC",
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.79 10.4698V17.7898C17.79 20.1198 15.9 21.9998 13.58 21.9998H6.21C3.89 21.9998 2 20.1098 2 17.7898V10.4698C2 8.13977 3.89 6.25977 6.21 6.25977H13.58C15.9 6.25977 17.79 8.14977 17.79 10.4698Z"
              stroke={drinkActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.5 4V2.25"
              stroke={drinkActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 4V2.25"
              stroke={drinkActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.5 4V2.25"
              stroke={drinkActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 13.1602C22 15.4802 20.11 17.3702 17.79 17.3702V8.9502C20.11 8.9502 22 10.8302 22 13.1602Z"
              stroke={drinkActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 12H17.51"
              stroke={drinkActive ? "#444444" : "#BCBCBC"}
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              ml: "15%",
              color: drinkActive ? "#444444" : "#BCBCBC",
            }}
          >
            <Typography>Drinks</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          borderRadius: "32px",
          background: foodActive ? "#DEC749" : " #49C3DE",
          // border: "1px solid red",
          pt: "8px",
          px: "8px",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
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
            maxHeight: "65vh",
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
    </Box>
  );
};

export default CreateMenu;
