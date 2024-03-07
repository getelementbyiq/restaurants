import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, InputBase, TextField } from "@mui/material";
import { setRestaurantField } from "../../../Redux/slices/createLocalSlice";
import { useDispatch, useSelector } from "react-redux";
import FileInput from "../../BackgroundInput";
import SetBackGround from "../SetBackgroundFoto";
import FileInputLogo from "../../LogoInput";

const CreateRestaurantform = (props) => {
  const dispatch = useDispatch();
  const handleFieldChange = (field, value) => {
    dispatch(setRestaurantField({ field, value }));
  };
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  console.log("createRestaurantData", createRestaurantData);
  const handleSelectBackground = (files) => {
    // Hier können Sie die Logik zum Speichern der Datei im Redux-Store implementieren
    if (files.length > 0) {
      const background = files[0];
      console.log("background", background);
      dispatch(setRestaurantField({ field: "background", value: background }));
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Grid container sx={{ display: "flex", px: "60px" }}>
        <Grid
          item
          xs={4}
          md={4}
          sx={{
            display: "flex",
            // border: "1px solid red",
            alignItems: "center",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "80%",
            }}
          >
            <TextField
              fullWidth
              size="small"
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
              required={!createRestaurantData?.name}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "80%",
            }}
          >
            <TextField
              fullWidth
              placeholder="City"
              size="small"
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
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          sx={{
            display: "flex",
            // border: "1px solid red",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "80%",
            }}
          >
            <TextField
              name="street"
              size="small"
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "80%",
            }}
          >
            <TextField
              name="houseNumber"
              fullWidth
              size="small"
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
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          sx={{
            display: "flex",
            // border: "1px solid red",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <FileInputLogo />
          <FileInput />
        </Grid>
      </Grid>
    </Box>
  );
};

CreateRestaurantform.propTypes = {};

export default CreateRestaurantform;
