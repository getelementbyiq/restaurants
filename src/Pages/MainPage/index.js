import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { UserAuth } from "../../Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../Redux/thunks/getUserById";
import MainPageOwner from "../Owner/MainPage";
import MainPageNUser from "../NUser/MainPage";

const Main = (props) => {
  const dispatch = useDispatch();
  const { user } = UserAuth();
  const userId = user.uid;
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;
  console.log("userId", userId);
  console.log("userData", userData);
  console.log("currentUserData", currentUserData);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  return (
    <Box>
      {userData && userData.userType === "ownerUser" ? (
        <MainPageOwner />
      ) : (
        <MainPageNUser />
      )}
    </Box>
  );
};

export default Main;
