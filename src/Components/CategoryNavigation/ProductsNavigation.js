import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { setDealsState } from "../../Redux/immigration/globalStates/globalStatesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// const categoryList = ["calssic", "combi", "sale", "others"];
// const categoryList1 = [
//   { name: "calssic", color: "" },
//   { name: "combi", color: "" },
//   { name: "sale", color: "" },
//   { name: "others", color: "" },
// ];

const ProductsTypeNavigation = (props) => {
  const { porductsType } = useParams();

  const navigate = useNavigate();
  const goTo = (txt) => {
    navigate(`/products/${txt}`);
  };

  const categoryList = useSelector(
    (state) => state.globalStates.productsTypeList
  );

  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        gap: "8px",
        alignItems: "center",
        px: "40px",
      }}
    >
      {categoryList.map((category) => (
        <Box
          key={category.name}
          onClick={() => goTo(category.name)}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            px: "8px",
            py: "2px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "150ms",
            "&&:hover": {
              transform: "scale(1.2)",
            },
          }}
        >
          <Typography
            sx={{
              color: category.name === porductsType ? "#000" : "#B8B8B8",
            }}
          >
            {category.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              borderRadius: "4px",
              height: "4px",
              backgroundColor:
                category.name === porductsType ? category.color : "#fff",
            }}
          ></Box>
        </Box>
      ))}
    </Box>
  );
};

ProductsTypeNavigation.propTypes = {};

export default ProductsTypeNavigation;
