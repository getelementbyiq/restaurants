import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Clock from "../../Components/Clock/Clock";
import { Box, Typography } from "@mui/material";
import MainProductsList from "../../Components/MainProductsList";
import ProductSecondLayout from "../../Components/ProductsecondLayout";
import AllProductsRender from "../../Components/Search/Restaurant/AllProductsRender";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import CategoryNavigation from "../../Components/CategoryNavigation/CategoryNavigation";
import { useNavigate, useParams } from "react-router-dom";
import ProductRenderInDeals from "../../Components/Search/Restaurant/ProductRenderInDeals";
import { fetchProductsOfOneMenu } from "../../Redux/immigration/products/productsFetchSlice";
import ProductsForWeekly from "../../Components/Search/Restaurant/ProductsForWeekly";
import { getTodayWeekday } from "../../Components/GetDay/GetDay";

const filterProductsByMenu = (realTimeMenus, products) => {
  return products?.filter((product) =>
    realTimeMenus?.productIds?.includes(product.id)
  );
};
const HomePageNewOwner = (props) => {
  const dispatch = useDispatch();
  // const { categoryState } = useParams();
  // const navigate = useNavigate();
  // const goTo = (txt) => {
  //   navigate(`/menu/${txt}`);
  // };

  const [menu, setMenu] = useState();
  const scrollRef = useRef();
  // const categoryList = useSelector((state) => state.globalStates.categoryList);
  const realTimeMenus = useSelector(
    (state) => state.fetchRealTimeMenus.menusData
  );
  const products = useSelector(
    (state) => state?.productsFetchSlice?.productsData
  );

  const productsOfMenu = useSelector(
    (state) => state?.productsFetchSlice?.productsOfMenu.data
  );

  // const products = useSelector(
  //   (state) => state.productsFetchSlice.productsOfMenu.data
  // );

  // const thisMenu = realTimeMenus?.find(
  //   (menu) => menu?.name === getTodayWeekday()
  // );
  // console.log("productsOfMenu", productsOfMenu);
  // console.log("menu----", thisMenu);

  // const today = getTodayWeekday();

  // useEffect(() => {
  //   thisMenu && dispatch(fetchProductsOfOneMenu(thisMenu));
  // }, [thisMenu, dispatch]);
  // const [weekDay, setWeekDay] = useState(today);

  const getProductsOfMenu = (menu) => {
    dispatch(fetchProductsOfOneMenu(menu));
  };

  return (
    <Box>
      {/* Weekly/Dayly Bereich */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          height: "200vh",
          // height: "100%",
          background:
            "linear-gradient(90deg, rgba(255,153,0,1) 0%, rgba(162,0,0,1) 100%)",
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
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "rgba(225,225,225,0.15)",
            borderRadius: "16px",
            height: "250px",
            px: "24px",
            gap: "16px",
            py: "16px",
          }}
        >
          {realTimeMenus?.map(
            (menu) =>
              menu.categoryType === "weekly" && (
                <Typography
                  onClick={() => getProductsOfMenu(menu)}
                  sx={{
                    color: getTodayWeekday() === menu.name ? "red" : "#000",
                  }}
                >
                  {menu.name}
                </Typography>
              )
          )}
          {/* 
          {categoryList?.map((category) => (
            <Typography>{category.name}</Typography>
          ))} */}

          {/* {menus?.map((menu) => (
            <Typography>{menu.name}</Typography>
          ))} */}
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
          {/* {productsOfMenu?.map((product) => (
            <Typography>{product.name}</Typography>
          ))} */}
          <ProductsForWeekly />
        </Box>
      </Box>

      {/* Sales Bereich */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          height: "200vh",
          // height: "100%",
          backgroundColor: "#000",
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
          Sales
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
            Info Tab for Sales
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
      </Box>

      {/* Deals Bereich */}
      <Box
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
      </Box>

      {/* Menu Bereich */}
      <Box
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
      </Box>
    </Box>
  );
};

HomePageNewOwner.propTypes = {};

export default HomePageNewOwner;
