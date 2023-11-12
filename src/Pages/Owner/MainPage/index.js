import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetBackGround from "../../../Components/CreateRestaurant/SetBackgroundFoto";
import SetNameLogo from "../../../Components/CreateRestaurant/NameLogo";
import SetAddress from "../../../Components/CreateRestaurant/SetAdress";
import "./index.css";
import Art from "../../../Components/Art";
import { uploadImagesToFirestore } from "../../../Redux/slices/createLocalSlice";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { setIsCreated } from "../../../Redux/functions/slices/RestaurantIsCreated";
import { setHaveRestaurant } from "../../../Redux/functions/slices/haveRestaurant";

const MainPageOwner = (props) => {
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  console.log(
    "restaurant data from Mainpage owner----<<<<<<<<<<",
    createRestaurantData
  );

  const dispatch = useDispatch();
  const show = useSelector((state) => state.show);
  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);
  const openThird = useSelector((state) => state.openThird);
  const openForth = useSelector((state) => state.openForth);
  const isCreated = useSelector((state) => state.isCreated);
  const haveRestaurant = useSelector((state) => state.haveRestaurant);

  console.log("ist created vorher üüüüüüüüüü", isCreated);
  console.log("hat ein restaurant vorher äääääääää", haveRestaurant);

  // const handleUpload = async () => {
  //   if (
  //     createRestaurantData &&
  //     createRestaurantData.logo &&
  //     createRestaurantData.background
  //   ) {
  //     await dispatch(uploadImagesToFirestore(createRestaurantData));
  //   } else {
  //     console.log("Keine Restaurantdaten oder Blobs vorhanden.");
  //   }
  // };
  const handleUpload = async () => {
    // Umwandeln von background und logo in Blobs
    const logoBlob = new Blob([createRestaurantData.logo]);
    const backgroundBlob = new Blob([createRestaurantData.background]);
    const storage = getStorage();
    const imagesRef = ref(storage, "restaurants");

    const {
      name,
      street,
      houseNumber,
      city,
      art,
      userId,
      followers,
      createdAt,
    } = createRestaurantData;
    // Erstellen Sie Referenzen für Logo und Hintergrundbild
    const logoRef = ref(imagesRef, `${name}_logo.jpg`);
    const backgroundRef = ref(imagesRef, `${name}_background.jpg`);

    try {
      // Laden Sie das Logo hoch
      await uploadBytes(logoRef, logoBlob);

      // Laden Sie das Hintergrundbild hoch
      await uploadBytes(backgroundRef, backgroundBlob);

      // Fügen Sie die Restaurantdaten zur Firestore-Datenbank hinzu
      const logoUrl = await getDownloadURL(logoRef);
      const backgroundUrl = await getDownloadURL(backgroundRef);
      const restaurantCollectionRef = collection(db, "restaurants");
      await addDoc(restaurantCollectionRef, {
        name,
        logo: logoUrl,
        background: backgroundUrl,
        street,
        houseNumber,
        city,
        art,
        userId,
        followers,
        createdAt,
      });
      dispatch(setIsCreated(!isCreated));

      dispatch(setHaveRestaurant());
      console.log("Restaurantdaten erfolgreich in Firestore hochgeladen.");
    } catch (error) {
      console.error(
        "Fehler beim Hochladen der Bilder oder Speichern der Daten:",
        error
      );
    }
  };

  return (
    <Box sx={{ px: "40px", height: "89vh" }}>
      {openFirst && <SetNameLogo />}
      {openSecond && <SetBackGround />}
      {openThird && <SetAddress />}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Art />
      </Box>
      <Button onClick={handleUpload}>Create restaurant</Button>
    </Box>
  );
};

export default MainPageOwner;
