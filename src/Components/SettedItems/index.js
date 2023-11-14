import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../Redux/slices/createProductSlice";

const Setteditems = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.createProduct.productData);
  const items = product.items;
  const [itemsValue, setItemsValue] = useState({});

  const handleRemoveitem = (itemsName) => {
    dispatch(deleteItem({ itemsName }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        maxWidth: "250px",
        maxHeight: "150px",
        gap: "4px",
        mt: "8px",
      }}
    >
      {items &&
        Object.keys(items).map((item) => (
          <Box>
            <Box
              key={item}
              onClick={() => handleRemoveitem(item)}
              sx={{
                px: "8px",
                py: "4px",
                borderRadius: "32px",
                background: "#1EC90F",
                cursor: "pointer",
              }}
            >
              <Typography sx={{ color: "#fff" }}>{item}</Typography>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

Setteditems.propTypes = {};

export default Setteditems;
