import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Tooltip } from "@mui/material";

const NavBarOwner = (props) => {
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  const content = useMemo(() => {
    return (
      <>
        <Tooltip title="Adresse" placement="bottom">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: "24px",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9999 13.4299C13.723 13.4299 15.1199 12.0331 15.1199 10.3099C15.1199 8.58681 13.723 7.18994 11.9999 7.18994C10.2768 7.18994 8.87988 8.58681 8.87988 10.3099C8.87988 12.0331 10.2768 13.4299 11.9999 13.4299Z"
                stroke="#444444"
                stroke-width="1.5"
              />
              <path
                d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z"
                stroke="#444444"
                stroke-width="1.5"
              />
            </svg>

            {createRestaurantData.street ||
            createRestaurantData.houseNumber ||
            createRestaurantData.city ? (
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Typography>{createRestaurantData.street}</Typography>
                <Typography>{createRestaurantData.houseNumber}</Typography>
                <Typography>{createRestaurantData.city}</Typography>
              </Box>
            ) : (
              <Typography>Adresse</Typography>
            )}
          </Box>
        </Tooltip>
      </>
    );
  }, [createRestaurantData]);

  return content;
};

export default NavBarOwner;
