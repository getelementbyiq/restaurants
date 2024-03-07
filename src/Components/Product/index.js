import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../assets/icons/comments.svg";
import LikeComponent from "../Likes";
import UpdateProduct from "../UpdateProduct";
import Check from "../../assets/icons/check.svg";
import Checked from "../../assets/icons/checked.svg";
import { setSettingsProduct } from "../../Redux/functions/slices/SettingsProduct";
import CommentsComponent from "../Comments";
import { setIsComment } from "../../Redux/functions/slices/IsComment";

const Product = (product) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [settingsOn, setSettingsOn] = useState(false);
  const handleCheck = () => {
    setIsChecked((open) => !open);
    setSettingsOn((open) => !open);
  };

  const handleComment = () => {
    setIsComment((open) => !open);
  };
  const productId = product.product.id;
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

  console.error("product aus dem Product", product);

  // const itemsData = useSelector((state) => state.createItemsList);
  //   const localData = useSelector((state) => state.localData);
  // const backgroundBlob = new Blob([product.background]);
  // const newBackground = URL.createObjectURL(backgroundBlob);
  // const backgroundImage = `url(${URL.createObjectURL(
  //   new Blob([product.background])
  // )})`;

  const [isHovered, setHovered] = useState(false);
  return (
    <Box sx={{ display: "flex", pt: "8px" }}>
      <Box
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

          width: "244px",
          height: "384px",
          // py: !isComment ? "8px" : "0",
          borderRadius: "32px",
          boxShadow: "0px 0px 150px 0px #000 inset",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {isChecked ||
          (isComment && (
            <Box
              sx={{
                background: !isChecked ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.8)",
                display: "flex",
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: "0",
              }}
            ></Box>
          ))}
        {!isComment && (
          <Box
            sx={{
              position: "absolute",
              left: "16px",
              top: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "3",
            }}
          >
            <IconButton
              sx={{ height: "24px", width: "24px" }}
              onClick={handleCheck}
            >
              <img src={!isChecked ? Check : Checked} alt="" />
            </IconButton>
          </Box>
        )}
        {isChecked && <UpdateProduct product={product} />}
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {!isChecked && isHovered && !isComment && (
            <Box
              sx={{
                background: isComment ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.4)",
                display: "flex",
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: "0",
              }}
            ></Box>
          )}

          {/* {isChecked && (

          )} */}
          {!isChecked && !isComment && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                px: "8px",
                transition: "150ms",
                position: "relative",
                top: !isHovered ? "-30px" : "0",
                visibility: isHovered ? "visible" : "hidden",
                position: "relative",
                zIndex: "1",
              }}
            >
              <Typography sx={{ color: "#fff" }}>
                {product.product.name}
              </Typography>
            </Box>
          )}
          {!isChecked && !isComment && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                px: "8px",
                transition: "150ms",
                position: "relative",
                right: !isHovered ? "-30px" : "0",
                visibility: isHovered ? "visible" : "hidden",
                position: "relative",
                zIndex: "1",
              }}
            >
              <Typography sx={{ color: "#fff" }}>
                {product.product.price}
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
                    // flex: "1",
                    // border: "1px solid red",
                    // background: "rgba(0,0,0,0.3)",
                    px: "8px",

                    overflow: "auto",
                    position: "relative",
                    zIndex: "1",
                  }}
                >
                  {isHovered && !isComment && (
                    <Typography sx={{ fontFamily: "Quicksand", color: "#fff" }}>
                      {product.product.description}
                    </Typography>
                  )}
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
                    position: "relative",
                    zIndex: "1",
                    mb: "16px",
                  }}
                >
                  {isHovered &&
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
                          <Typography>{item}</Typography>
                        </Box>
                      </Box>
                    ))}
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
                        <img src={Comment} alt="" />
                      </IconButton>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "#fff",
                          display: "flex",
                          justifyContent: "center",
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
              <Button
                sx={{
                  background: "#929292",
                  width: "60%",
                  borderRadius: "32px",
                  color: "#fff",
                  "&:hover": { background: "#000" },
                }}
              >
                Add to Card
              </Button>
            </Box>
          )}
          {isComment && (
            <CommentsComponent
              product={product}
              handleComment={handleComment}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

Product.propTypes = {};

export default Product;
