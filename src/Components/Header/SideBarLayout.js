import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SideBarOwner from "./SideBarOwner";
import SideBar from "./SideBar";

const SideBarLayout = (props) => {
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData?.user;
  return (
    <>{userData?.userType === "ownerUser" ? <SideBarOwner /> : <SideBar />}</>
  );
};

SideBarLayout.propTypes = {};

export default SideBarLayout;
