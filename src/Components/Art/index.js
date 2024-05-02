import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
<<<<<<< HEAD
} from "@mui/material";
import {
  resetCreateRestaurant,
  setRestaurantField,
} from "../../Redux/slices/createLocalSlice";
import { useDispatch, useSelector } from "react-redux";
import Add from "../../assets/icons/add.svg";
import { setOpenSecond } from "../../Redux/functions/slices/OpenSecond";
import { setIsCreated } from "../../Redux/functions/slices/RestaurantIsCreated";
import { setHaveRestaurant } from "../../Redux/functions/slices/haveRestaurant";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { Close } from "@mui/icons-material";
import { setRestaurantDataFromMain } from "../../Redux/slices/restaurantDataFromMain";
=======
} from '@mui/material';
import { resetCreateRestaurant, setRestaurantField } from '../../Redux/slices/createLocalSlice';
import { useDispatch, useSelector } from 'react-redux';
import Add from '../../assets/icons/add.svg';
import { setOpenSecond } from '../../Redux/functions/slices/OpenSecond';
import { setIsCreated } from '../../Redux/functions/slices/RestaurantIsCreated';
import { setHaveRestaurant } from '../../Redux/functions/slices/haveRestaurant';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { db } from '../../firebase';
import { Close } from '@mui/icons-material';
>>>>>>> 6577b4fbb248ddb8bbd44117958de0b4e3771c94

