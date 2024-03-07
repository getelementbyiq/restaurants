import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAllProductsActive } from "../../Redux/functions/slices/Category/AddProducts";

const MenuDashboardNavbar = ({ categoryD }) => {
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = useState("all");
  const handleOpenNav = (txt) => {
    setOpenNav(txt);
  };
  console.log("categoryD", categoryD);

  useEffect(() => {
    dispatch(setAllProductsActive(openNav));
  }, [openNav]);
  return (
    <Box
      className="Navbar"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#363636",
        // border: "1px solid blue",
        flexGrow: "1",
      }}
    >
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Tooltip title="All Products" placement="top">
          <IconButton
            onClick={() => handleOpenNav("all")}
            sx={{
              border: openNav === "all" ? "1px solid red" : "none",
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
                d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.0599 19.3901C14.4399 19.8101 13.6599 20.1601 12.7099 20.4701L11.1299 20.9901C7.15985 22.2701 5.06985 21.2001 3.77985 17.2301L2.49985 13.2801C1.21985 9.3101 2.27985 7.2101 6.24985 5.9301L7.82985 5.4101C8.23985 5.2801 8.62985 5.1701 8.99985 5.1001C8.69985 5.7101 8.45985 6.4501 8.25985 7.3001L7.27985 11.4901C6.29985 15.6701 7.58985 17.7301 11.7599 18.7201L13.4399 19.1201C14.0199 19.2601 14.5599 19.3501 15.0599 19.3901Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.6401 8.53003L17.4901 9.76003"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6602 12.3999L14.5602 13.1399"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Products" placement="top">
          <IconButton
            onClick={() => handleOpenNav("add")}
            sx={{
              border: openNav === "add" ? "1px solid red" : "none",
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
                d="M6 12H18"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 18V6"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Tooltip>

        <Tooltip title="Settings" placement="top">
          <IconButton
            onClick={() => handleOpenNav("settings")}
            sx={{
              border: openNav === "settings" ? "1px solid red" : "none",
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
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5698 18.5001V14.6001"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5698 7.45V5.5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5702 12.65C17.0062 12.65 18.1702 11.4859 18.1702 10.05C18.1702 8.61401 17.0062 7.44995 15.5702 7.44995C14.1343 7.44995 12.9702 8.61401 12.9702 10.05C12.9702 11.4859 14.1343 12.65 15.5702 12.65Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.43018 18.5V16.55"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.43018 9.4V5.5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.43008 16.5501C9.86602 16.5501 11.0301 15.386 11.0301 13.9501C11.0301 12.5142 9.86602 11.3501 8.43008 11.3501C6.99414 11.3501 5.83008 12.5142 5.83008 13.9501C5.83008 15.386 6.99414 16.5501 8.43008 16.5501Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Tooltip>
        <Tooltip title="Actions" placement="top">
          <IconButton
            onClick={() => handleOpenNav("actions")}
            sx={{
              border: openNav === "actions" ? "1px solid red" : "none",
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
                d="M17.2902 4.13999L17.2202 7.92997C17.2102 8.44997 17.5403 9.13999 17.9603 9.44999L20.4403 11.33C22.0303 12.53 21.7703 14 19.8703 14.6L16.6403 15.61C16.1003 15.78 15.5303 16.37 15.3903 16.92L14.6203 19.86C14.0103 22.18 12.4902 22.41 11.2302 20.37L9.47024 17.52C9.15024 17 8.39024 16.61 7.79024 16.64L4.45028 16.81C2.06028 16.93 1.38027 15.55 2.94027 13.73L4.92025 11.43C5.29025 11 5.46024 10.2 5.29024 9.65998L4.28029 6.42997C3.69029 4.52997 4.75028 3.47999 6.64028 4.09999L9.59029 5.06999C10.0903 5.22999 10.8403 5.11998 11.2603 4.80998L14.3403 2.58998C16.0003 1.38998 17.3302 2.08999 17.2902 4.13999Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.9103 22L18.8804 18.97"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Tooltip title="Visuell Menu" placement="top">
          <IconButton
            sx={{
              border: openNav === "visuell" ? "1px solid red" : "none",
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
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.66992 18.9501L7.59992 15.6401C8.38992 15.1101 9.52992 15.1701 10.2399 15.7801L10.5699 16.0701C11.3499 16.7401 12.6099 16.7401 13.3899 16.0701L17.5499 12.5001C18.3299 11.8301 19.5899 11.8301 20.3699 12.5001L21.9999 13.9001"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Tooltip>
        <Tooltip title="Combined Menu" placement="top">
          <IconButton
            sx={{
              border: openNav === "Combined" ? "1px solid red" : "none",
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
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5004 17.0801H15.6504"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.97 17.0801H6.5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.4997 13.3201H11.9697"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.27 13.3201H6.5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.33008 8C9.43465 8 10.3301 7.10457 10.3301 6C10.3301 4.89543 9.43465 4 8.33008 4C7.22551 4 6.33008 4.89543 6.33008 6C6.33008 7.10457 7.22551 8 8.33008 8Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12L6.84584 9.61956C7.62235 9.2384 8.74289 9.28155 9.44077 9.72024L9.76513 9.9288C10.5318 10.4106 11.7703 10.4106 12.537 9.9288L16.626 7.36138C17.3927 6.87954 18.6311 6.87954 19.3978 7.36138L21 8.36821"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Tooltip>
        <Tooltip title="Classic Menu" placement="top">
          <IconButton
            sx={{
              border: openNav === "classic" ? "1px solid red" : "none",
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
                d="M3 4.5H21"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.25977 9.5H16.7398"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 14.5H21"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.25977 19.5H16.7398"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </Tooltip>

        <Typography sx={{ fontSize: "18px" }}>{categoryD?.name}</Typography>
      </Box>
    </Box>
  );
};

MenuDashboardNavbar.propTypes = {};

export default MenuDashboardNavbar;
