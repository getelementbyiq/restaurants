import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import SignIn from "./Auth/SignIn";
import Signup from "./Auth/SignUp";
import { Provider } from "react-redux";
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

const Root = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="owners" element={<OwnerRegisterPage />} />
      <Route path="foodies" element={<UserRegisterPage />} />
      <Route path="foods" element={<FoodsPage />} />
      <Route path="/:locals" element={<LocalsPage />} />
      <Route path="/:locals/:categoryType/:menu/:id" element={<HomePage />} />
      <Route path="/:locals/foods" element={<FoodPage />} />
      <Route path="/:locals/drinks" element={<FoodPage />} />
      <Route path="/:locals/offers" element={<FoodPage />} />
      <Route path="/:locals/daily" element={<FoodPage />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<Signup />} />
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
        index
        element={
          <ProtectedRoute>
            <Locals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/locals/:id"
        element={
          <ProtectedRoute>
            <LocalsLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/locals/:id/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locals/:id/offers"
          element={
            <ProtectedRoute>
              <Offers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locals/:id/story"
          element={
            <ProtectedRoute>
              <Story />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locals/:id/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locals/:id/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locals/:id/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locals/:id/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locals/:id/adresse"
          element={
            <ProtectedRoute>
              <Adresse />
            </ProtectedRoute>
          }
        />
      </Route>
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
