import { configureStore } from "@reduxjs/toolkit";
import userByIdReducer from "./slices/userByIdSlice";
import createRestaurantStateReducer from "./functions/slices/OpenFirst";
import createLocalReducer from "./slices/createLocalSlice";
import openSecondReducer from "./functions/slices/OpenSecond";
import openThirdReducer from "./functions/slices/OpenThird";
import openForthReducer from "./functions/slices/OpenForth";
import showReducer from "./functions/slices/Show";
import isCreatedReducer from "./functions/slices/RestaurantIsCreated";
import haveRestaurantReducer from "./functions/slices/haveRestaurant";
import localDataReducer from "./functions/slices/LocalDataFromFirestore";
import drinksActiveReducer from "./functions/slices/DrinksActive";
import foodActiveReducer from "./functions/slices/FoodActive";
import categoryActiveReducer from "./functions/slices/CategoryActive";
import setSelectedCategoryReducer from "./functions/slices/SetSelectedCategory";
import categoryDashReducer from "./functions/slices/Category/AddProducts";
import createProductReducer from "./slices/createProductSlice";
import createItemsListReducer from "./slices/ItemsList";
import fetchProductsReducer from "./slices/fetchProducts";
import settingsProductReducer from "./functions/slices/SettingsProduct";
import isCommentReducer from "./functions/slices/IsComment";
import userAllReducer from "./slices/userByIdSliceAll";
import searchResultReducer from "./functions/slices/OpenThird";
import oneRestaurantDataReducer from "./slices/onerestaurantData";
import isClickedReducer from "./slices/isClicked";
import productRefReducer from "./slices/productRefSlice";
import localNavStateReducer from "./functions/slices/LocalNavState";
import globalScrollStateReducer from "./slices/globalScrollState";
import productFullViewReducer from "./slices/productFullView";
import restaurantDataFromMainReducer from "./slices/restaurantDataFromMain";
import swiperIndexReducer from "./slices/swiperIndex";
import fetchUserSlice from "./immigration/user/userSlice";
import productSlice from "../app/features/ProductsSlice";
import productsFetchSlice from "./immigration/products/productsFetchSlice";
import productsForMainSlice from "./immigration/products/productsForMain";
import fetchRestaurantSlice from "./immigration/restaurants/restaurantFetchSlice";
import menusOfRestaurantSlice from "./immigration/menusOfRestaurant/menusOfRestaurantSlice";
import globalStateSlice from "./immigration/globalStates/globalStatesSlice";
import dealsOfRestaurantSlice from "./immigration/menusOfRestaurant/dealsOfRestaurantSlice";
import restaurantFetchSlice from "./immigration/restaurants/restaurantFetchSlice";

const store = configureStore(
  {
    reducer: {
      userById: userByIdReducer,
      createRestaurant: createLocalReducer,
      //functions states creation of restaurant step by step
      show: showReducer,
      openSecond: openSecondReducer,
      openThird: openThirdReducer,
      openForth: openForthReducer,
      isCreated: isCreatedReducer,
      haveRestaurant: haveRestaurantReducer,
      localData: localDataReducer,
      foodActive: foodActiveReducer,
      drinksActive: drinksActiveReducer,
      categoryActive: categoryActiveReducer,
      selectedCategory: setSelectedCategoryReducer,
      categoryDash: categoryDashReducer,
      createProduct: createProductReducer,
      createItemsList: createItemsListReducer,
      fetchProducts: fetchProductsReducer,
      settingsProduct: settingsProductReducer,
      isComment: isCommentReducer,
      userAll: userAllReducer,
      createRestaurantState: createRestaurantStateReducer,
      restaurants: restaurantFetchSlice,
      searchResult: searchResultReducer,
      oneRestaurantData: oneRestaurantDataReducer,
      isClicked: isClickedReducer,
      productRef: productRefReducer,
      localNavState: localNavStateReducer,
      scrollState: globalScrollStateReducer,
      productFullView: productFullViewReducer,
      restaurantDataFromMain: restaurantDataFromMainReducer,
      swiperIndex: swiperIndexReducer,
      fetchUser: fetchUserSlice,
      products: productSlice,
      productsFetchSlice: productsFetchSlice,
      productsForMain: productsForMainSlice,
      fetchRestaurants: fetchRestaurantSlice,
      fetchMenus: menusOfRestaurantSlice,
      globalStates: globalStateSlice,
      fetchDeals: dealsOfRestaurantSlice,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