const Art = (props) => {
  const dispatch = useDispatch();
  const createRestaurantData = useSelector((state) => state.createRestaurant.restaurantData);

  const [artsValue, setArtsValue] = useState({});
  const [textFieldValue, setTextFieldValue] = useState(''); // Zustand für das Textfeld
  const isCreated = useSelector((state) => state.isCreated);
  const [openStatus, setOpenStatus] = useState({
    open: false,
    severity: 'error',
    message: '',
  });
  const [uploaded, setUploaded] = useState(false);

  console.log('Arts --------', artsValue);

  const handleAddArt = () => {
    const value = textFieldValue; // Wert aus dem Zustand holen
    if (value) {
      setArtsValue({ ...artsValue, [value]: value });
      setTextFieldValue(''); // Textfeld zurücksetzen
    }
  };

  const handleRemoveArt = (index) => {
    setArtsValue((prevArtsValue) => {
      const newArtsValue = { ...prevArtsValue };
      delete newArtsValue[Object.keys(newArtsValue)[index]];
      return newArtsValue;
    });
  };

  useEffect(() => {
    dispatch(setRestaurantField({ field: 'art', value: artsValue }));
  }, [artsValue]);

  const handleSaveArtToRedux = () => {
    // Hier wird die Aktion zum Hinzufügen von artsValue in den Redux-State aufgerufen
    dispatch(setRestaurantField({ field: 'art', value: artsValue }));
  };

  const handleClose = () => {
    setOpenStatus({ ...openStatus, open: false });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const emptyFields = [];
  console.log('emptyFields');

  const handleUpload = async () => {
    setUploaded(true);

    // Umwandeln von background und logo in Blobs
    const logoBlob = new Blob([createRestaurantData.logo]);
    const backgroundBlob = new Blob([createRestaurantData.background]);
    const storage = getStorage();
    const imagesRef = ref(storage, 'restaurants');

    const { name, street, houseNumber, city, art, userId, followers, createdAt } =
      createRestaurantData;
    // Erstellen Sie Referenzen für Logo und Hintergrundbild
    const logoRef = ref(imagesRef, `${name}_logo.jpg`);
    const backgroundRef = ref(imagesRef, `${name}_background.jpg`);

    if (!logoBlob) emptyFields.push('Logo');
    if (!backgroundBlob) emptyFields.push('Background');
    if (!name) emptyFields.push('Name');
    if (!street) emptyFields.push('Street');
    if (!houseNumber) emptyFields.push('House Number');
    if (!city) emptyFields.push('City');
    if (!art) emptyFields.push('Art');

    // Jetzt kannst du `emptyFields` verwenden, um herauszufinden, welche Felder leer sind

    if (emptyFields.length > 0) {
      setOpenStatus({
        open: true,
        severity: 'error',
        message: 'Die rot markierten Felder müssen ausgefüllt werden!',
      });
      return; // Die Funktion hier beenden
    }
    try {
      // Laden Sie das Logo hoch
      await uploadBytes(logoRef, logoBlob);

      // Laden Sie das Hintergrundbild hoch
      await uploadBytes(backgroundRef, backgroundBlob);

      // Fügen Sie die Restaurantdaten zur Firestore-Datenbank hinzu
      const logoUrl = await getDownloadURL(logoRef);
      const backgroundUrl = await getDownloadURL(backgroundRef);
      const restaurantCollectionRef = collection(db, 'restaurants');

      const restaurantDocRef = await addDoc(restaurantCollectionRef, {
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
      // const uid = userId;
      // const userOwnerRef = doc(collection(db, "usersOwner"), uid);
      // await updateDoc(userOwnerRef, {
      //   ownRestaurants: arrayUnion(restaurantDocRef.id),
      // });

      // restaurantDocRef && dispatch(setRestaurantDataFromMain(restaurantDocRef));
      dispatch(setIsCreated(!isCreated));

      dispatch(setHaveRestaurant());

      setOpenStatus({
        open: true,
        severity: 'success',
        message: 'Restaurantdaten erfolgreich in Firestore hochgeladen.',
      });
      dispatch(resetCreateRestaurant());
    } catch (error) {
      setOpenStatus({
        open: true,
        severity: 'error',
        message: 'Fehler beim Hochladen der Bilder oder Speichern der Daten:' + error,
      });
    }
  };

  useEffect(() => {
    console.log(uploaded);
  }, [uploaded]);

  return (
    <Box sx={{ display: 'flex', flexGrow: '1' }}>
      <Snackbar open={openStatus.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={openStatus.severity}
          variant="filled"
          sx={{ width: '100%' }}>
          {openStatus.message}
        </Alert>
      </Snackbar>
      <Grid container sx={{ display: 'flex', px: '60px' }}>
        <Grid
          item
          xs={8}
          md={8}
          sx={{
            px: '32px',
            background: '#4C4C4C',
            borderRadius: '32px',
            py: '16px',
            // border: "1px solid red",
          }}>
          <Box
            sx={{
              display: 'flex',
              // border: "1px solid red",
              flexWrap: 'wrap',
              gap: '8px',
            }}>
            {Object.entries(artsValue)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([key, value], index) => (
                <Box
                  key={index}
                  sx={{
                    py: '4px',
                    paddingLeft: '16px',
                    paddingRight: '4px',
                    borderRadius: '32px',
                    background: '#FAFAFA',
                    display: 'flex',
                    color: '#000',
                    gap: '16px',
                    justifyContent: 'space-between',
                  }}>
                  <Typography>{value}</Typography>
                  <IconButton
                    onClick={() => handleRemoveArt(index)}
                    sx={{
                      background: '#5FD6DD',
                      width: '24px',
                      height: '24px',
                      '&:hover': { background: '#00E0ED' },
                    }}>
                    <img
                      src={Add}
                      alt="Remove"
                      style={{
                        transition: '150ms',
                        rotate: '45deg',
                        width: '16px',
                        height: '16px',
                      }}
                    />
                  </IconButton>
                </Box>
              ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          sx={{
            display: 'flex',
            // border: "1px solid red",
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
          }}>
          <form>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                // background: "rgba(225, 225, 225, 0.2)",
                // backdropFilter: "blur(3.5px)",
                borderRadius: '32px',
                px: '32px',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  width: '100%',
                  color: '#444444',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '8px',
                  }}>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    placeholder="Add Hashtags"
                    sx={{ fontSize: '16px' }}
                    InputLabelProps={{
                      style: { color: '#444444' },
                      required: true,
                    }}
                    InputProps={{
                      style: {
                        borderRadius: '32px',
                        background: '#fff',
                        fontSize: '16px',
                        background: '#fff',

                        // background: "rgba(239, 239, 239, 0.15)",
                        // backdropFilter: "blur(7.5px)",
                        color: '#444444',
                      },
                    }}
                    id="artField"
                    value={textFieldValue} // Wert des Textfelds aus dem Zustand
                    onChange={(e) => setTextFieldValue(e.target.value)} // Zustand aktualisieren
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconButton
                      onClick={handleAddArt}
                      sx={{
                        background: '#5FD6DD',
                        '&:hover': { background: '#00E0ED' },
                      }}>
                      <img
                        src={Add}
                        alt="Add"
                        style={{
                          transition: '150ms',
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
                {/* Rest deiner Komponente */}
              </Box>
            </Box>
          </form>
          <Box sx={{ display: 'flex', flexGrow: '1' }}></Box>
          <Button
            fullwidth
            onClick={handleUpload}
            sx={{
              mt: '24px',
              height: '56px',
              borderRadius: '32px',
              px: '32px',
            }}>
            Restaurant erstellen
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Art;
