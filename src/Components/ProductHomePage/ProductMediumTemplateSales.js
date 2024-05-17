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

const ProductMediumTemplateSales = (product) => {
  const { dealId } = useParams();
  const navigate = useNavigate();
  const id = useParams();
  console.log("food id", id);

  const foodId = id.id;

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [settingsOn, setSettingsOn] = useState(false);
  const isMobile = useMobileCheck();

  const deal = useSelector((state) =>
    state.fetchDeals.dealsData.find((deal) => deal.id === dealId)
  );

  console.log("unser deal", deal);

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

  const [isHovered, setHovered] = useState(true);

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

  return (
    <Box
      // onClick={() => onClickProduct(product)}
      onMouseEnter={() => setHovered(false)}
      onMouseLeave={() => setHovered(true)}
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid red",
        // flexGrow: 1,
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
        flexGrow: "1",
      }}
    >
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
              // border: "1px solid red",
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
                  flexDirection: "column",
                }}
              >
                {isHovered && !isComment && (
                  <Typography
                    sx={{
                      fontFamily: "Noto Sans",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    {product.product.description}
                  </Typography>
                )}
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
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

ProductMediumTemplateSales.propTypes = {};

export default ProductMediumTemplateSales;
