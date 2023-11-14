import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import Likes from "../../assets/icons/likeee.svg";
import Liked from "../../assets/icons/liked.svg";

const LikeComponent = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const [likes, setLikes] = useState(145);
  const handleLikes = () => {
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    setIsLiked((open) => !open);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <IconButton onClick={handleLikes} sx={{ width: "24px", height: "24px" }}>
        <img
          src={isLiked ? Liked : Likes}
          alt=""
          style={{
            height: !isLiked ? "20px" : "24px",
            width: !isLiked ? "20px" : "24px",
          }}
        />
      </IconButton>
      <Typography
        sx={{
          fontSize: "12px",
          color: !isLiked ? "#fff" : "#fff",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: "1",
        }}
      >
        {likes}
      </Typography>
    </Box>
  );
};

export default LikeComponent;
