import React, { useEffect } from "react";

import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/thunks/getUserById";

//Import Icons
import Add from "../../assets/icons/add.svg";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";
import OwnerHeader from "./OwnerHeader";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";
import OwnerHeaderWithoutRestaurant from "./OwnerHeaderWithoutRestaurant";
import OwnerHeaderFirst from "./OwnerHeaderFirst";

const Header = (props) => {
  const dispatch = useDispatch();
  const { user } = UserAuth();
  const localData = useSelector((state) => state.localData);
  const isCreated = useSelector((state) => state.restaurantIsCreated);
  const userId = user?.uid;
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;
  console.log("userId", userId);
  console.log("userData", userData);
  console.log("currentUserData", currentUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
      dispatch(
        setRestaurantField({
          field: "userId",
          value: userId,
        })
      );
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  const goTo = () => {
    navigate("/main");
  };

  return userData && userData.userType === "ownerUser" ? (
    localData ? (
      <OwnerHeader />
    ) : (
      <OwnerHeaderFirst />
    )
  ) : (
    <UserHeader />
  );
};

Header.propTypes = {};

export default Header;
