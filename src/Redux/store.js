import { configureStore } from "@reduxjs/toolkit";
import userByIdReducer from "./slices/userByIdSlice";
import openFirstReducer from "./functions/slices/OpenFirst";
import createLocalReducer from "./slices/createLocalSlice";
import openSecondReducer from "./functions/slices/OpenSecond";
import openThirdReducer from "./functions/slices/OpenThird";
import openForthReducer from "./functions/slices/OpenForth";
import showReducer from "./functions/slices/Show";
import isCreatedReducer from "./functions/slices/RestaurantIsCreated";
import haveRestaurantReducer from "./functions/slices/haveRestaurant";
import localDataReducer from "./functions/slices/LocalDataFromFirestore";

const store = configureStore(
  {
    reducer: {
      userById: userByIdReducer,
      createRestaurant: createLocalReducer,
      //functions states creation of restaurant step by step
      show: showReducer,
      openFirst: openFirstReducer,
      openSecond: openSecondReducer,
      openThird: openThirdReducer,
      openForth: openForthReducer,
      isCreated: isCreatedReducer,
      haveRestaurant: haveRestaurantReducer,
      localData: localDataReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
