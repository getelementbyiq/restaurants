import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import SignIn from "./Auth/SignIn";
import Signup from "./Auth/SignUp";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Redux/store";
import Main from "./Pages/Main";
import ProtectedRoute from "./Protection/ProtectedRoute/index";
import CreateLocal from "./Pages/CreateLocal";
import Local from "./Pages/Local";
import Items from "./Pages/Items";
import HomePage from "./Pages/HomePage";
import OwnerRegisterPage from "./Pages/OwnerRegisterPage";
import UserRegisterPage from "./Pages/UserRegisterPage";
import IsOwner from "./Protection/IsOwner";
import HomePageNewOwner from "./Pages/HomePageNewOwner";
import Locals from "./Pages/Locals";
import Menu from "./Pages/Menu";
import LocalsLayout from "./Pages/LocalsLayout";
import Notifications from "./Pages/Notifications";
import Adresse from "./Pages/Adresse";
import ItemsData from "./Components/ItemsData";
import FoodsPage from "./Pages/FoodsPage";
import FoodPage from "./Pages/FoodPage";
import LocalsPage from "./Pages/LocalsPage";
import Offers from "./Pages/Locals/Offers";
import Story from "./Pages/Locals/Story";
import Team from "./Pages/Locals/Team";
import Contact from "./Pages/Locals/Contact";
import Jobs from "./Pages/Locals/Jobs";
import LocalsFullView from "./Pages/LocalsFullViewPage";
import SecondMainLayout from "./Layouts/SecondMainLayout/SecondMainLayout";
import PreferencesPages from "./Pages/Preferences";
import MobileLayout from "./Layouts/MobileLayout/MobileLayout";
import HomePageMobile from "./Pages/HomePageMobile";
import LocalsFullViewSecond from "./Pages/LocalsFullViewPageSecond";
import LayoutDefinder from "./Layouts/LayoutDefinder/LayoutDefinder";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import { useEffect, useState } from "react";
import CreateProductsV2 from "./Pages/CreateProductsV2/CreateProductsV2";
import {
  fetchProductsOfSaleMenu,
  fetchSaleMenus,
  selectSaleMenus,
} from "./Redux/immigration/products/productsForMainRestaurantPageSales";

const Root = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutDefinder />}>
      <Route index element={<HomePageNewOwner />} />
      {/* <Route path="owners" element={<OwnerRegisterPage />} />
      <Route path="foodies" element={<UserRegisterPage />} />
      <Route path="foods" element={<FoodsPage />} /> */}
      <Route path="/:locals" element={<HomePageNewOwner />} />
      <Route path="/second/:locals" element={<LocalsFullViewSecond />} />
      <Route path="/:locals/:categoryType/:menu/:id" element={<HomePage />} />
      <Route path="/:locals/foods" element={<FoodPage />} />
      <Route path="/:locals/drinks" element={<FoodPage />} />
      <Route path="/:locals/offers" element={<FoodPage />} />
      <Route path="/:locals/daily" element={<FoodPage />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="preferences"
        element={
          <ProtectedRoute>
            <PreferencesPages />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/:"
        element={
          <ProtectedRoute>
            <PreferencesPages />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="items"
        element={
          <ProtectedRoute>
            <ItemsData />
          </ProtectedRoute>
        }
      />
      <Route
        path="addlocation"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mylocal"
        element={
          <ProtectedRoute>
            <LocalsLayout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:porductsType"
        element={
          <ProtectedRoute>
            <CreateProductsV2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu/:categoryState"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="menu/:categoryState/:menuId"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="menu/:menuId"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/offers"
        element={
          <ProtectedRoute>
            <Offers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/offers/:dealsId"
        element={
          <ProtectedRoute>
            <Offers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/story"
        element={
          <ProtectedRoute>
            <Story />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team"
        element={
          <ProtectedRoute>
            <Team />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adresse"
        element={
          <ProtectedRoute>
            <Adresse />
          </ProtectedRoute>
        }
      />
      <Route
        path="createLocal"
        element={
          <ProtectedRoute>
            <CreateLocal />
          </ProtectedRoute>
        }
      />
      <Route
        path="restaurants/:id"
        element={
          <ProtectedRoute>
            <Local />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Root} />
    </Provider>
  );
}

export default App;
