import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  setRestaurantField,
} from "../../../Redux/slices/createLocalSlice";
import DragAndDrop from "../../BackgroundInput";
import { setOpenFirst } from "../../../Redux/functions/slices/OpenFirst";
import { setOpenSecond } from "../../../Redux/functions/slices/OpenSecond";

const SetAddress = (props) => {
  const dispatch = useDispatch();
  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);

  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  const handlePrevButtonClick = () => {
    dispatch(setOpenSecond(!openSecond)); // Um den Status umzuschalten
  };
  const handleNextButtonClick = () => {};

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
            gap: "8px",
          }}
        >
          <TextField
            name="street"
            fullWidth
            placeholder="Street"
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
              style: { color: "#444444" },
            }}
            InputProps={{
              style: {
                borderRadius: "32px",
                background: "#fff",
                fontSize: "16px",
                background: "#fff",
                // background: "rgba(239, 239, 239, 0.15)",
                backdropFilter: "blur(7.5px)",
                color: "#444444",
              },
            }}
            onChange={(e) => handleFieldChange("houseNumber", e.target.value)}
          />
          <TextField
            fullWidth
            placeholder="City"
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
                // background: "rgba(239, 239, 239, 0.15)",
                // backdropFilter: "blur(7.5px)",
                color: "#444444",
              },
            }}
            onChange={(e) => handleFieldChange("city", e.target.value)}
          />
        </Box>
      </form>
    </Box>
  );
};

export default SetAddress;
