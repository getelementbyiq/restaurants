import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  setRestaurantField,
} from "../../../Redux/slices/createLocalSlice";
import DragAndDrop from "../../DragAndDropLogo";
import { setOpenFirst } from "../../../Redux/functions/slices/OpenFirst";
import { setOpenSecond } from "../../../Redux/functions/slices/OpenSecond";

const SetNameLogo = (props) => {
  const dispatch = useDispatch();
  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);

  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  const handlePrevButtonClick = () => {
    dispatch(setOpenFirst(!openFirst)); // Um den Status umzuschalten
  };
  const handleNextButtonClick = () => {
    dispatch(setOpenFirst(!openFirst));
    dispatch(setOpenSecond(!openSecond)); // Um den Status umzuschalten
  };

  console.log("create restaurant", createRestaurantData);

  const handleFieldChange = (field, value) => {
    dispatch(setRestaurantField({ field, value }));
  };

  const handleLogoDrop = (files) => {
    // Hier können Sie die Logik zum Speichern der Datei im Redux-Store implementieren
    if (files.length > 0) {
      const logo = files[0];
      dispatch(setRestaurantField({ field: "logo", value: logo }));
    }
  };

  return (
    <Box>
      <form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            maxWidth: "391px",
            background: "rgba(239, 239, 239, 0.15)",
            backdropFilter: "blur(7.5px)",
            borderRadius: "4px 28px 28px 28px",
            padding: "8px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <DragAndDrop onDrop={handleLogoDrop} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "96%",
            }}
          >
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
              onChange={(e) => handleFieldChange("name", e.target.value)}
            />
            <Box sx={{ display: "flex", gap: "8px", mb: "16px" }}>
              <Button
                onClick={handlePrevButtonClick}
                sx={{
                  flexGrow: 1,
                  borderRadius: "32px",
                  height: "56px",
                  color: "#fff",
                  "&:hover": {
                    color: "#00E0ED",
                  },
                }}
              >
                prev
              </Button>
              <Button
                onClick={handleNextButtonClick}
                sx={{
                  width: "258px",
                  background: "rgba(95, 214, 221, 0.50)",
                  backdropFilter: "blur(7.5px)",
                  borderRadius: "32px",
                  height: "56px",
                  color: "#fff",
                  "&:hover": {
                    background: "#00E0ED",
                  },
                }}
              >
                next
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SetNameLogo;
