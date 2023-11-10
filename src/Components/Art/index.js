import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";
import { useDispatch, useSelector } from "react-redux";
import Add from "../../assets/icons/add.svg";

const Art = (props) => {
  const dispatch = useDispatch();
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  const [artsValue, setArtsValue] = useState({});
  const [textFieldValue, setTextFieldValue] = useState(""); // Zustand für das Textfeld

  console.log("Arts --------", artsValue);

  const handleAddArt = () => {
    const value = textFieldValue; // Wert aus dem Zustand holen
    if (value) {
      setArtsValue({ ...artsValue, [value]: value });
      setTextFieldValue(""); // Textfeld zurücksetzen
    }
  };

  const handleRemoveArt = (index) => {
    setArtsValue((prevArtsValue) => {
      const newArtsValue = { ...prevArtsValue };
      delete newArtsValue[Object.keys(newArtsValue)[index]];
      return newArtsValue;
    });
  };

  const handleSaveArtToRedux = () => {
    // Hier wird die Aktion zum Hinzufügen von artsValue in den Redux-State aufgerufen
    dispatch(setRestaurantField({ field: "art", value: artsValue }));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "860px",
            alignItems: "center",
            flexDirection: "column",
            background: "rgba(239, 239, 239, 0.15)",
            backdropFilter: "blur(7.5px)",
            borderRadius: "28px 28px 28px 28px",
            padding: "8px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              mx: "244px",
              my: "32px",
              color: "#fff",
            }}
          >
            <Typography>
              Add characteristics to {createRestaurantData.name}
            </Typography>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <TextField
                fullWidth
                placeholder="Name of Restaurant"
                sx={{ fontSize: "16px" }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                InputProps={{
                  style: {
                    borderRadius: "32px",
                    background: "#fff",
                    fontSize: "16px",
                    background: "rgba(239, 239, 239, 0.15)",
                    backdropFilter: "blur(7.5px)",
                    color: "#fff",
                  },
                }}
                id="artField"
                value={textFieldValue} // Wert des Textfelds aus dem Zustand
                onChange={(e) => setTextFieldValue(e.target.value)} // Zustand aktualisieren
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={handleAddArt}
                  sx={{
                    background: "#5FD6DD",
                    "&:hover": { background: "#00E0ED" },
                  }}
                >
                  <img
                    src={Add}
                    alt="Add"
                    style={{
                      transition: "150ms",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
            {/* Rest deiner Komponente */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {Object.entries(artsValue).map(([key, value], index) => (
                <Box
                  key={index}
                  sx={{
                    py: "4px",
                    paddingLeft: "16px",
                    paddingRight: "4px",
                    borderRadius: "32px",
                    background: "#000",
                    display: "flex",
                    gap: "16px",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{value}</Typography>
                  <IconButton
                    onClick={() => handleRemoveArt(index)}
                    sx={{
                      background: "#5FD6DD",
                      width: "24px",
                      height: "24px",
                      "&:hover": { background: "#00E0ED" },
                    }}
                  >
                    <img
                      src={Add}
                      alt="Remove"
                      style={{
                        transition: "150ms",
                        rotate: "45deg",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Button onClick={handleSaveArtToRedux}>Save</Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Art;
