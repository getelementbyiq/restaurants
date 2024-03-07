import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, IconButton } from "@mui/material";

const SearchComponent = (props) => {
  return (
    <Grid>
      <IconButton>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16663 16.667C13.3088 16.667 16.6666 13.3091 16.6666 9.16699C16.6666 5.02486 13.3088 1.66699 9.16663 1.66699C5.02449 1.66699 1.66663 5.02486 1.66663 9.16699C1.66663 13.3091 5.02449 16.667 9.16663 16.667Z"
            stroke="#444444"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.7749 17.2413C16.2166 18.5747 17.2249 18.708 17.9999 17.5413C18.7082 16.4747 18.2416 15.5997 16.9582 15.5997C16.0082 15.5913 15.4749 16.333 15.7749 17.2413Z"
            stroke="#444444"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconButton>
    </Grid>
  );
};

SearchComponent.propTypes = {};

export default SearchComponent;
