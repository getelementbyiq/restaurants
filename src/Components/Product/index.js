import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Comment from "../../assets/icons/comments.svg";
import LikeComponent from "../Likes";

const Product = (props) => {
  const product = useSelector((state) => state.createProduct.productData);
  const itemsData = useSelector((state)=> state.createItemsList)
  //   const localData = useSelector((state) => state.localData);
  const backgroundBlob = new Blob([product.background]);
  const newBackground = URL.createObjectURL(backgroundBlob);
  const backgroundImage = `url(${URL.createObjectURL(
    new Blob([product.background])
  )})`;

  const [isHovered, setHovered] = useState(false);
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ display: "flex", flexGrow: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          backgroundImage: backgroundImage,

          //   backgroundImage: `url(${localData.background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Du kannst die Hintergrundgröße anpassen
          backgroundPosition: "center",
          maxWidth: "244px",
          height: "384px",
          py: "8px",
          borderRadius: "32px",
          boxShadow: "0px 0px 150px 0px #000 inset",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            px: "8px",
            transition: "150ms",
            position: "relative",
            top: !isHovered ? "-30px" : "0",
            visibility: isHovered ? "visible" : "hidden",
          }}
        >
          <Typography sx={{ color: "#fff" }}>{product.name}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: "8px",
            transition: "150ms",
            position: "relative",
            right: !isHovered ? "-30px" : "0",
            visibility: isHovered ? "visible" : "hidden",
          }}
        >
          <Typography sx={{ color: "#fff" }}>{product.price}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Box sx={{ display: "flex", flexGrow: 1 }}></Box>
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
            }}
          >
            <Box>
              <LikeComponent />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <IconButton>
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
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "150ms",
            position: "relative",
            bottom: !isHovered ? "-50px" : "0",
            visibility: isHovered ? "visible" : "hidden",
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
      </Box>
    </Box>
  );
};

Product.propTypes = {};

export default Product;
