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

const ProductMainQuest = (product) => {
  const navigate = useNavigate();
  const id = useParams();
  console.log("food id", id);

  const foodId = id.id;

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [settingsOn, setSettingsOn] = useState(false);
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

  const [isHovered, setHovered] = useState(false);

  const onClickProduct = (product) => {
    if (id.id === product.product.id) {
      navigate("/");
    } else {
      navigate(
        `/${product.product.restaurantsId}/${product.product.categoryType}/${product.product.selectedCategoryId}/${product.product.id}`
      );
    }
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
  };

  // const isClicked = useSelector((state) => state.isClicked);
  // const onClickProduct = (product) => {
  //   // Wenn die aktuelle ID bereits in isClicked vorhanden ist, setze isClicked auf null
  //   if (isClicked.id === product.id) {
  //     dispatch(reseIsClicked());
  //   } else {
  //     dispatch(setIsClicked(product));
  //   }
  // };

  return (
    <Box
      onClick={() => onClickProduct(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        backgroundImage: `url(${product.product.background})`,

        //   backgroundImage: `url(${localData.background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Du kannst die Hintergrundgröße anpassen
        backgroundPosition: "center",

        // py: !isComment ? "8px" : "0",
        borderRadius: "32px",
        boxShadow: !isHovered
          ? "0px 0px 25px 0px #000 inset"
          : "0px 0px 150px 0px #000 inset",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
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
              justifyContent: "center",
              px: "16px",
              transition: "150ms",
              position: "relative",
              top: !isHovered ? "-100px" : "8px",
              visibility: isHovered ? "visible" : "hidden",
              position: "relative",
              zIndex: "1",
              flexDirection: "column",
              textAlign: "end",
              // border: "1px solid red",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexGrow: "1",
                alignItems: "center",
                gap: "8px",
                border: "1px solid red",
              }}
            >
              <Avatar
                src={restaurantData.restaurantData.logo}
                sx={{ width: "24px", height: "24px" }}
              />
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Noto Sans",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                {restaurantData.restaurantData.name}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#fff",
                fontFamily: "Noto Sans",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              {product.product.name}
            </Typography>
          </Box>
        )}
        {!isChecked && !isComment && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              px: "16px",
              transition: "150ms",
              position: "relative",
              top: !isHovered ? "-36px" : "8px",
              visibility: isHovered ? "visible" : "hidden",
              position: "relative",
              zIndex: "1",
              border: "1px solid red",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontFamily: "Noto Sans",
                fontWeight: "300",
                fontSize: "16px",
              }}
            >
              {product.product.price}$
            </Typography>
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
                {/* {isHovered && !isComment && (
                  <Typography
                    sx={{
                      fontFamily: "Noto Sans",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    {product.product.description}
                  </Typography>
                )} */}
              </Box>

              <Box sx={{ flexGrow: "1" }}></Box>
              <Box
                sx={{
                  display: "flex",
                  mt: "8px",
                  ml: "8px",
                  gap: "4px",
                  maxWidth: "100%",
                  flexWrap: "wrap",
                  mb: "16px",
                  // border: "1px solid red",
                  transition: "150ms",
                  position: "relative",
                  bottom: !isHovered ? "-30px" : "0",
                  visibility: isHovered ? "visible" : "hidden",
                  position: "relative",
                  zIndex: "1",
                }}
              >
                {isHovered && !isComment && (
                  <Typography
                    sx={{
                      fontFamily: "Noto Sans",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "200",
                    }}
                  >
                    {product.product.description}
                  </Typography>
                )}

                {/* {!isChecked &&
                  !isComment &&
                  product.product.items &&
                  Object.values(product.product.items).map((item) => (
                    <Box sx={{ display: "flex" }}>
                      <Box
                        sx={{
                          background: "#fff",
                          px: "4px",
                          py: "2px",
                          borderRadius: "32px",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "12px", fontFamily: "Noto Sans" }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    </Box>
                  ))} */}
              </Box>
            </Box>
            {!isComment && (
              <Box
                sx={{
                  display: "flex",
                  my: "16px",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  transition: "150ms",
                  position: "relative",
                  right: !isHovered ? "-30px" : "0",
                  visibility: isHovered ? "visible" : "hidden",
                  zIndex: "1",
                }}
              >
                <Box>
                  <LikeComponent product={product} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <IconButton onClick={handleComment}>
                      <img
                        src={Comment}
                        alt=""
                        style={{ width: "16px", height: "16px" }}
                      />
                    </IconButton>
                    <Typography
                      sx={{
                        fontSize: "12px",
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
                </Box>
              </Box>
            )}
          </Box>
        )}
        {!isChecked && !isComment && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "150ms",
              position: "relative",
              bottom: !isHovered ? "-50px" : "0",
              visibility: isHovered ? "visible" : "hidden",
              zIndex: "1",
              mb: "8px",
            }}
          >
            {/* <Button
                sx={{
                  background: "#929292",
                  width: "60%",
                  borderRadius: "32px",
                  color: "#fff",
                  "&:hover": { background: "#000" },
                }}
              >
                Add to Card
              </Button> */}
          </Box>
        )}
        {isComment && (
          <CommentsComponent product={product} handleComment={handleComment} />
        )}
      </Box>
    </Box>
  );
};

ProductMainQuest.propTypes = {};

export default ProductMainQuest;
