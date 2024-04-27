import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const TimeLine = (props) => {
  const getCurrentHour = () => {
    const now = new Date();
    return now.getHours();
  };

  const isHighlightedHour = (hour) => {
    // Hier kannst du die Bedingung für die markierten Stunden setzen
    return hour >= 9 && hour < 10;
  };

  const renderTimeIntervals = () => {
    const intervals = [];
    for (let i = 0; i < 24; i++) {
      const isHighlighted = isHighlightedHour(i);
      const hour = i < 10 ? `0${i}` : i;
      const nextHour = i + 1 < 10 ? `0${i + 1}` : i + 1;
      const timeString = `${hour}:00 - ${nextHour}:00`;

      intervals.push(
        <Typography key={i} color={isHighlighted ? "red" : "inherit"}>
          {timeString}
        </Typography>
      );
    }
    return intervals;
  };

  return <Box>{renderTimeIntervals()}</Box>;
};

TimeLine.propTypes = {};

export default TimeLine;
