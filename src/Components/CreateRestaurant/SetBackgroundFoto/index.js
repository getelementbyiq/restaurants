import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  setRestaurantField,
} from "../../../Redux/slices/createLocalSlice";
import DragAndDrop from "../../BackgroundInput";
import { setOpenSecond } from "../../../Redux/functions/slices/OpenSecond";
// import { setOpenFirst } from "../../../Redux/functions/slices/OpenFirst";
import FileInput from "../../BackgroundInput";

const SetBackGround = (props) => {
  const dispatch = useDispatch();
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);
  const openThird = useSelector((state) => state.openThird);
  const handlePrevButtonClick = () => {
    // dispatch(setOpenSecond(!openSecond)); // Um den Status umzuschalten
    // dispatch(setOpenFirst(!openFirst)); // Um den Status umzuschalten
  };
  const handleNextButtonClick = () => {
    dispatch(setOpenSecond(!openSecond)); // Um den Status umzuschalten
    console.log("open third from set Background -----------", openThird);
  };

  console.log("create restaurant", createRestaurantData);

  const handleLogoDrop = (files) => {
    // Hier können Sie die Logik zum Speichern der Datei im Redux-Store implementieren
    if (files.length > 0) {
      const logo = files[0];
      dispatch(setRestaurantField({ field: "background", value: logo }));
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
        </Box>
      </form>
    </Box>
  );
};

export default SetBackGround;
