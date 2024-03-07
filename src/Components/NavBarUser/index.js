import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const NavBarUser = (props) => {
  const id = useParams();
  console.log("location ids", id);
  const restaurantId = id.locals;
  const navigate = useNavigate();
  const location = useLocation();
  const restaurantData = useSelector((state) => state.oneRestaurantData);

  console.log(
    "restaurantdata from ProductsPage",
    restaurantData?.restaurantData
  );

  const goTo = (txt) => {
    navigate(`/${restaurantId}/${txt}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {location.pathname.includes(restaurantData.restaurantId) && (
        <Avatar
          src={restaurantData?.restaurantData?.logo}
          sx={{ width: "32px", height: "32px" }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Box
          onClick={() => goTo("foods")}
          sx={{
            display: "flex",
            //   border: "1px solid red",
            alignItems: "center",
            py: "4px",
            px: "24px",
            gap: "8px",
            backgroundColor:
              restaurantData.categoryType === "food" ? "#FF975D" : "#fff",
            borderRadius: "32px",
            "&&:hover": {
              backgroundColor: "#FFE3D4",
            },
            cursor: "pointer",
          }}
        >
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.97 22H4.96997C1.96997 22 1.96997 20.65 1.96997 19V18C1.96997 17.45 2.41997 17 2.96997 17H20.97C21.52 17 21.97 17.45 21.97 18V19C21.97 20.65 21.97 22 18.97 22Z"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.72 13V17H3.27002V13C3.27002 9.16 5.98002 5.95 9.59002 5.18C10.13 5.06 10.69 5 11.27 5H12.72C13.3 5 13.87 5.06 14.41 5.18C18.02 5.96 20.72 9.16 20.72 13Z"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.5 4.5C14.5 4.74 14.47 4.96 14.41 5.18C13.87 5.06 13.3 5 12.72 5H11.27C10.69 5 10.13 5.06 9.59 5.18C9.53 4.96 9.5 4.74 9.5 4.5C9.5 3.12 10.62 2 12 2C13.38 2 14.5 3.12 14.5 4.5Z"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 11H9"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <Typography>Food</Typography>
        </Box>
        <Box
          onClick={() => goTo("drinks")}
          sx={{
            display: "flex",
            //   border: "1px solid red",
            alignItems: "center",
            px: "24px",
            gap: "8px",
            backgroundColor:
              restaurantData.categoryType === "drinks" ? "#FF975D" : "#fff",
            borderRadius: "32px",
            "&&:hover": {
              backgroundColor: "#FFE3D4",
            },
            py: "4px",
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
              d="M17.79 10.4698V17.7898C17.79 20.1198 15.9 21.9998 13.58 21.9998H6.21C3.89 21.9998 2 20.1098 2 17.7898V10.4698C2 8.13977 3.89 6.25977 6.21 6.25977H13.58C15.9 6.25977 17.79 8.14977 17.79 10.4698Z"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.5 4V2.25"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 4V2.25"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.5 4V2.25"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 13.1602C22 15.4802 20.11 17.3702 17.79 17.3702V8.9502C20.11 8.9502 22 10.8302 22 13.1602Z"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 12H17.51"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <Typography>Drinks</Typography>
        </Box>
        <Box
          onClick={() => goTo("offers")}
          sx={{
            display: "flex",
            //   border: "1px solid red",
            alignItems: "center",
            px: "24px",
            gap: "8px",
            backgroundColor: "#fff",
            borderRadius: "32px",
            "&&:hover": {
              backgroundColor: "#FFE3D4",
            },
            py: "4px",
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
              d="M3.9889 14.6604L2.46891 13.1404C1.84891 12.5204 1.84891 11.5004 2.46891 10.8804L3.9889 9.36039C4.2489 9.10039 4.4589 8.59038 4.4589 8.23038V6.08036C4.4589 5.20036 5.1789 4.48038 6.0589 4.48038H8.2089C8.5689 4.48038 9.0789 4.27041 9.3389 4.01041L10.8589 2.49039C11.4789 1.87039 12.4989 1.87039 13.1189 2.49039L14.6389 4.01041C14.8989 4.27041 15.4089 4.48038 15.7689 4.48038H17.9189C18.7989 4.48038 19.5189 5.20036 19.5189 6.08036V8.23038C19.5189 8.59038 19.7289 9.10039 19.9889 9.36039L21.5089 10.8804C22.1289 11.5004 22.1289 12.5204 21.5089 13.1404L19.9889 14.6604C19.7289 14.9204 19.5189 15.4304 19.5189 15.7904V17.9403C19.5189 18.8203 18.7989 19.5404 17.9189 19.5404H15.7689C15.4089 19.5404 14.8989 19.7504 14.6389 20.0104L13.1189 21.5304C12.4989 22.1504 11.4789 22.1504 10.8589 21.5304L9.3389 20.0104C9.0789 19.7504 8.5689 19.5404 8.2089 19.5404H6.0589C5.1789 19.5404 4.4589 18.8203 4.4589 17.9403V15.7904C4.4589 15.4204 4.2489 14.9104 3.9889 14.6604Z"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 15L15 9"
              stroke="#444444"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.4945 14.5H14.5035"
              stroke="#444444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.49451 9.5H9.50349"
              stroke="#444444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <Typography>Offers</Typography>
        </Box>
        <Box
          onClick={() => goTo("daily")}
          sx={{
            display: "flex",
            //   border: "1px solid red",
            alignItems: "center",
            px: "24px",
            gap: "8px",
            backgroundColor: "#fff",
            borderRadius: "32px",
            "&&:hover": {
              backgroundColor: "#FFE3D4",
            },
            py: "4px",
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
              d="M8 2V5"
              stroke="#444444"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 2V5"
              stroke="#444444"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
              stroke="#444444"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.75 17.5996H3.25"
              stroke="#444444"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z"
              fill="#444444"
            />
          </svg>

          <Typography>Daily</Typography>
        </Box>
      </Box>
    </Box>
  );
};

NavBarUser.propTypes = {};

export default NavBarUser;
