import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserAuth } from "../../Auth/Auth";

const AuthComponent = (props) => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;
  const goTo = (txt) => {
    navigate(txt);
  };
  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        heigth: "50px",
        alignItems: "center",
        pt: "8px",
        width: "25%",
        justifyContent: "space-between",
      }}
    >
      {!user && (
        <>
          <Typography onClick={() => goTo("/owners")}>I'm owner</Typography>
          <Typography onClick={() => goTo("/foodies")}>I'm Foooodie</Typography>
        </>
      )}
    </Box>
  );
};

AuthComponent.propTypes = {};

export default AuthComponent;
