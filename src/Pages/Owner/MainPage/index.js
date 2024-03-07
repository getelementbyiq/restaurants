import {
  Box,
  Button,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
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
import { setCreateRestaurantState } from "../../../Redux/functions/slices/OpenFirst";
import CreateRestaurantHeader from "../../../Components/CreateRestaurantHeader";

const MainPageOwner = (props) => {
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );
  // const blob = new Blob([createRestaurantData?.background]);
  console.log(
    "restaurant data from Mainpage owner----<<<<<<<<<<",
    createRestaurantData
  );

  const dispatch = useDispatch();

  const isCreated = useSelector((state) => state.isCreated);

  const createrestaurantState = useSelector(
    (state) => state.createRestaurantState
  );

  const backgroundImage = useMemo(() => {
    if (createRestaurantData && createRestaurantData.background) {
      const blob = new Blob([createRestaurantData.background]);
      return `url(${URL.createObjectURL(blob)})`;
    }
    return "none";
  }, [createRestaurantData]);
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
  const handleRegisterState = (txt) => {
    dispatch(setCreateRestaurantState(txt));
  };

  return (
    <Box
      sx={{
        px: "40px",
        display: "flex",
        // border: "1px solid red",
        flexDirection: "column",
        gap: "16px",
        backgroundImage: backgroundImage,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: "32px",
        py: "32px",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box
          onClick={() => handleRegisterState("first")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: "32px",
            py: "8px",
            borderRadius: "44px",
            // border: "1px solid red",
            width: "15%",
            background:
              createrestaurantState === "first" ? "#333333" : "#FAFAFA",
            color: createrestaurantState === "first" ? "#fff" : "#333333",
          }}
        >
          <Typography>Name & Logo</Typography>
        </Box>
        <Box
          onClick={() => handleRegisterState("second")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: "32px",
            py: "8px",
            borderRadius: "44px",
            // border: "1px solid #E9E9E9",
            width: "15%",
            background:
              createrestaurantState === "second" ? "#333333" : "#FAFAFA",
            color: createrestaurantState === "second" ? "#fff" : "#333333",
          }}
        >
          <Typography>Background</Typography>
        </Box>
        <Box
          onClick={() => handleRegisterState("third")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: "32px",
            py: "8px",
            borderRadius: "44px",
            // border: "1px solid #E9E9E9",
            width: "15%",
            background:
              createrestaurantState === "third" ? "#333333" : "#FAFAFA",
            color: createrestaurantState === "third" ? "#fff" : "#333333",
          }}
        >
          <Typography>Adresse</Typography>
        </Box>
        <Box
          onClick={() => handleRegisterState("seo")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: "32px",
            py: "8px",
            borderRadius: "44px",
            // border: "1px solid #E9E9E9",
            width: "15%",
            background: createrestaurantState === "seo" ? "#333333" : "#FAFAFA",
            color: createrestaurantState === "seo" ? "#fff" : "#333333",
          }}
        >
          <Typography>SEO</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          // border: "1px solid red",
          pb: "24px",
          pt: "16px",
          // background: "#fff",
          borderRadius: "32px",
          flexGrow: "1",
          flexDirection: "column",
          gap: "32px",
          // backgroundImage: `url(${URL.createObjectURL(blob)})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          background: "rgba(239, 239, 239, 0.4)",
          backdropFilter: "blur(3.5px)",
        }}
      >
        <CreateRestaurantHeader />
        <Box
          sx={{
            display: "flex",
            // border: "1px solid red",
            justifyContent: "center",
            flexGrow: "1",
          }}
        >
          {createrestaurantState === "first" && <SetNameLogo />}
          {createrestaurantState === "second" && <SetBackGround />}
          {createrestaurantState === "third" && <SetAddress />}
          {createrestaurantState === "seo" && <Art />}
        </Box>
      </Box>

      {/* <Button onClick={handleUpload}>Create restaurant</Button> */}
    </Box>
  );
};

export default MainPageOwner;
