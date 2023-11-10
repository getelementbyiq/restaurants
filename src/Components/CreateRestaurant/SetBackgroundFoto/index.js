import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  setRestaurantField,
} from "../../../Redux/slices/createLocalSlice";
import DragAndDrop from "../../DragAndDrop";
import { setOpenSecond } from "../../../Redux/functions/slices/OpenSecond";
import { setOpenFirst } from "../../../Redux/functions/slices/OpenFirst";
import { setOpenThird } from "../../../Redux/functions/slices/OpenThird";

const SetBackGround = (props) => {
  const dispatch = useDispatch();
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);
  const openThird = useSelector((state) => state.openThird);
  const handlePrevButtonClick = () => {
    dispatch(setOpenSecond(!openSecond)); // Um den Status umzuschalten
    dispatch(setOpenFirst(!openFirst)); // Um den Status umzuschalten
  };
  const handleNextButtonClick = () => {
    dispatch(setOpenSecond(!openSecond)); // Um den Status umzuschalten
    dispatch(setOpenThird(!openThird)); // Um den Status umzuschalten
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
            transform: "translateX(150px)",
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

export default SetBackGround;
