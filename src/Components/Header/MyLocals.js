import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Collapse, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const MyLocals = (props) => {
  const id = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantOfUser = useSelector((state) => state.restaurants.data);
  const [isOpen, setIsopen] = useState("");
  const [isLocal, setIsLocal] = useState("");
  const handleClick = (txt) => {
    if (isOpen === txt) {
      setIsopen("");
    } else {
      setIsopen(txt);
    }
  };
  const handleClickLocal = (id) => {
    if (isLocal === id) {
      setIsLocal("");
    } else {
      setIsLocal(id);
    }
    navigate(`locals/${id}`);
  };
  const goTo = (txt) => {
    navigate(`locals/${id.id}/${txt}`);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        onClick={() => handleClick("mylocals")}
        sx={{
          display: "flex",
          backgroundColor: "rgba(225,225,225,0.08)",
          borderRadius: "8px",
          justifyContent: "space-between",
          px: "8px",
          py: "8px",
          alignItems: "center",
          cursor: "pointer",
          "&&:hover": {
            backgroundColor: "rgba(225,225,225,0.2)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.00977 11.2197V15.7097C3.00977 20.1997 4.80977 21.9997 9.29977 21.9997H14.6898C19.1798 21.9997 20.9798 20.1997 20.9798 15.7097V11.2197"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 12C13.83 12 15.18 10.51 15 8.68L14.34 2H9.66999L8.99999 8.68C8.81999 10.51 10.17 12 12 12Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.3098 12C20.3298 12 21.8098 10.36 21.6098 8.35L21.3298 5.6C20.9698 3 19.9698 2 17.3498 2H14.2998L14.9998 9.01C15.1698 10.66 16.6598 12 18.3098 12Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.63988 12C7.28988 12 8.77988 10.66 8.93988 9.01L9.15988 6.8L9.63988 2H6.58988C3.96988 2 2.96988 3 2.60988 5.6L2.33988 8.35C2.13988 10.36 3.61988 12 5.63988 12Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 17C10.33 17 9.5 17.83 9.5 19.5V22H14.5V19.5C14.5 17.83 13.67 17 12 17Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Typography
            sx={{
              fontFamily: "Noto Sans",
              fontWeight: "400",
              fontSize: "12px",
              color: "#fff",
            }}
          >
            My Locals
          </Typography>
        </Box>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transition: "150ms",
            transform:
              isOpen === "mylocals" ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path
            d="M2.71978 5.96658L7.06645 10.3132C7.57979 10.8266 8.41978 10.8266 8.93312 10.3132L13.2798 5.96658"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Box>
      {isOpen === "mylocals" && (
        <Box
          sx={{
            display: "flex",
            px: "8px",
            py: "16px",
            backgroundColor: "rgba(0,0,0,0.2)",
            justifyContent: "flex-end",
            borderRadius: "0px 0px 8px 8px",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {restaurantOfUser &&
            restaurantOfUser.map((restaurant) => (
              <>
                <Box
                  key={restaurant.id}
                  onClick={() => handleClickLocal(restaurant.id)}
                  sx={{
                    display: "flex",
                    backgroundColor: "rgba(225,225,225,0.08)",
                    borderRadius: "8px",
                    justifyContent: "space-between",
                    px: "8px",
                    py: "8px",
                    alignItems: "center",
                    cursor: "pointer",
                    "&&:hover": {
                      backgroundColor: "rgba(225,225,225,0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={restaurant.logo}
                      sx={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Noto Sans",
                        fontWeight: "400",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      {restaurant.name}
                    </Typography>
                  </Box>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transition: "150ms",
                      transform:
                        isLocal === "localname"
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <path
                      d="M2.71978 5.96658L7.06645 10.3132C7.57979 10.8266 8.41978 10.8266 8.93312 10.3132L13.2798 5.96658"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Box>
                {id.id === restaurant.id && (
                  <>
                    <Box
                      onClick={() => handleClickLocal("localname")}
                      sx={{
                        display: "flex",
                        backgroundColor: "rgba(225,225,225,0.08)",
                        borderRadius: "8px",
                        gap: "20px",
                        px: "8px",
                        py: "8px",
                        alignItems: "center",
                        cursor: "pointer",
                        "&&:hover": {
                          backgroundColor: "rgba(225,225,225,0.2)",
                        },
                        ml: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.01 11.2197V15.7097C21.01 20.1997 19.22 21.9998 14.72 21.9998H9.33002C8.75002 21.9998 8.21998 21.9698 7.72998 21.8998"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3.04004 15.5198V11.2197"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.0299 12C13.8599 12 15.2099 10.5101 15.0299 8.68005L14.3599 2H9.68989L9.01991 8.68005C8.83991 10.5101 10.1999 12 12.0299 12Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.3298 12C20.3498 12 21.8298 10.36 21.6298 8.34998L21.3498 5.59998C20.9898 2.99998 19.9898 2 17.3698 2H14.3198L15.0198 9.01001C15.1998 10.66 16.6798 12 18.3298 12Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.66979 12C7.31979 12 8.80978 10.66 8.96978 9.01001L9.18981 6.80005L9.66979 2H6.61981C3.99981 2 2.99983 2.99998 2.63983 5.59998L2.3598 8.34998C2.1598 10.36 3.64979 12 5.66979 12Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5 20C5.55228 20 6 19.5523 6 19C6 18.4477 5.55228 18 5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20Z"
                            fill="white"
                          />
                          <path
                            d="M1.66699 19.2931V18.7065C1.66699 18.3598 1.95033 18.0731 2.30033 18.0731C2.90366 18.0731 3.15033 17.6465 2.84699 17.1231C2.67366 16.8231 2.77699 16.4331 3.08033 16.2598L3.65699 15.9298C3.92033 15.7731 4.26033 15.8665 4.41699 16.1298L4.45366 16.1931C4.75366 16.7165 5.24699 16.7165 5.55033 16.1931L5.58699 16.1298C5.74366 15.8665 6.08366 15.7731 6.34699 15.9298L6.92366 16.2598C7.22699 16.4331 7.33033 16.8231 7.15699 17.1231C6.85366 17.6465 7.10033 18.0731 7.70366 18.0731C8.05033 18.0731 8.33699 18.3565 8.33699 18.7065V19.2931C8.33699 19.6398 8.05366 19.9265 7.70366 19.9265C7.10033 19.9265 6.85366 20.3531 7.15699 20.8765C7.33033 21.1798 7.22699 21.5665 6.92366 21.7398L6.34699 22.0698C6.08366 22.2265 5.74366 22.1331 5.58699 21.8698L5.55033 21.8065C5.25033 21.2831 4.75699 21.2831 4.45366 21.8065L4.41699 21.8698C4.26033 22.1331 3.92033 22.2265 3.65699 22.0698L3.08033 21.7398C2.77699 21.5665 2.67366 21.1765 2.84699 20.8765C3.15033 20.3531 2.90366 19.9265 2.30033 19.9265C1.95033 19.9265 1.66699 19.6398 1.66699 19.2931Z"
                            stroke="white"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <Typography
                          sx={{
                            fontFamily: "Noto Sans",
                            fontWeight: "400",
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        >
                          Local settings
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      onClick={() => goTo("menu")}
                      sx={{
                        display: "flex",
                        backgroundColor: "rgba(225,225,225,0.08)",
                        borderRadius: "8px",
                        gap: "20px",
                        px: "8px",
                        py: "8px",
                        alignItems: "center",
                        cursor: "pointer",
                        "&&:hover": {
                          backgroundColor: "rgba(225,225,225,0.2)",
                        },
                        ml: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 16.7397V4.6697C22 3.4697 21.02 2.5797 19.83 2.6797H19.77C17.67 2.8597 14.48 3.9297 12.7 5.0497L12.53 5.1597C12.24 5.3397 11.76 5.3397 11.47 5.1597L11.22 5.0097C9.44 3.8997 6.26 2.8397 4.16 2.6697C2.97 2.5697 2 3.4697 2 4.6597V16.7397C2 17.6997 2.78 18.5997 3.74 18.7197L4.03 18.7597C6.2 19.0497 9.55 20.1497 11.47 21.1997L11.51 21.2197C11.78 21.3697 12.21 21.3697 12.47 21.2197C14.39 20.1597 17.75 19.0497 19.93 18.7597L20.26 18.7197C21.22 18.5997 22 17.6997 22 16.7397Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 5.49023V20.4902"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.75 8.49023H5.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.5 11.4902H5.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <Typography
                          sx={{
                            fontFamily: "Noto Sans",
                            fontWeight: "400",
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        >
                          Menu
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      onClick={() => goTo("offers")}
                      sx={{
                        display: "flex",
                        backgroundColor: "rgba(225,225,225,0.08)",
                        borderRadius: "8px",
                        gap: "20px",
                        px: "8px",
                        py: "8px",
                        alignItems: "center",
                        cursor: "pointer",
                        "&&:hover": {
                          backgroundColor: "rgba(225,225,225,0.2)",
                        },
                        ml: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.9889 14.6604L2.46891 13.1404C1.84891 12.5204 1.84891 11.5004 2.46891 10.8804L3.9889 9.36039C4.2489 9.10039 4.4589 8.59038 4.4589 8.23038V6.08036C4.4589 5.20036 5.1789 4.48038 6.0589 4.48038H8.2089C8.5689 4.48038 9.0789 4.27041 9.3389 4.01041L10.8589 2.49039C11.4789 1.87039 12.4989 1.87039 13.1189 2.49039L14.6389 4.01041C14.8989 4.27041 15.4089 4.48038 15.7689 4.48038H17.9189C18.7989 4.48038 19.5189 5.20036 19.5189 6.08036V8.23038C19.5189 8.59038 19.7289 9.10039 19.9889 9.36039L21.5089 10.8804C22.1289 11.5004 22.1289 12.5204 21.5089 13.1404L19.9889 14.6604C19.7289 14.9204 19.5189 15.4304 19.5189 15.7904V17.9403C19.5189 18.8203 18.7989 19.5404 17.9189 19.5404H15.7689C15.4089 19.5404 14.8989 19.7504 14.6389 20.0104L13.1189 21.5304C12.4989 22.1504 11.4789 22.1504 10.8589 21.5304L9.3389 20.0104C9.0789 19.7504 8.5689 19.5404 8.2089 19.5404H6.0589C5.1789 19.5404 4.4589 18.8203 4.4589 17.9403V15.7904C4.4589 15.4204 4.2489 14.9104 3.9889 14.6604Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 15L15 9"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.4945 14.5H14.5035"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.49451 9.5H9.50349"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <Typography
                          sx={{
                            fontFamily: "Noto Sans",
                            fontWeight: "400",
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        >
                          Offers
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      onClick={() => goTo("story")}
                      sx={{
                        display: "flex",
                        backgroundColor: "rgba(225,225,225,0.08)",
                        borderRadius: "8px",
                        gap: "20px",
                        px: "8px",
                        py: "8px",
                        alignItems: "center",
                        cursor: "pointer",
                        "&&:hover": {
                          backgroundColor: "rgba(225,225,225,0.2)",
                        },
                        ml: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7199 9.68953C17.7799 11.7495 17.7799 15.0795 15.7199 17.1295C13.6599 19.1895 10.3299 19.1895 8.27986 17.1295C6.21986 15.0695 6.21986 11.7395 8.27986 9.68953C10.3299 7.62953 13.6699 7.62953 15.7199 9.68953Z"
                            stroke="white"
                            stroke-width="1.5093"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.0698 6.33973C19.2198 6.48973 19.2198 6.73972 19.0698 6.89972C18.9198 7.04972 18.6698 7.04972 18.5098 6.89972C18.3498 6.74972 18.3598 6.49973 18.5098 6.33973C18.6598 6.17973 18.9198 6.17973 19.0698 6.33973Z"
                            stroke="white"
                            stroke-miterlimit="10"
                          />
                          <path
                            d="M19.0698 6.33973C19.2198 6.48973 19.2198 6.73972 19.0698 6.89972C18.9198 7.04972 18.6698 7.04972 18.5098 6.89972C18.3498 6.74972 18.3598 6.49973 18.5098 6.33973C18.6598 6.17973 18.9198 6.17973 19.0698 6.33973Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.48988 19.9198C5.63988 20.0698 5.63988 20.3198 5.48988 20.4798C5.33988 20.6398 5.08988 20.6298 4.92988 20.4798C4.77988 20.3298 4.77988 20.0798 4.92988 19.9198C5.07988 19.7598 5.33988 19.7598 5.48988 19.9198Z"
                            stroke="white"
                            stroke-miterlimit="10"
                          />
                          <path
                            d="M5.48988 19.9198C5.63988 20.0698 5.63988 20.3198 5.48988 20.4798C5.33988 20.6398 5.08988 20.6298 4.92988 20.4798C4.77988 20.3298 4.77988 20.0798 4.92988 19.9198C5.07988 19.7598 5.33988 19.7598 5.48988 19.9198Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21.8799 13.1298C22.0299 13.2798 22.0299 13.5298 21.8799 13.6898C21.7299 13.8398 21.4799 13.8398 21.3199 13.6898C21.1599 13.5398 21.1699 13.2898 21.3199 13.1298C21.4699 12.9698 21.7299 12.9698 21.8799 13.1298Z"
                            stroke="white"
                            stroke-miterlimit="10"
                          />
                          <path
                            d="M21.8799 13.1298C22.0299 13.2798 22.0299 13.5298 21.8799 13.6898C21.7299 13.8398 21.4799 13.8398 21.3199 13.6898C21.1599 13.5398 21.1699 13.2898 21.3199 13.1298C21.4699 12.9698 21.7299 12.9698 21.8799 13.1298Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.67009 13.1298C2.82009 13.2798 2.82009 13.5298 2.67009 13.6898C2.52009 13.8498 2.27006 13.8398 2.11006 13.6898C1.96006 13.5398 1.96006 13.2898 2.11006 13.1298C2.27006 12.9698 2.52009 12.9698 2.67009 13.1298Z"
                            stroke="white"
                            stroke-miterlimit="10"
                          />
                          <path
                            d="M2.67009 13.1298C2.82009 13.2798 2.82009 13.5298 2.67009 13.6898C2.52009 13.8498 2.27006 13.8398 2.11006 13.6898C1.96006 13.5398 1.96006 13.2898 2.11006 13.1298C2.27006 12.9698 2.52009 12.9698 2.67009 13.1298Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.0698 19.9198C19.2198 20.0698 19.2198 20.3198 19.0698 20.4798C18.9198 20.6298 18.6698 20.6298 18.5098 20.4798C18.3498 20.3298 18.3598 20.0798 18.5098 19.9198C18.6698 19.7598 18.9198 19.7598 19.0698 19.9198Z"
                            stroke="white"
                            stroke-miterlimit="10"
                          />
                          <path
                            d="M19.0698 19.9198C19.2198 20.0698 19.2198 20.3198 19.0698 20.4798C18.9198 20.6298 18.6698 20.6298 18.5098 20.4798C18.3498 20.3298 18.3598 20.0798 18.5098 19.9198C18.6698 19.7598 18.9198 19.7598 19.0698 19.9198Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.48988 6.33973C5.63988 6.48973 5.63988 6.73972 5.48988 6.89972C5.33988 7.05972 5.08988 7.04972 4.92988 6.89972C4.77988 6.74972 4.77988 6.49973 4.92988 6.33973C5.07988 6.17973 5.33988 6.17973 5.48988 6.33973Z"
                            stroke="white"
                            stroke-miterlimit="10"
                          />
                          <path
                            d="M5.48988 6.33973C5.63988 6.48973 5.63988 6.73972 5.48988 6.89972C5.33988 7.05972 5.08988 7.04972 4.92988 6.89972C4.77988 6.74972 4.77988 6.49973 4.92988 6.33973C5.07988 6.17973 5.33988 6.17973 5.48988 6.33973Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.2798 3.5196C12.4298 3.6696 12.4298 3.9196 12.2798 4.0796C12.1298 4.2396 11.8798 4.2296 11.7198 4.0796C11.5598 3.9296 11.5698 3.6796 11.7198 3.5196C11.8698 3.3596 12.1298 3.3696 12.2798 3.5196Z"
                            stroke="white"
                            stroke-miterlimit="10"
                          />
                          <path
                            d="M12.2798 3.5196C12.4298 3.6696 12.4298 3.9196 12.2798 4.0796C12.1298 4.2396 11.8798 4.2296 11.7198 4.0796C11.5598 3.9296 11.5698 3.6796 11.7198 3.5196C11.8698 3.3596 12.1298 3.3696 12.2798 3.5196Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <Typography
                          sx={{
                            fontFamily: "Noto Sans",
                            fontWeight: "400",
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        >
                          Story of Local
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      onClick={() => goTo("team")}
                      sx={{
                        display: "flex",
                        backgroundColor: "rgba(225,225,225,0.08)",
                        borderRadius: "8px",
                        gap: "20px",
                        px: "8px",
                        py: "8px",
                        alignItems: "center",
                        cursor: "pointer",
                        "&&:hover": {
                          backgroundColor: "rgba(225,225,225,0.2)",
                        },
                        ml: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.9699 14.4402C18.3399 14.6702 19.8499 14.4302 20.9099 13.7202C22.3199 12.7802 22.3199 11.2402 20.9099 10.3002C19.8399 9.59016 18.3099 9.35016 16.9399 9.59016"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.99994 14.4402C5.62994 14.6702 4.11994 14.4302 3.05994 13.7202C1.64994 12.7802 1.64994 11.2402 3.05994 10.3002C4.12994 9.59016 5.65994 9.35016 7.02994 9.59016"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.0001 14.6297C11.9401 14.6197 11.8701 14.6197 11.8101 14.6297C10.4301 14.5797 9.33008 13.4497 9.33008 12.0497C9.33008 10.6197 10.4801 9.46973 11.9101 9.46973C13.3401 9.46973 14.4901 10.6297 14.4901 12.0497C14.4801 13.4497 13.3801 14.5897 12.0001 14.6297Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.09021 17.7794C7.68021 18.7194 7.68021 20.2594 9.09021 21.1994C10.6902 22.2694 13.3102 22.2694 14.9102 21.1994C16.3202 20.2594 16.3202 18.7194 14.9102 17.7794C13.3202 16.7194 10.6902 16.7194 9.09021 17.7794Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <Typography
                          sx={{
                            fontFamily: "Noto Sans",
                            fontWeight: "400",
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        >
                          Team
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      onClick={() => goTo("contact")}
                      sx={{
                        display: "flex",
                        backgroundColor: "rgba(225,225,225,0.08)",
                        borderRadius: "8px",
                        gap: "20px",
                        px: "8px",
                        py: "8px",
                        alignItems: "center",
                        cursor: "pointer",
                        "&&:hover": {
                          backgroundColor: "rgba(225,225,225,0.2)",
                        },
                        ml: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                          />
                        </svg>

                        <Typography
                          sx={{
                            fontFamily: "Noto Sans",
                            fontWeight: "400",
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        >
                          Contact
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      onClick={() => goTo("jobs")}
                      sx={{
                        display: "flex",
                        backgroundColor: "rgba(225,225,225,0.08)",
                        borderRadius: "8px",
                        gap: "20px",
                        px: "8px",
                        py: "8px",
                        alignItems: "center",
                        cursor: "pointer",
                        "&&:hover": {
                          backgroundColor: "rgba(225,225,225,0.2)",
                        },
                        ml: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.99983 22H15.9998C20.0198 22 20.7398 20.39 20.9498 18.43L21.6998 10.43C21.9698 7.99 21.2698 6 16.9998 6H6.99983C2.72983 6 2.02983 7.99 2.29983 10.43L3.04983 18.43C3.25983 20.39 3.97983 22 7.99983 22Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8 6V5.2C8 3.43 8 2 11.2 2H12.8C16 2 16 3.43 16 5.2V6"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14 13V14C14 14.01 14 14.01 14 14.02C14 15.11 13.99 16 12 16C10.02 16 10 15.12 10 14.03V13C10 12 10 12 11 12H13C14 12 14 12 14 13Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21.65 11C19.34 12.68 16.7 13.68 14 14.02"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.62012 11.2695C4.87012 12.8095 7.41012 13.7395 10.0001 14.0295"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <Typography
                          sx={{
                            fontFamily: "Noto Sans",
                            fontWeight: "400",
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        >
                          Jobs
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </>
            ))}
        </Box>
      )}
    </Box>
  );
};

MyLocals.propTypes = {};

export default MyLocals;
