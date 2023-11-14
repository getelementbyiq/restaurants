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
import Main from "./Pages/MainPage";
import ProtectedRoute from "./Protection/ProtectedRoute/index";
import CreateLocal from "./Pages/CreateLocal";
import Local from "./Pages/Local";
import Items from "./Pages/Items";

const Root = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<SignIn />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="main"
        element={
          <ProtectedRoute>
            <Main />
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
      <Route
        path="createItems"
        element={
          <ProtectedRoute>
            <Items />
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
