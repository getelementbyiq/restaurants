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
import { setOpenThird } from "../../../Redux/functions/slices/OpenThird";

const SetAddress = (props) => {
  const dispatch = useDispatch();
  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);
  const openThird = useSelector((state) => state.openThird);

  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  const handlePrevButtonClick = () => {
    dispatch(setOpenThird(!openThird));
    dispatch(setOpenSecond(!openSecond)); // Um den Status umzuschalten
  };
  const handleNextButtonClick = () => {
    dispatch(setOpenThird(!openThird));
  };

  console.log("create restaurant", createRestaurantData);

  const handleFieldChange = (field, value) => {
    const [parentField, childField] = field.split(".");
    if (
      parentField === "address" &&
      createRestaurantData.restaurantData.address
    ) {
      createRestaurantData.restaurantData.address[childField] = value;
      dispatch(
        setRestaurantField({
          field: "address",
          value: createRestaurantData.restaurantData.address,
        })
      );
    } else {
      dispatch(setRestaurantField({ field, value }));
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
            transform: "translateX(220px)",

            zIndex: 1,
          }}
        >
          <TextField
            name="street"
            fullWidth
            placeholder="Street"
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
            onChange={(e) => handleFieldChange("street", e.target.value)}
          />
          <TextField
            name="houseNumber"
            fullWidth
            placeholder="House Number"
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
            onChange={(e) => handleFieldChange("houseNumber", e.target.value)}
          />
          <TextField
            fullWidth
            placeholder="city"
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
            onChange={(e) => handleFieldChange("city", e.target.value)}
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
      </form>
    </Box>
  );
};

export default SetAddress;
