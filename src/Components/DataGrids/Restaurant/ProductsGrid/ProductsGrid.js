import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { fetchProductsData } from "../../../../Redux/immigration/products/productsFetchSlice";
import { useDispatch, useSelector } from "react-redux";
import ListProductTemplate from "../../../Templates/ListProductTemplate/ListProductTemplate";

export default function ProductsGrid() {
  const dispatch = useDispatch();
  const restaurantOfUser = useSelector(
    (state) => state.restaurants.userRestaurants
  );
  // const restaurantsId = id;
  const userId = restaurantOfUser[0]?.id;
  const products = useSelector(
    (state) => state.productsFetchSlice.productsData
  );

  console.log("products", products);
  // React.useEffect(() => {
  //   dispatch(fetchProductsData(userId));
  // }, [userId, dispatch]);
  return (
    <Box
      sx={{
        height: 400,
        px: "40px",
        display: "flex",
        flexGrow: "1",
        flexDirection: "column",
      }}
    >
      {products?.map((product) => (
        <ListProductTemplate product={product} />
      ))}
    </Box>
  );
}
