import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { setSaleDealValue } from "../../Redux/immigration/globalStates/globalStatesSlice";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { timeToNumericFormat } from "../AAATimeToNum/TimeToNum";

const SaleTemplate = (props) => {
  const { menuId } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  // const stringPriceToNumber = (stringPrice) => {
  //   return parseFloat(stringPrice.replace(",", "."));
  // };

  const differenceDefinder = (event) => {
    const value = event.target.value; // Korrigiert: "targer" zu "target"
    setValue(value);
  };
  useEffect(() => {
    dispatch(setSaleDealValue(value));
  }, [value]);

  const handleProductClick = async () => {
    try {
      // Referenz zum Menüdokument in der "menus" Collection
      const menuDocRef = doc(db, "menus", menuId);

      // Aktualisiere das Menüdokument und füge die productId zur productIds-Liste hinzu
      await updateDoc(menuDocRef, {
        discount: value ? value : null,
        offerStart: from,
        offerEnd: to,
      });
      console.log(
        "Dealsytype und Discount wurde erfolgreich zum Deals hinzugefügt."
      );
    } catch (error) {
      console.error("Fehler beim Hinzufügen der productId zum Menü:", error);
    }
  };

  console.log("valueagssse", from, to);

  const handleChangeFrom = (event) => {
    setFrom(timeToNumericFormat(event.target.value));
  };
  const handleChangeTo = (event) => {
    setTo(timeToNumericFormat(event.target.value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
      }}
    >
      <Input
        placeholder="Prozent"
        type="number"
        onChange={differenceDefinder}
      />
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          my: "16px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Von</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={from}
            label="Von"
            onChange={handleChangeFrom}
          >
            <MenuItem value={"01:00"}>01:00</MenuItem>
            <MenuItem value={"02:00"}>02:00</MenuItem>
            <MenuItem value={"03:00"}>03:00</MenuItem>
            <MenuItem value={"04:00"}>04:00</MenuItem>
            <MenuItem value={"05:00"}>05:00</MenuItem>
            <MenuItem value={"06:00"}>06:00</MenuItem>
            <MenuItem value={"07:00"}>07:00</MenuItem>
            <MenuItem value={"08:00"}>08:00</MenuItem>
            <MenuItem value={"09:00"}>09:00</MenuItem>
            <MenuItem value={"10:00"}>10:00</MenuItem>
            <MenuItem value={"11:00"}>11:00</MenuItem>
            <MenuItem value={"12:00"}>12:00</MenuItem>
            <MenuItem value={"13:00"}>13:00</MenuItem>
            <MenuItem value={"14:00"}>14:00</MenuItem>
            <MenuItem value={"15:00"}>15:00</MenuItem>
            <MenuItem value={"16:00"}>16:00</MenuItem>
            <MenuItem value={"17:00"}>17:00</MenuItem>
            <MenuItem value={"18:00"}>18:00</MenuItem>
            <MenuItem value={"19:00"}>19:00</MenuItem>
            <MenuItem value={"20:00"}>20:00</MenuItem>
            <MenuItem value={"21:00"}>21:00</MenuItem>
            <MenuItem value={"22:00"}>22:00</MenuItem>
            <MenuItem value={"23:00"}>23:00</MenuItem>
            <MenuItem value={"24:00"}>24:00</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Bis</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={to}
            label="Bis"
            onChange={handleChangeTo}
          >
            <MenuItem value={"01:00"}>01:00</MenuItem>
            <MenuItem value={"02:00"}>02:00</MenuItem>
            <MenuItem value={"03:00"}>03:00</MenuItem>
            <MenuItem value={"04:00"}>04:00</MenuItem>
            <MenuItem value={"05:00"}>05:00</MenuItem>
            <MenuItem value={"06:00"}>06:00</MenuItem>
            <MenuItem value={"07:00"}>07:00</MenuItem>
            <MenuItem value={"08:00"}>08:00</MenuItem>
            <MenuItem value={"09:00"}>09:00</MenuItem>
            <MenuItem value={"10:00"}>10:00</MenuItem>
            <MenuItem value={"11:00"}>11:00</MenuItem>
            <MenuItem value={"12:00"}>12:00</MenuItem>
            <MenuItem value={"13:00"}>13:00</MenuItem>
            <MenuItem value={"14:00"}>14:00</MenuItem>
            <MenuItem value={"15:00"}>15:00</MenuItem>
            <MenuItem value={"16:00"}>16:00</MenuItem>
            <MenuItem value={"17:00"}>17:00</MenuItem>
            <MenuItem value={"18:00"}>18:00</MenuItem>
            <MenuItem value={"19:00"}>19:00</MenuItem>
            <MenuItem value={"20:00"}>20:00</MenuItem>
            <MenuItem value={"21:00"}>21:00</MenuItem>
            <MenuItem value={"22:00"}>22:00</MenuItem>
            <MenuItem value={"23:00"}>23:00</MenuItem>
            <MenuItem value={"24:00"}>24:00</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button onClick={handleProductClick}>Save</Button>
    </Box>
  );
};

SaleTemplate.propTypes = {};

export default SaleTemplate;
