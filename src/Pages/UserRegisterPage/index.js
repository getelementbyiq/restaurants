import React from "react";
import PropTypes from "prop-types";
import SignInUser from "../../Auth/SignInUser";
import { Box } from "@mui/material";
import SignUpUser from "../../Auth/SignUpUser";

const UserRegisterPage = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SignInUser />
      <SignUpUser />
    </Box>
  );
};

UserRegisterPage.propTypes = {};

export default UserRegisterPage;
