import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { setLocalNavState } from "../../Redux/functions/slices/LocalNavState";
import { useDispatch } from "react-redux";

const LocalsNavbar = (data) => {
  const dispatch = useDispatch();
  const id = useParams();
  const local = id.locals;
  const location = useLocation();
  const [navState, setNavState] = useState();

  useEffect(() => {
    if (location.pathname.includes(local)) {
      setNavState("home");
    }
  }, [local, location]);

  const goTo = (txt) => {
    setNavState(txt);
  };
  useEffect(() => {
    if (navState) {
      dispatch(setLocalNavState(navState));
    }
  }, [navState]);

  console.log("data from nav", data);
  return (
    <Box
      sx={{
        display: "flex",
        px: "64px",
        py: "8px",
        border: "1px silid red",
        gap: "8px",
      }}
    >
      <Box
        onClick={() => goTo("home")}
        sx={{
          px: "8px",
          py: "4px",
          borderRadius: "32px",
          "&&:hover": {
            backgroundColor: "#444444",
            color: "#fff",
          },
          background: navState === "home" ? "#444444" : "fff",
          cursor: "pointer",
          color: navState === "home" ? "#fff" : "444444",
          transition: "150ms",
        }}
      >
        <Typography>{data.data.name}</Typography>
      </Box>
      <Box
        onClick={() => goTo("story")}
        sx={{
          px: "8px",
          py: "4px",
          borderRadius: "32px",
          "&&:hover": {
            backgroundColor: "#444444",
            color: "#fff",
          },
          background: navState === "story" ? "#444444" : "fff",
          cursor: "pointer",
          transition: "150ms",
          color: navState === "story" ? "#fff" : "444444",
        }}
      >
        <Typography>Our Story</Typography>
      </Box>
      <Box
        onClick={() => goTo("team")}
        sx={{
          px: "8px",
          py: "4px",
          borderRadius: "32px",
          "&&:hover": {
            backgroundColor: "#444444",
            color: "#fff",
          },
          background: navState === "team" ? "#444444" : "fff",
          cursor: "pointer",
          transition: "150ms",
          color: navState === "team" ? "#fff" : "444444",
        }}
      >
        <Typography>Team</Typography>
      </Box>
      <Box
        onClick={() => goTo("contact")}
        sx={{
          px: "8px",
          py: "4px",
          borderRadius: "32px",
          "&&:hover": {
            backgroundColor: "#444444",
            color: "#fff",
          },
          background: navState === "contact" ? "#444444" : "fff",
          cursor: "pointer",
          transition: "150ms",
          color: navState === "contact" ? "#fff" : "444444",
        }}
      >
        <Typography>Contact</Typography>
      </Box>
      <Box
        onClick={() => goTo("career")}
        sx={{
          px: "8px",
          py: "4px",
          borderRadius: "32px",
          "&&:hover": {
            backgroundColor: "#444444",
            color: "#fff",
          },
          background: navState === "career" ? "#444444" : "fff",
          color: navState === "career" ? "#fff" : "444444",
          transition: "150ms",
          cursor: "pointer",
        }}
      >
        <Typography>Career</Typography>
      </Box>
    </Box>
  );
};

LocalsNavbar.propTypes = {};

export default LocalsNavbar;
