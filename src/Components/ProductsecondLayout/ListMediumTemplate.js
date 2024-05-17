import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Dialog, Typography } from "@mui/material";
import useMobileCheck from "../MobileCheck";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProductFullview,
  setProductFullview,
} from "../../Redux/slices/productFullView";
import ProductsMediumTemplate from "../ProductHomePage/ProductsMediumTemplate";

const ListMediumTemplate = ({ size, product }) => {
  const show = useSelector((state) => state.globalStates.menuAddProduct);
  const [clicked, setClicked] = useState(false);
  const isMobile = useMobileCheck();
  const dispatch = useDispatch();
  const productFullView = useSelector((state) => state.productFullView);
  console.log("productFullView", productFullView);

  const handleClickOpen = () => {
    setClicked(true);
    dispatch(setProductFullview(product));
  };
  const handleClose = () => {
    setClicked(false);
    dispatch(resetProductFullview());
  };

  const styles = {
    productStyle: {
      margin: "0",
      padding: "0",
      // borderRadius: "16px",
      // backgroundColor: "red",
      display: "flex",
    },
    small: {
      gridRowEnd: isMobile ? "span 12" : "span 8",
    },
    medium: {
      gridRowEnd: isMobile ? "span 8" : "span 8",
    },
    large: {
      gridRowEnd: isMobile ? "span 10" : "span 8",
    },
  };
  return (
    <Box
      sx={{
        ...styles.productStyle,
        ...styles[size],
      }}
    >
      {/* {clicked && <Typography>clicked</Typography>} */}
      <ProductsMediumTemplate product={product} />
    </Box>
  );
};

// const ProductSecondLayout = (props) => {
//   return (
//     <Box
//       sx={{
//         ...styles.productStyle,
//         ...styles[props.size],
//       }}
//     >
//       <ProductHomePage product={product} />
//     </Box>
//   );
// };

ListMediumTemplate.propTypes = {};

export default ListMediumTemplate;
