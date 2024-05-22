import React, { useEffect, useState } from "react";
import { Box, Input, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { fetchMenusData } from "../../Redux/immigration/menusOfRestaurant/menusOfRestaurantSlice";
import { fetchMenusRealTimeData } from "../../Redux/immigration/menusOfRestaurant/fetchMenusRealTime";

const CreateMenu = () => {
  const { categoryState } = useParams();
  const [textFieldValue, setTextFieldValue] = useState("");
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );

  const [menus, setMenus] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [restaurantId, setRestaurantId] = useState();

  useEffect(() => {
    restaurantsData && setRestaurantId(restaurantsData[0].id);
  }, [restaurantsData]);

  // useEffect(() => {
  //   dispatch(fetchMenusRealTimeData(restaurantId));
  // }, [restaurantId, dispatch]);

  const menusPrev = useSelector((state) => state.fetchRealTimeMenus?.menusData);
  useEffect(() => {
    menusPrev && setMenus(menusPrev);
  }, [menusPrev]);

  const handleAddCategory = async () => {
    if (!textFieldValue.trim()) return;
    try {
      const newMenuRef = await addDoc(collection(db, "menus"), {
        restaurantId,
        background: null,
        name: textFieldValue.trim(),
        views: null,
        likes: null,
        productIds: [],
        categoryType: categoryState,
        discount: null,
        offerStart: null,
        offerEnd: null,
        newPrice: null,
      });
      console.log("Neues Menü wurde erstellt mit ID: ", newMenuRef.id);

      setTextFieldValue(""); // Leere das Eingabefeld nach dem Hinzufügen
    } catch (error) {
      console.error("Fehler beim Erstellen des Menüs: ", error);
    }
  };

  const goTo = (menuId) => {
    navigate(`/menu/${categoryState}/${menuId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        borderRadius: "32px",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: "16px",
          backgroundColor: "#F6F6F6",
          pt: "8px",
          px: "8px",
          flexDirection: "column",
          flexGrow: "1",
          // border: "2px solid red",
        }}
      >
        <Box
          sx={{
            paddingLeft: "32px",
            paddingRight: "16px",
            mt: "8px",
            display: "flex",
            gap: "4px",
            // border: "2px solid yellow",
          }}
        >
          <Input
            fullWidth
            placeholder="Category name"
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            sx={{
              fontSize: "16px",
              color: "#000",
            }}
            InputLabelProps={{
              style: { color: "#000", height: "40px" },
            }}
            InputProps={{
              style: {
                borderRadius: "32px",
                fontSize: "16px",
                background: "rgba(239, 239, 239, 0.2)",
                backdropFilter: "blur(7.5px)",
                color: "#000",
              },
            }}
          />
          <IconButton onClick={handleAddCategory}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 9H13.5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 13.5V4.5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Box>

        {/* Hier kannst du eine Liste der vorhandenen Menüs anzeigen, falls erforderlich */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            py: "16px",
          }}
        >
          {menus?.map(
            (menu) =>
              menu.categoryType === categoryState && (
                <Box
                  key={menu.id}
                  onClick={() => goTo(menu.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: "32px",
                    py: "8px",
                    borderRadius: "8px",
                    backgroundColor: location.pathname.includes(menu.id)
                      ? "rgba(0,0,0,0.4)"
                      : "rgba(0,0,0,0.1)",
                    "&&:hover": {
                      backgroundColor: "rgba(0,0,0,0.2)",
                    },
                    cursor: "pointer",
                  }}
                >
                  <Typography>{menu.name}</Typography>
                </Box>
              )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateMenu;
