import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import ProductHomePage from "../ProductHomePage";

const styles = {
  productStyle: {
    margin: "0",
    padding: "0",
    // borderRadius: "16px",
    // backgroundColor: "red",
    display: "flex",
  },
  small: {
    gridRowEnd: "span 14",
  },
  medium: {
    gridRowEnd: "span 12",
  },
  large: {
    gridRowEnd: "span 16",
  },
};

const ProductSecondLayout = ({ size, product }) => {
  return (
    <Box
      sx={{
        ...styles.productStyle,
        ...styles[size],
      }}
    >
      <ProductHomePage product={product} />
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

ProductSecondLayout.propTypes = {};

export default ProductSecondLayout;
