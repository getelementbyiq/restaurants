import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Comment from "../../assets/icons/comments.svg";
import LikeComponent from "../Likes";

const ProductPreview = (props) => {
  const product = useSelector((state) => state.createProduct.productData);
  const itemsData = useSelector((state) => state.createItemsList);
  //   const localData = useSelector((state) => state.localData);
  const backgroundBlob = new Blob([product.background]);
  const newBackground = URL.createObjectURL(backgroundBlob);
  const backgroundImage = `url(${URL.createObjectURL(
    new Blob([product.background])
  )})`;

  const [isHovered, setHovered] = useState(false);
  return (
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
        borderRadius: "32px",
        boxShadow: "0px 0px 300px 0px #000 inset",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: "0",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: "8px",
          position: "relative",
          zIndex: "1",
          mt: "8px",
        }}
      >
        <Typography sx={{ color: "#fff" }}>{product.name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          px: "8px",
          position: "relative",
          zIndex: "1",
        }}
      >
        <Typography sx={{ color: "#fff" }}>{product.price}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          background: "(rgba(225,225,225,0.15)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            // border: "1px solid red",
            // background: "rgba(0,0,0,0.3)",
            px: "8px",

            overflow: "auto",
            position: "relative",
            zIndex: "1",
          }}
        >
          <Typography sx={{ fontFamily: "Quicksand", color: "#fff" }}>
            {product.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: "8px",
              gap: "4px",
              maxWidth: "100%",
              flexWrap: "wrap",
              position: "relative",
              zIndex: "1",
            }}
          >
            {product.items &&
              Object.values(product.items).map((item) => (
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      background: "#fff",
                      px: "8px",
                      py: "4px",
                      borderRadius: "32px",
                    }}
                  >
                    <Typography>{item}</Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            my: "16px",
            justifyContent: "center",
            alignItems: "flex-end",
            mr: "8px",
          }}
        >
          <Box>
            <LikeComponent />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                mt: "8px",
              }}
            >
              <IconButton sx={{ width: "24px", height: "24px" }}>
                <img
                  src={Comment}
                  alt=""
                  style={{ height: "20px", width: "20px" }}
                />
              </IconButton>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  fontFamily: "Quicksand",
                  position: "relative",
                  zIndex: "1",
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
          position: "relative",
          zIndex: "1",
        }}
      >
        <Button
          sx={{
            background: "#929292",
            width: "60%",
            borderRadius: "32px",
            color: "#fff",
            "&:hover": { background: "#000" },
            mb: "8px",
          }}
        >
          Add to Card
        </Button>
      </Box>
    </Box>
  );
};

export default ProductPreview;
