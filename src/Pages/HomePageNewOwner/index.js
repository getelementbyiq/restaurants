import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import AllProductsRender from "../../Components/Search/Restaurant/AllProductsRender";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsOfOneMenu } from "../../Redux/immigration/products/productsFetchSlice";
import ProductsForWeekly from "../../Components/Search/Restaurant/ProductsForWeekly";
import { getTodayWeekday } from "../../Components/GetDay/GetDay";
import ProductsForSale from "../../Components/Search/Restaurant/ProductsForSale";
import {
  fetchViralProductsAsync,
  selectViralError,
  selectViralLoading,
  selectViralProducts,
} from "../../Redux/immigration/products/productsForMainRestaurantPage";
import ViralProducts from "../../Components/ViralProducts/ViralProducts";
import SaleProducts from "../../Components/ViralProducts/SaleProducts";
import {
  fetchProductsOfSaleMenu,
  fetchSaleMenus,
  selectSaleMenus,
} from "../../Redux/immigration/products/productsForMainRestaurantPageSales";
import HorizontalSwiper from "../../Components/ProductHorizontalSwiper/HorizontalSwiper";

const HomePageNewOwner = (props) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const realTimeMenus = useSelector(
    (state) => state.fetchRealTimeMenus.menusData
  );

  const getProductsOfMenu = (menu) => {
    dispatch(fetchProductsOfOneMenu(menu));
  };

  // const saleMenus = useSelector(selectSaleMenus);
  const products = useSelector(selectViralProducts);
  const loading = useSelector(selectViralLoading);
  const error = useSelector(selectViralError);

  useEffect(() => {
    dispatch(fetchViralProductsAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchSaleMenus());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchProductsOfSaleMenu(saleMenus[0]));
  // }, [dispatch, saleMenus]);

  console.log("products Homepage", products);

  return (
    <Box>
      <ViralProducts />
      <HorizontalSwiper />
      <SaleProducts />
      {/* Weekly/Dayly Bereich
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          height: "200vh",
          // height: "100%",
          background:
            "linear-gradient(90deg, rgba(255,153,0,1) 0%, rgba(162,0,0,1) 100%)",
          color: "#fff",
          alignItems: "center",
          pt: "40px",
          flexDirection: "column",
          gap: "40px",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontSize: "140px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
            color: "#000",
          }}
        >
          Wochenkarte
        </Typography>

        <Box
          sx={{
            width: "50%",
            height: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "rgba(225,225,225,0.15)",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "98%",
              height: "20%",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              justifyContent: "center",
              backgroundColor: "rgba(225,225,225,0.15)",
              borderRadius: "10px",
            }}
          >
            {realTimeMenus?.map(
              (menu) =>
                menu.categoryType === "weekly" && (
                  <Typography
                    sx={{
                      color: getTodayWeekday() === menu.name ? "#fff" : "#000",
                      fontSize: "20px",
                      fontFamily: "Knewave, system-ui",
                      fontWeight: "10",
                      fontStyle: "normal",
                      lineHeight: "50%",
                    }}
                    key={menu.id}
                    onClick={() => getProductsOfMenu(menu)}
                  >
                    {menu.name}
                  </Typography>
                )
            )}
          </Box>
          <Box
            sx={{
              height: "70%",
              width: "98%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "rgba(225,225,225,0.15)",
              borderRadius: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "Knewave, system-ui",
                fontWeight: "10",
                fontStyle: "normal",
                lineHeight: "50%",
              }}
            >
              Info über Wochenkarte
            </Typography>
          </Box>
        </Box>

        <Box
          className="products"
          sx={{
            display: "flex",
            height: "100%",
            width: "80%",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%) scale(1)",
          }}
        >
          <ProductsForWeekly />
        </Box>
      </Box>

      {/* Sale Bereich */}
      {/* <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          height: "200vh",
          // height: "100%",
          background:
            "linear-gradient(90deg, rgba(142,198,0,6) 0%, rgba(56,6,2,5) 100%)",
          color: "#fff",
          alignItems: "center",
          pt: "40px",
          flexDirection: "column",
          gap: "40px",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontSize: "140px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
            color: "#000",
          }}
        >
          Sale
        </Typography>

        <Box
          sx={{
            width: "50%",
            height: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "rgba(225,225,225,0.15)",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "98%",
              height: "20%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              backgroundColor: "rgba(225,225,225,0.15)",
              borderRadius: "10px",
            }}
          >
            {realTimeMenus?.map(
              (menu) =>
                menu.categoryType === "sale" && (
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "20px",
                      fontFamily: "Knewave, system-ui",
                      fontWeight: "10",
                      fontStyle: "normal",
                      lineHeight: "50%",
                    }}
                    key={menu.id}
                    onClick={() => getProductsOfMenu(menu)}
                  >
                    {menu.name}
                  </Typography>
                )
            )}
          </Box>
          <Box
            sx={{
              height: "70%",
              display: "flex",
              justifyContent: "center",
              width: "98%",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "rgba(225,225,225,0.15)",
              borderRadius: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "Knewave, system-ui",
                fontWeight: "10",
                fontStyle: "normal",
                lineHeight: "50%",
              }}
            >
              Info über Sale
            </Typography>
          </Box>
        </Box>

        <Box
          className="products"
          sx={{
            display: "flex",
            height: "100%",
            width: "80%",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%) scale(1)",
          }}
        >
          <ProductsForSale />
        </Box>
      </Box> */}

      {/* Deals Bereich */}
      {/* <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          height: "200vh",
          // height: "100%",
          backgroundColor: "#fff",
          // mb: "300px",
          color: "#000",
          alignItems: "center",
          pt: "80px",
          flexDirection: "column",
          gap: "40px",
          position: "relative",

          // overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: "120px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
            color: "#4ABA05",
          }}
        >
          Deals
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            flexDirection: "column",
            backgroundColor: "rgba(225,225,225,0.15)",
            borderRadius: "16px",
            // border: "1px solid red",
            height: "250px",
            backgroundFilter: "blur(15px)",
            border: "2px solid #E6E6E6",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontFamily: "Knewave, system-ui",
              fontWeight: "40",
              fontStyle: "normal",
              lineHeight: "90%",
              alignItems: "center",
              margin: "0 auto",
              mt: "20px",
              color: "#4ABA05",
            }}
          >
            Info Tab for Deals
          </Typography>
        </Box>
        <Box
          className="products"
          sx={{
            display: "flex",
            height: "100%",
            width: "80%",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%) scale(1)",
            // border: "1px solid red",
          }}
        >
          <AllProductsRender />
        </Box>
      </Box> */}

      {/* Menu Bereich */}
      {/* <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          height: "200vh",
          // height: "100%",
          backgroundColor: "#A99CFF",
          // mb: "300px",
          color: "#fff",
          alignItems: "center",
          pt: "80px",
          flexDirection: "column",
          gap: "40px",
          position: "relative",

          // overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: "120px",
            fontFamily: "Knewave, system-ui",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "90%",
            color: "#FF00D6",
          }}
        >
          Menu
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "50%",
            flexDirection: "column",
            backgroundColor: "rgba(225,225,225,0.15)",
            borderRadius: "16px",
            // border: "1px solid red",
            height: "250px",
            backgroundFilter: "blur(15px)",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontFamily: "Knewave, system-ui",
              fontWeight: "40",
              fontStyle: "normal",
              lineHeight: "90%",
              alignItems: "center",
              margin: "0 auto",
              mt: "20px",
              color: "#FF00D6",
            }}
          >
            Info Tab for Menu
          </Typography>
        </Box>
        <Box
          className="products"
          sx={{
            display: "flex",
            height: "100%",
            width: "80%",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%) scale(1)",
            // border: "1px solid red",
          }}
        >
          <AllProductsRender />
        </Box>
      </Box>  */}
    </Box>
  );
};

HomePageNewOwner.propTypes = {};

export default HomePageNewOwner;
