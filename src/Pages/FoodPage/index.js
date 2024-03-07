import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import {
  setCategoryType,
  setFoodId,
  setMenuData,
  setMenuId,
  setProductsData,
  setRestaurantData,
  setRestaurantId,
} from "../../Redux/slices/onerestaurantData";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ProductHomePage from "../../Components/ProductHomePage";
import ProductView from "../../Components/ProductView";
import { Scrollbar } from "react-scrollbars-custom";
import { AnimatePresence, motion } from "framer-motion";
import ClassicProduct from "../../Components/ClassicProduct";
import { indexedDBLocalPersistence } from "firebase/auth";
import CombinedProduct from "../../Components/CombinedProduct";

const FoodPage = (props) => {
  const id = useParams();
  const dispatch = useDispatch();
  console.log("food id", id);
  const restaurantId = id.locals;
  const menuId = id?.menu;
  const foodId = id.id;
  const categoryType = id.categoryType;
  const [choosedCategoryId, setChoosenCategoryId] = useState(menuId);
  const location = useLocation();
  const [selectedId, setSelectedId] = useState(null);
  const restaurantData = useSelector((state) => state.oneRestaurantData);
  console.log("location now", location.pathname);
  const currentProduct = restaurantData.productsData.find(
    (product) => product.id === foodId
  );
  const productsWithoutCurrent = restaurantData.productsData.filter(
    (product) => product.id !== foodId
  );

  console.log("currentProduct", restaurantData.productsData);
  console.log("productsWithoutCurrent", productsWithoutCurrent);
  console.log("choosedCategoryId", choosedCategoryId);
  // useEffect(() => {
  //   menuId && setChoosenCategoryId(menuId);
  // }, [menuId]);

  const fetchProductsOfMenu = (id) => {
    setChoosenCategoryId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const restaurantRef = doc(db, "restaurants", restaurantId);
      const retaurantData = await getDoc(restaurantRef);
      console.log("restaurant data", retaurantData.data());
      dispatch(setRestaurantData(retaurantData.data()));

      const menuRef = collection(db, "restaurants", restaurantId, categoryType);
      const menuSnapshot = await getDocs(menuRef);
      const menuData = menuSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("menu data", menuData);
      dispatch(setMenuData(menuData));
      const productRef = collection(
        db,
        "restaurants",
        restaurantId,
        categoryType,
        choosedCategoryId,
        "products"
      );
      const productSnapshot = await getDocs(productRef);
      const productsData = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setProductsData(productsData));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const productRef = collection(
        db,
        "restaurants",
        restaurantId,
        categoryType,
        choosedCategoryId,
        "products"
      );
      const productSnapshot = await getDocs(productRef);
      const productsData = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setProductsData(productsData));
    };
    fetchData();
  }, [choosedCategoryId]);

  useEffect(() => {
    if (restaurantId && menuId && foodId && categoryType) {
      dispatch(setRestaurantId(restaurantId));
      dispatch(setMenuId(menuId));
      dispatch(setFoodId(foodId));
      dispatch(setCategoryType(categoryType));
    }
  }, [restaurantId, menuId, foodId, categoryType]);

  const [menuState, setMenuState] = useState("visuell");
  console.log("menuState", menuState);
  const handleOpenNav = (txt) => {
    setMenuState(txt);
  };
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexGrow: "1",
        border: "1px solid blue",
        pb: "16px",
      }}
    >
      <Grid
        item
        xs={2}
        md={2}
        sx={{ px: "8px", display: "flex", flexDirection: "column", gap: "8px" }}
      >
        {restaurantData.menuData.map((menu, index) => (
          <Box
            onClick={() => fetchProductsOfMenu(menu.id)}
            key={index}
            sx={{
              px: "24px",
              py: "8px",
              borderRadius: "24px",
              background: choosedCategoryId === menu.id ? "#936FF9" : "#F9F9F9",
              cursor: "pointer",
              "&&:hover": {
                background: "#CEC0F8",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Noto Sans",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              {menu.name}
            </Typography>
          </Box>
        ))}
      </Grid>
      <Grid item xs={10} md={10} sx={{ display: "flex" }}>
        <Grid container sx={{ display: "flex", flexGrow: "1" }}>
          <Grid
            item
            xs={currentProduct ? 8 : 12}
            md={currentProduct ? 8 : 12}
            sx={{
              // border: "1px solid red",
              display: "flex",
              transition: "150px",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {currentProduct && (
              <Box
                sx={{
                  display: "flex",
                  // border: "3px solid yellow",
                  height: "50%",
                  // backgroundColor: "#FF975D",
                  flexDirection: "column",
                  px: "32px",
                }}
              >
                {currentProduct && (
                  <Box
                    sx={{
                      display: "flex",
                      // border: "1px solid blue",
                      flexGrow: "1",
                      flexDirection: "column",
                      backgroundColor: "#F9F9F9",
                      px: "16px",
                      py: "8px",
                      borderRadius: "32px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        // border: "1px solid blue",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Noto Sans",
                          fontWeight: "800",
                          fontSize: "32px",
                        }}
                      >
                        {currentProduct.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Noto Sans",
                          fontWeight: "800",
                          fontSize: "32px",
                        }}
                      >
                        {currentProduct.price}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        // border: "1px solid blue",
                        flexGrow: "1",
                        pl: "32px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Noto Sans",
                          fontWeight: "200",
                          fontSize: "16px",
                        }}
                      >
                        {currentProduct.description}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        // border: "1px solid blue",
                        gap: "8px",
                        flexWrap: "wrap",
                        mb: "8px",
                      }}
                    >
                      {Object.values(currentProduct.items).map((item) => (
                        <Box
                          sx={{
                            px: "16px",
                            py: "4px",
                            borderRadius: "16px",
                            backgroundColor: "#444444",
                          }}
                        >
                          <Typography sx={{ color: "#fff" }}>{item}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}
            <Box
              sx={{
                flexGrow: "1",
                display: "flex",
                borderRadius: "32px",
                overflow: "hidden",
                px: "32px",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  dusplay: "flex",
                  width: "100%",
                  // border: "1px solid red",
                }}
              >
                <Box
                  sx={{
                    // border: "1px solid yellow",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      // border: "1px solid blue",
                      // maxWidth: "100%",
                    }}
                  >
                    <Tooltip
                      title="Visuell Menu"
                      placement="top"
                      color="#936FF9"
                    >
                      <IconButton
                        onClick={() => handleOpenNav("visuell")}
                        sx={{
                          backgroundColor:
                            menuState === "visuell" ? "#000" : "#fff",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                            stroke={
                              menuState === "visuell" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                            stroke={
                              menuState === "visuell" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.66992 18.9501L7.59992 15.6401C8.38992 15.1101 9.52992 15.1701 10.2399 15.7801L10.5699 16.0701C11.3499 16.7401 12.6099 16.7401 13.3899 16.0701L17.5499 12.5001C18.3299 11.8301 19.5899 11.8301 20.3699 12.5001L21.9999 13.9001"
                            stroke={
                              menuState === "visuell" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Combined Menu" placement="top">
                      <IconButton
                        onClick={() => handleOpenNav("combined")}
                        sx={{
                          backgroundColor:
                            menuState === "combined" ? "#000" : "#fff",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                            stroke={
                              menuState === "combined" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17.5004 17.0801H15.6504"
                            stroke={
                              menuState === "combined" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.97 17.0801H6.5"
                            stroke={
                              menuState === "combined" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17.4997 13.3201H11.9697"
                            stroke={
                              menuState === "combined" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.27 13.3201H6.5"
                            stroke={
                              menuState === "combined" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.33008 8C9.43465 8 10.3301 7.10457 10.3301 6C10.3301 4.89543 9.43465 4 8.33008 4C7.22551 4 6.33008 4.89543 6.33008 6C6.33008 7.10457 7.22551 8 8.33008 8Z"
                            stroke={
                              menuState === "combined" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2 12L6.84584 9.61956C7.62235 9.2384 8.74289 9.28155 9.44077 9.72024L9.76513 9.9288C10.5318 10.4106 11.7703 10.4106 12.537 9.9288L16.626 7.36138C17.3927 6.87954 18.6311 6.87954 19.3978 7.36138L21 8.36821"
                            stroke={
                              menuState === "combined" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Classic Menu" placement="top">
                      <IconButton
                        onClick={() => handleOpenNav("classic")}
                        sx={{
                          backgroundColor:
                            menuState === "classic" ? "#000" : "#fff",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 4.5H21"
                            stroke={
                              menuState === "classic" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.25977 9.5H16.7398"
                            stroke={
                              menuState === "classic" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3 14.5H21"
                            stroke={
                              menuState === "classic" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.25977 19.5H16.7398"
                            stroke={
                              menuState === "classic" ? "#fff" : "#292D32"
                            }
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  borderRadius: "32px",
                  // border: "1px solid red",
                  display: "flex",
                  flexGrow: "1",
                  overflow: "hidden",
                  justifyContent: "center",
                }}
              >
                {currentProduct
                  ? menuState === "visuell" && (
                      <Scrollbar>
                        <Grid container>
                          {restaurantData.productsData.map((product, index) => (
                            <Grid
                              key={index}
                              item
                              xs={4}
                              md={4}
                              lg={4}
                              sx={{ p: "8px" }}
                            >
                              <ProductHomePage product={product} />
                            </Grid>
                          ))}
                        </Grid>
                      </Scrollbar>
                    )
                  : menuState === "visuell" && (
                      <Scrollbar>
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            // border: "1px solid red",
                            px: "4px",
                          }}
                        >
                          {[0, 1, 2].map((columnIndex) => (
                            <Grid
                              key={columnIndex}
                              item
                              xs={12} // Nur eine Spalte für xs-Bildschirme
                              sm={6} // Zwei Spalten für sm-Bildschirme
                              md={4} // Drei Spalten für md-Bildschirme
                              lg={4} // Drei Spalten für lg-Bildschirme
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: "1",
                              }}
                            >
                              {restaurantData.productsData.map(
                                (product, index) => {
                                  if (index % 3 === columnIndex) {
                                    let height;
                                    if (index % 3 === 0) {
                                      height = [300, 220][
                                        Math.floor(index / 3) % 2
                                      ];
                                    } else if (index % 3 === 1) {
                                      height = [250, 300][
                                        Math.floor(index / 3) % 2
                                      ];
                                    } else if (index % 3 === 2) {
                                      height = [300, 280][
                                        Math.floor(index / 3) % 2
                                      ];
                                    }
                                    return (
                                      <Box
                                        key={product.id}
                                        sx={{
                                          p: "4px",
                                          height: `${height}px`,
                                        }}
                                      >
                                        {console.log(product)}
                                        <ProductHomePage
                                          key={product.id}
                                          product={product}
                                        />
                                      </Box>
                                    );
                                  } else {
                                    return null;
                                  }
                                }
                              )}
                            </Grid>
                          ))}
                        </Grid>
                      </Scrollbar>
                    )}
                {menuState === "combined" && (
                  <Scrollbar>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        // border: "1px solid red",
                        flexGrow: "1",
                        gap: "16px",
                      }}
                    >
                      {restaurantData.productsData.map((product, index) => (
                        <Box key={index} sx={{ width: "50%" }}>
                          <CombinedProduct product={product} />
                        </Box>
                      ))}
                    </Box>
                  </Scrollbar>
                )}
                {menuState === "classic" && (
                  <Scrollbar>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        // border: "1px solid red",
                        flexGrow: "1",
                        gap: "16px",
                      }}
                    >
                      {restaurantData.productsData.map((product, index) => (
                        <Box key={index} sx={{ width: "50%" }}>
                          <ClassicProduct product={product} />
                        </Box>
                      ))}
                    </Box>
                  </Scrollbar>
                )}
              </Box>
            </Box>
          </Grid>
          {currentProduct && (
            <Grid
              item
              xs={currentProduct ? 4 : 0}
              md={currentProduct ? 4 : 0}
              sx={{ px: "8px", flexGrow: "1" }}
            >
              {currentProduct && <ProductView product={currentProduct} />}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

FoodPage.propTypes = {};

export default FoodPage;
