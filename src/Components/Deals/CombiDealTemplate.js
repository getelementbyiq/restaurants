import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Box, Button, Input, Typography } from "@mui/material";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const CombiDealTemplate = (props) => {
  const { menuId } = useParams();
  const [sumeOfProducts, setSumeOfProducts] = useState();
  const [value, setValue] = useState();
  const [differenceInPrecentage, setDifferenceInPrecentage] = useState();

  const productsOfDeal = useSelector(
    (state) => state.productsFetchSlice.productsOfDeals.data
  );
  const deal = useSelector((state) =>
    state?.fetchDeals?.dealsData?.find((deal) => deal?.id === menuId)
  );

  const stringPriceToNumber = (stringPrice) => {
    // Entferne das Komma aus dem Preisstring und parse ihn in eine Zahl
    return parseFloat(stringPrice.replace(",", "."));
  };

  const sumProductPrices = (products) => {
    // Reduktionsfunktion, um die Preise der Produkte zu summieren
    return products?.reduce((total, product) => {
      // Verwende die Funktion stringPriceToNumber, um den Preis von String in Number umzuwandeln
      const price = stringPriceToNumber(product.price);
      // Addiere den Preis zum Gesamtwert hinzu
      return total + price;
    }, 0); // Startwert für die Summe ist 0
  };
  console.log("summeOfProducts", sumeOfProducts);
  const differenceDefinder = (event) => {
    const value = event.target.value; // Korrigiert: "targer" zu "target"
    setValue(value);
    const precentage = (value * 100) / sumeOfProducts;
    setDifferenceInPrecentage(precentage);
  };
  useEffect(() => {
    setSumeOfProducts(sumProductPrices(productsOfDeal));
  }, [productsOfDeal]);

  const handleProductClick = async () => {
    try {
      // Referenz zum Menüdokument in der "menus" Collection
      const menuDocRef = doc(db, "menus", menuId);

      // Aktualisiere das Menüdokument und füge die productId zur productIds-Liste hinzu
      await updateDoc(menuDocRef, {
        newPrice: value ? value : null,
      });
      console.log(
        ` Dealsytype und NewPrice wurde erfolgreich zum Deals hinzugefügt. new Price ${value}`
      );
    } catch (error) {
      console.error("Fehler beim Hinzufügen der productId zum Menü:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
      }}
    >
      {productsOfDeal?.map((product, index) => (
        <Typography key={index}>
          {stringPriceToNumber(product.price)}
        </Typography>
      ))}
      <Typography>{sumeOfProducts}</Typography>

      <Input
        placeholder={deal?.newPrice ? `${deal?.newPrice}` : "New price"}
        type="number"
        onChange={differenceDefinder}
      />
      {value && sumeOfProducts > value && (
        <Typography>{-100 + differenceInPrecentage}</Typography>
      )}
      {value && sumeOfProducts < value && (
        <Typography>{-(100 - differenceInPrecentage)}</Typography>
      )}
      {!value && sumeOfProducts > deal?.newPrice && (
        <Typography>{-100 + differenceInPrecentage}</Typography>
      )}
      {!value && sumeOfProducts < deal?.newPrice && (
        <Typography>{-(100 - differenceInPrecentage)}</Typography>
      )}
      {!value && <Typography>100</Typography>}

      <Button onClick={handleProductClick}>Save</Button>
    </Box>
  );
};

CombiDealTemplate.propTypes = {
  // Sie können hier die PropTypes definieren, falls erforderlich
};

export default CombiDealTemplate;
