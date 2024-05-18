import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

const OtherDealTemplate = (props) => {
  let [number, setNumber] = useState(23);
  const handleNumber = () => {
    setNumber(number+1);
  };
  const handleNumberTwo = () => {
    setNumber(number-1);
    console.log("setNumber", number)
  };
  return (
    <div>
      <Button onClick={handleNumber}>Add Number </Button>
      <Button onClick={handleNumberTwo}>Minus Number </Button>
      <Typography>{number}</Typography>
    </div>
  );
};


export default OtherDealTemplate;
