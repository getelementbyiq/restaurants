import React, { useEffect, useState } from "react";
import { Box, Input, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const CreateMenu = () => {
  const { id } = useParams();
  const [textFieldValue, setTextFieldValue] = useState("");
  const restaurantOfUser = useSelector(
    (state) => state.restaurants.userRestaurants
  );

  const restaurantId = restaurantOfUser[0]?.id;
  const [menus, setMenus] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
      });
      console.log("Neues Menü wurde erstellt mit ID: ", newMenuRef.id);

      const menuObject = {
        id: newMenuRef.id,
        restaurantId,
        background: null,
        name: textFieldValue.trim(),
        views: null,
        likes: null,
        productIds: [],
      };
      // Zugriff auf den Local Storage
      const menusFromLocalStorage =
        JSON.parse(localStorage.getItem("menus")) || [];
      // Hinzufügen des neuen Menüs zu den vorhandenen Menüs
      menusFromLocalStorage.push(menuObject);
      // Zurückspeichern der aktualisierten Menüs im Local Storage
      localStorage.setItem("menus", JSON.stringify(menusFromLocalStorage));
      // Hier kannst du bei Bedarf den Redux-Store aktualisieren oder andere Aktionen ausführen
      setTextFieldValue(""); // Leere das Eingabefeld nach dem Hinzufügen
    } catch (error) {
      console.error("Fehler beim Erstellen des Menüs: ", error);
    }
  };

  useEffect(() => {
    const storedMenus = JSON.parse(localStorage.getItem("menus")) || [];
    setMenus(storedMenus);
  }, []);

  const goTo = (menuId) => {
    navigate(`/menu/${menuId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "32px",
        px: "8px",
        flexDirection: "column",
        gap: "8px",
        flexGrow: "1",
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
            {/* Icon für das Hinzufügen eines Menüs */}
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
          {menus.map((menu) => (
            <Typography key={menu.id} onClick={() => goTo(menu.id)}>
              {menu.name}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateMenu;
