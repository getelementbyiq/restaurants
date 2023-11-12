import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRestaurantField } from "../../Redux/slices/createLocalSlice";
import { setIsCreated } from "../../Redux/functions/slices/RestaurantIsCreated";
import { setHaveRestaurant } from "../../Redux/functions/slices/haveRestaurant";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import DragAndDropLogo from "../../Components/DragAndDropLogo";
import DragAndDropBg from "../../Components/DragAndDropBg";
import CreateNewLocation from "../../Components/CreateNewLocation";
import Art from "../../Components/Art";

const CreateLocal = (props) => {
  const createRestaurantData = useSelector(
    (state) => state.createRestaurant.restaurantData
  );

  console.log(
    "restaurant data from CreateLocal owner----<<<<<<<<<<",
    createRestaurantData
  );
  const currentUserData = useSelector((state) => state.userById);
  const userData = currentUserData.user;
  const openFirst = useSelector((state) => state.openFirst);
  const openSecond = useSelector((state) => state.openSecond);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef();
  console.log("userData from Header", userData);
  console.log("currentUserData from Header", currentUserData);
  const isCreated = useSelector((state) => state.isCreated);

  //   useEffect(() => {
  //     fileInputRef.current = document.createElement("input");
  //     fileInputRef.current.type = "file";
  //   }, []);

  //   const goTo = () => {
  //     navigate("/main");
  //   };
  //   const handleLogoDrop = (files) => {
  //     // Hier können Sie die Logik zum Speichern der Datei im Redux-Store implementieren
  //     if (files.length > 0) {
  //       const logo = files[0];
  //       dispatch(setRestaurantField({ field: "logo", value: logo }));
  //     }
  //   };
  //   const handleBgDrop = (files) => {
  //     // Hier können Sie die Logik zum Speichern der Datei im Redux-Store implementieren
  //     if (files.length > 0) {
  //       const logo = files[0];
  //       dispatch(setRestaurantField({ field: "background", value: logo }));
  //     }
  //   };

  //   const handleFieldChange = (field, value) => {
  //     dispatch(setRestaurantField({ field, value }));
  //   };

  //   const handleUpload = async () => {
  //     // Umwandeln von background und logo in Blobs
  //     const logoBlob = new Blob([createRestaurantData.logo]);
  //     const backgroundBlob = new Blob([createRestaurantData.background]);
  //     const storage = getStorage();
  //     const imagesRef = ref(storage, "restaurants");

  //     const {
  //       name,
  //       street,
  //       houseNumber,
  //       city,
  //       art,
  //       userId,
  //       followers,
  //       createdAt,
  //     } = createRestaurantData;
  //     // Erstellen Sie Referenzen für Logo und Hintergrundbild
  //     const logoRef = ref(imagesRef, `${name}_logo.jpg`);
  //     const backgroundRef = ref(imagesRef, `${name}_background.jpg`);

  //     try {
  //       // Laden Sie das Logo hoch
  //       await uploadBytes(logoRef, logoBlob);

  //       // Laden Sie das Hintergrundbild hoch
  //       await uploadBytes(backgroundRef, backgroundBlob);

  //       // Fügen Sie die Restaurantdaten zur Firestore-Datenbank hinzu
  //       const logoUrl = await getDownloadURL(logoRef);
  //       const backgroundUrl = await getDownloadURL(backgroundRef);
  //       const restaurantCollectionRef = collection(db, "restaurants");
  //       await addDoc(restaurantCollectionRef, {
  //         name,
  //         logo: logoUrl,
  //         background: backgroundUrl,
  //         street,
  //         houseNumber,
  //         city,
  //         art,
  //         userId,
  //         followers,
  //         createdAt,
  //       });
  //       dispatch(setIsCreated(!isCreated));

  //       dispatch(setHaveRestaurant());
  //       console.log("Restaurantdaten erfolgreich in Firestore hochgeladen.");
  //     } catch (error) {
  //       console.error(
  //         "Fehler beim Hochladen der Bilder oder Speichern der Daten:",
  //         error
  //       );
  //     }
  //   };

  return userData && userData.userType === "ownerUser" ? (
    <Box sx={{ height: "100vh" }}>
      {!openFirst && <CreateNewLocation />}
      {openFirst && !openSecond && <Art />}
      {openFirst && openSecond && <Box></Box>}
      {}
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: "40%",
          margin: "0 auto",
          gap: "8px",
          px: "32px",
          py: "16px",
          borderRadius: "32px",
          background: "#121212",
          backdropFilter: "blur(7.5px)",
        }}
      >
        <Typography>Create a location</Typography>
        <DragAndDropLogo onDrop={handleLogoDrop} />
        <DragAndDropBg onDrop={handleBgDrop} />

        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextField
            fullWidth
            placeholder="Name of Restaurant "
            sx={{ fontSize: "16px" }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: {
                borderRadius: "32px",
                background: "#fff",
                fontSize: "16px",
                background: "rgba(239, 239, 239, 0.15)",
                backdropFilter: "blur(7.5px)",
                color: "#fff",
              },
            }}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextField
            name="street"
            fullWidth
            placeholder="Street"
            sx={{ fontSize: "16px", flexGrow: 1 }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: {
                borderRadius: "32px",
                background: "#fff",
                fontSize: "16px",
                background: "rgba(239, 239, 239, 0.15)",
                backdropFilter: "blur(7.5px)",
                color: "#fff",
              },
            }}
            onChange={(e) => handleFieldChange("street", e.target.value)}
          />
          <TextField
            name="houseNumber"
            placeholder="House Number"
            sx={{ fontSize: "16px", maxWidth: "30%" }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: {
                borderRadius: "32px",
                background: "#fff",
                fontSize: "16px",
                background: "rgba(239, 239, 239, 0.15)",
                backdropFilter: "blur(7.5px)",
                color: "#fff",
              },
            }}
            onChange={(e) => handleFieldChange("houseNumber", e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TextField
            fullWidth
            placeholder="City"
            sx={{ fontSize: "16px" }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: {
                borderRadius: "32px",
                background: "#fff",
                fontSize: "16px",
                background: "rgba(239, 239, 239, 0.15)",
                backdropFilter: "blur(7.5px)",
                color: "#fff",
              },
            }}
            onChange={(e) => handleFieldChange("city", e.target.value)}
          />
          <TextField
            placeholder="PLZ"
            sx={{ fontSize: "16px", minWidth: "40%" }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: {
                borderRadius: "32px",
                background: "#fff",
                fontSize: "16px",
                background: "rgba(239, 239, 239, 0.15)",
                backdropFilter: "blur(7.5px)",
                color: "#fff",
              },
            }}
            onChange={(e) => handleFieldChange("plz", e.target.value)}
          />
        </Box>
        <Button
          fullWidth
          onClick={handleUpload}
          sx={{ mt: "24px", height: "56px", borderRadius: "32px" }}
        >
          Create Local
        </Button>
      </Box> */}
    </Box>
  ) : (
    navigate("/main")
  );
};

CreateLocal.propTypes = {};

export default CreateLocal;
