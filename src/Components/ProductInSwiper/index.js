import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../assets/icons/comments.svg";
import LikeComponent from "../Likes";
import UpdateProduct from "../UpdateProduct";
import Check from "../../assets/icons/check.svg";
import Checked from "../../assets/icons/checked.svg";
import { setSettingsProduct } from "../../Redux/functions/slices/SettingsProduct";
import CommentsComponent from "../Comments";
import { setIsComment } from "../../Redux/functions/slices/IsComment";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { reseIsClicked, setIsClicked } from "../../Redux/slices/isClicked";
import { setRestaurantData } from "../../Redux/slices/onerestaurantData";
import { Tooltip } from "react-tooltip";
import useMobileCheck from "../MobileCheck";

const ProductInSwiper = (product) => {
  const navigate = useNavigate();
  const id = useParams();
  console.log("food id", id);

  const foodId = id.id;

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [settingsOn, setSettingsOn] = useState(false);
  const isMobile = useMobileCheck();

  const restaurantData = useSelector((state) => state.oneRestaurantData);
  const handleCheck = () => {
    setIsChecked((open) => !open);
    setSettingsOn((open) => !open);
  };

  const handleComment = () => {
    setIsComment((open) => !open);
  };
  // const productId = product?.product.id;
  console.log("product", product);
  console.log("restaurantData from product", restaurantData);
  // const {
  //   name,
  //   price,
  //   description,
  //   comments,
  //   likes,
  //   background,
  //   createdAt,
  //   restaurantsId,
  //   items,
  // } = product;

  // const itemsData = useSelector((state) => state.createItemsList);
  //   const localData = useSelector((state) => state.localData);
  // const backgroundBlob = new Blob([product.background]);
  // const newBackground = URL.createObjectURL(backgroundBlob);
  // const backgroundImage = `url(${URL.createObjectURL(
  //   new Blob([product.background])
  // )})`;

  // const [isHovered, setHovered] = useState(false);

  const onClickProduct = (product) => {
    if (id.id === product.product.id) {
      navigate("/");
    } else {
      navigate(
        `/${product.product.restaurantsId}/${product.product.categoryType}/${product.product.selectedCategoryId}/${product.product.id}`
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const restaurantRef = doc(
        db,
        "restaurants",
        product.product.restaurantsId
      );
      const retaurantData = await getDoc(restaurantRef);
      dispatch(setRestaurantData(retaurantData.data()));
    };
    fetchData();
  }, []);

  // const isClicked = useSelector((state) => state.isClicked);
  // const onClickProduct = (product) => {
  //   // Wenn die aktuelle ID bereits in isClicked vorhanden ist, setze isClicked auf null
  //   if (isClicked.id === product.id) {
  //     dispatch(reseIsClicked());
  //   } else {
  //     dispatch(setIsClicked(product));
  //   }
  // };

  const goTo = (id) => {
    navigate(`/${id}`);
  };

  const [pressCount, setPressCount] = useState(0);
  const handlePress = () => {
    if (pressCount === 1) {
      setPressCount(0);
    } else if (pressCount > 1) {
      setPressCount(0);
    } else {
      setPressCount(pressCount + 1);
    }
  };

  return (
    <Box
      // onClick={handlePress}
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      sx={{
        display: "flex",
        flexDirection: "column",
        // flexGrow: 1,
        backgroundImage: `url(${product.product.background})`,

        //   backgroundImage: `url(${localData.background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Du kannst die Hintergrundgröße anpassen
        backgroundPosition: "center",

        // py: !isComment ? "8px" : "0",
        borderRadius: isMobile ? "0px" : "32px",
        boxShadow: "0px 0px 400px 0px #000 inset",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        flexGrow: "1",
      }}
    >
      {/* {foodId === product.product.id && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "1000",
            background: "#936FF9",
            opacity: "0.6",
          }}
        ></Box>
      )} */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flexGrow: "1",
          // border: "1px solid red",
        }}
      >
        {!isChecked && !isComment && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: "16px",
              transition: "150ms",
              position: "relative",
              top: "8px",
              visibility: "visible",
              zIndex: "1",
              textAlign: "start",
              // border: "1px solid red",
            }}
          >
            <Box sx={{ maxWidth: "50%" }}>
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Noto Sans",
                  fontWeight: "400",
                  fontSize: "32px",
                }}
              >
                {product.product.name}
              </Typography>
            </Box>
            <Box sx={{ maxWidth: "50%" }}>
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Noto Sans",
                  fontWeight: "300",
                  fontSize: "32px",
                }}
              >
                {product.product.price}$
              </Typography>
            </Box>
          </Box>
        )}

        {!isChecked && !isComment && (
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              // border: "1px solid red",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                // border: "1px solid blue",
                flexDirection: "column",
              }}
            >
              <Box
                className="description"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // border: "1px solid red",
                  px: "8px",
                  overflow: "auto",
                  position: "relative",
                  zIndex: "1",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {/* {!isComment && (
                  <Typography
                    sx={{
                      fontFamily: "Noto Sans",
                      color: "#fff",
                      fontSize: "28px",
                      fontWeight: "400",
                    }}
                  >
                    {product.product.description}
                  </Typography>
                )} */}
              </Box>

              <Box
                sx={{
                  flexGrow: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {pressCount > 1 && (
                  <Typography sx={{ fontSize: "60px" }}>LIKED</Typography>
                )}
              </Box>
              {pressCount === 1 && (
                <Box
                  sx={{
                    display: "flex",
                    mt: "8px",
                    ml: "8px",
                    maxWidth: "100%",
                    flexWrap: "wrap",
                    mb: "32px",
                    transition: "150ms",
                    position: "relative",
                    bottom: "0",
                    visibility: "visible",
                    zIndex: "1",
                    flexDirection: "column",
                    // border: "1px solid red",
                    gap: "32px",
                  }}
                >
                  <Box
                    sx={{
                      disply: "flex",
                      justifyContent: "flex-start",
                      // border: "1px solid white",
                      textAlign: "start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Noto Sans",
                        color: "#fff",
                        fontSize: "24px",
                        fontWeight: "400",
                      }}
                    >
                      {product.product.description}
                    </Typography>
                  </Box>
                  {!isChecked && !isComment && product.product.items && (
                    <Box
                      sx={{
                        display: "flex",
                        flexGrow: "1",
                        flexWrap: "wrap",
                        gap: "4px",
                      }}
                    >
                      {Object.values(product.product.items).map((item) => (
                        <Box sx={{ display: "flex" }}>
                          <Box
                            sx={{
                              background: "#fff",
                              px: "16px",
                              py: "4px",
                              borderRadius: "32px",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "20px", fontFamily: "Noto Sans" }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            {pressCount === 0 && !isComment && (
              <Box
                sx={{
                  display: "flex",
                  my: "16px",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  transition: "150ms",
                  position: "relative",
                  right: "4px",
                  visibility: "visible",
                  zIndex: "1",
                  // border: "1px solid white",
                  ml: "16px",
                }}
              >
                <IconButton onClick={() => setPressCount(0)}>
                  <Typography sx={{ color: "#fff" }}>X</Typography>
                </IconButton>
                <Box
                  sx={{
                    // border: "1px solid red",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Avatar
                    onClick={() => goTo(product.product.restaurantsId)}
                    src={restaurantData.restaurantData.logo}
                    sx={{
                      width: "32px",
                      height: "32px",
                      // border: "4px solid #fff",
                      transition: "150ms",
                    }}
                  />

                  <LikeComponent product={product} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      // border: "1px solid green",
                    }}
                  >
                    <IconButton
                      onClick={handleComment}
                      sx={{
                        // border: "1px solid red",
                        width: isMobile ? "44px" : "24px",
                        height: isMobile ? "44px" : "24px",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15.9965 11H16.0054"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.9955 11H12.0045"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.99451 11H8.00349"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </IconButton>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "Noto Sans",
                        fontWeight: "300",
                      }}
                    >
                      123
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      // border: "1px solid green",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={handlePress}
                      sx={{
                        // border: "1px solid red",
                        width: isMobile ? "44px" : "24px",
                        height: isMobile ? "44px" : "24px",
                        // border: "4px solid red",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "32px",
                          fontFamily: "Knewave, system-ui",
                          fontWeight: "400",
                          fontStyle: "normal",
                          lineHeight: "90%",
                          color: "#FF00D6",
                        }}
                      >
                        i
                      </Typography>
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
        {isComment && (
          <CommentsComponent product={product} handleComment={handleComment} />
        )}
      </Box>
      {!isChecked && !isComment && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "150ms",
            position: "relative",
            bottom: "0",
            visibility: "visible",
            zIndex: "1",
            mb: "80px",
            // border: "1px solid blue",
            px: "16px",
          }}
        >
          <Button
            sx={{
              // background: "#929292",
              color: "#fff",
              background: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(3.5px)",
              borderRadius: "32px",
              px: "26px",

              // border: "1px solid red",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.3)",
                color: "#fff",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Quicksand",
                fontWeight: "800",
                fontSize: "32px",
              }}
            >
              MENU
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
};

ProductInSwiper.propTypes = {};

export default ProductInSwiper;
