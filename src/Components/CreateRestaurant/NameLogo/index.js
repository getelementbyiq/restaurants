import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  setRestaurantField,
} from "../../../Redux/slices/createLocalSlice";
import DragAndDrop from "../../BackgroundInput";
// import { setOpenFirst } from "../../../Redux/functions/slices/OpenFirst";
import { setOpenSecond } from "../../../Redux/functions/slices/OpenSecond";
import FileInput from "../../BackgroundInput";

const SetNameLogo = (props) => {
  const dispatch = useDispatch();
  // const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);

  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  const handlePrevButtonClick = () => {
    // dispatch(setOpenFirst(!openFirst)); // Um den Status umzuschalten
  };
  const handleNextButtonClick = () => {
    // dispatch(setOpenFirst(!openFirst));
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
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        width: "40%",
        justifyContent: "center",
      }}
    >
      <form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "rgba(225, 225, 225, 0.2)",
            backdropFilter: "blur(3.5px)",
            borderRadius: "32px",
            paddingX: "32px",
            py: "16px",
            flexGrow: "1",
            width: "400px",
          }}
        >
          <FileInput onDrop={handleLogoDrop} />

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
              placeholder={
                createRestaurantData?.name
                  ? createRestaurantData.name
                  : "Name of Restaurant"
              }
              sx={{ fontSize: "16px" }}
              InputLabelProps={{
                style: { color: "#444444" },
              }}
              InputProps={{
                style: {
                  borderRadius: "32px",
                  background: "#fff",
                  fontSize: "16px",
                  background: "#fff",
                  // backdropFilter: "blur(7.5px)",
                  color: "#444444",
                  paddingRight: "24px",
                },
              }}
              onChange={(e) => handleFieldChange("name", e.target.value)}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SetNameLogo;
