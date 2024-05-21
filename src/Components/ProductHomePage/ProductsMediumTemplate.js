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
import Clock from "../Clock/Clock";
import { timeToNumericFormat } from "../AAATimeToNum/TimeToNum";

const ProductsMediumTemplate = (product) => {
  const navigate = useNavigate();
  const { menuId } = useParams();
  const currentTime = Clock();
  const currentTimeRightFormat = timeToNumericFormat(currentTime);

  console.log("currentTimeRightFormat", currentTimeRightFormat);

  const [saleDealValue, setSaleDealValue] = useState();

  const value = useSelector((state) => state.globalStates.saleDealValue);
  console.log("saleDealValue", saleDealValue);

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [settingsOn, setSettingsOn] = useState(false);
  const isMobile = useMobileCheck();

  const restaurantData = useSelector((state) => state?.oneRestaurantData);
  const deal = useSelector((state) =>
    state?.fetchRealTimeMenus?.menusData.find((deal) => deal.id === menuId)
  );
  const dealsState = useSelector((state) => state?.globalStates?.dealsState);

  useEffect(() => {
    if (value) {
      setSaleDealValue(value);
    } else if (deal) {
      setSaleDealValue(deal.discount);
    }
  }, [value, deal]);
  const handleCheck = () => {
    setIsChecked((open) => !open);
    setSettingsOn((open) => !open);
  };

  console.log("unser deal", deal);

  const handleComment = () => {
    setIsComment((open) => !open);
  };
  const stringPriceToNumber = (stringPrice) => {
    return parseFloat(stringPrice.replace(",", "."));
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
              px: "16px",
              transition: "150ms",
              position: "relative",
              top: !isHovered ? "-36px" : "8px",
              visibility: isHovered ? "visible" : "hidden",
              zIndex: "1",
              // border: "1px solid red",
              flexDirection: "column",
              gap: "4px",
              alignItems: "flex-end",
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
            {saleDealValue &&
              deal?.categoryType === "sale" &&
              dealsState === "sale" && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: "16px",
                    py: "4px",
                    borderRadius: "32px",
                    backgroundColor:
                      currentTimeRightFormat < deal.offerStart
                        ? "grey"
                        : currentTimeRightFormat > deal.offerEnd
                        ? "grey"
                        : "green",
                  }}
                >
                  {/* esli currentTime menwe chen from to grey, i esli current time bolwe to, to gray     
                           offerStart < CurrentTime < offerEnd === green
                  */}
                  <Typography
                    sx={{
                      color: "#fff",
                      fontFamily: "Noto Sans",
                      fontWeight: "300",
                      fontSize: "16px",
                    }}
                  >
                    {stringPriceToNumber(product.product.price) -
                      (saleDealValue *
                        stringPriceToNumber(product.product.price)) /
                        100}
                    $
                  </Typography>
                </Box>
              )}
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

ProductsMediumTemplate.propTypes = {};

export default ProductsMediumTemplate;
