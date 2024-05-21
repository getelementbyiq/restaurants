import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import GipoImg from "../../assets/img/techpark.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import ProductHomePage from "../ProductHomePage";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProductRef } from "../../Redux/slices/productRefSlice";
import ProductSecondLayout from "../ProductsecondLayout";
import useMobileCheck from "../MobileCheck";
import FullscreenProductView from "../../Pages/FullScreenProductMobile";
import { setRestaurantDataFromMain } from "../../Redux/slices/restaurantDataFromMain";
// import Masonry from "@mui/lab/Masonry";
// or
// import { Masonry } from "@mui/lab";

const restaurantId = "d8TVB71rJl1AqGh3XcMO ";

const size = ["small", "medium", "large"];
let productIndex = 0;

const ProductsRenderMain = ({ updateProductRef }) => {
  const dispatch = useDispatch();
  const id = useParams();
  const [restaurantData, setRestaurantData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const isMobile = useMobileCheck();

  const productFullView = useSelector(
    (state) => state.productsFetchSlice.productsData
  );

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: "16px",
          // border: "1px solid green",
          width: isMobile ? "100vw" : "90vw",
          // backgroundColor: "black",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fill,45%)"
            : "repeat(auto-fill,260px)",
          gridAutoRows: "10px",
          justifyContent: "center",
        }}
      >
        {productFullView?.products.map((product, index) => {
          console.log("productsindexis", productIndex);
          const currentSize = size[productIndex % size.length];
          productIndex++;
          return (
            <ProductSecondLayout
              key={product.id}
              size={currentSize}
              product={product}
            />
          );
        })}
      </Box>
    </Box>
  );
};

ProductsRenderMain.propTypes = {};

export default ProductsRenderMain;
