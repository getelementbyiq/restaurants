import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../assets/icons/comments.svg";
import LikeComponent from "../Likes";
import { setFetchedProducts } from "../../Redux/slices/fetchProducts";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { resetCreateProduct } from "../../Redux/slices/createProductSlice";

const ProductPreview = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [restaurantsId, setRestaurantsId] = useState();
  // const restaurantsId = id;
  const restaurantsData = useSelector(
    (state) => state.fetchRestaurants?.restaurantsData
  );

  const product = useSelector((state) => state.createProduct.productData);
  const itemsData = useSelector((state) => state.createItemsList);
  //   const localData = useSelector((state) => state.localData);
  const backgroundBlob = new Blob([product.background]);
  const newBackground = URL.createObjectURL(backgroundBlob);

  const [openStatus, setOpenStatus] = useState({
    open: false,
    severity: "error",
    message: "",
  });
  const backgroundImage = `url(${URL.createObjectURL(
    new Blob([product.background])
  )})`;
  const existingProducts = useSelector(
    (state) => state.fetchProducts.fetchProducts
  );

  useEffect(() => {
    restaurantsData &&
      restaurantsData.map((restaurant) => setRestaurantsId(restaurant.id));
  }, [restaurantsData]);
  console.log("product from preview", restaurantsId);

  const categoryTypeData = useSelector((state) => state.categoryActive);

  const categoryType = categoryTypeData.categoryActive;

  const selectedCategoryId = useSelector((state) => state.selectedCategory);
  const emptyFields = [];
  const handleUploadProduct = async () => {
    const backgroundBlob = new Blob([product.background]);
    const storage = getStorage();
    const imagesRef = ref(storage, "products");

    const {
      name,
      price,
      description,
      comments,
      likes,
      background,
      createdAt,
      items,
      offerStart,
      offerEnd,
      collectedOfferTime,
      menus,
      tag,
      eventsDate,
    } = product;

    const backgroundRef = ref(imagesRef, `${name}_background.jpg`);

    try {
      await uploadBytes(backgroundRef, backgroundBlob);
      const backgroundUrl = await getDownloadURL(backgroundRef);

      // if (!backgroundUrl) emptyFields.push("Logo");
      // if (!name) emptyFields.push("Name");
      // if (!price) emptyFields.push("Price");
      // if (!description) emptyFields.push("Description");
      // if (!items) emptyFields.push("Items");

      // if (emptyFields.length > 0) {
      //   setOpenStatus({
      //     open: true,
      //     severity: "error",
      //     message: "Die rot markierten Felder müssen ausgefüllt werden!",
      //   });
      //   return; // Die Funktion hier beenden
      // }
      const productCollectionRef = collection(db, "products");

      await addDoc(productCollectionRef, {
        name,
        price,
        description,
        comments,
        likes,
        background: backgroundUrl,
        createdAt,
        restaurantsId,
        items,
        offerStart,
        offerEnd,
        collectedOfferTime,
        menus,
        tag,
        categoryType,
        selectedCategoryId,
        eventsDate,
        // Weitere Produktinformationen hier hinzufügen...
      });

      const updatedProducts = [
        ...existingProducts,
        {
          name,
          price,
          description,
          comments,
          likes,
          background: backgroundUrl,
          createdAt,
          restaurantsId,
          items,
          categoryType,
          selectedCategoryId,
          // Weitere Produktinformationen hier hinzufügen...
        },
      ];

      dispatch(setFetchedProducts(updatedProducts));
      setOpenStatus({
        open: true,
        severity: "success",
        message: `${name} wurde erfolgreich hochgeladen`,
      });
      dispatch(resetCreateProduct());
      console.log("Produkt erfolgreich zu Firestore hinzugefügt.");
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Produkts zu Firestore:", error);
    }
  };

  const handleClose = () => {
    setOpenStatus({ ...openStatus, open: false });
  };

  const [isHovered, setHovered] = useState(false);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <Snackbar
        open={openStatus.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={openStatus.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {openStatus.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          backgroundImage: backgroundImage,

          //   backgroundImage: `url(${localData.background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Du kannst die Hintergrundgröße anpassen
          backgroundPosition: "center",
          // width: "244px",
          // height: "384px",
          borderRadius: "32px",
          boxShadow: product.background
            ? "0px 0px 300px 0px #000 inset"
            : "none",
          overflow: "hidden",
          position: "relative",
          gap: "8px",
          backgroundColor: product.background ? "none" : "#FAFAFA",
        }}
      >
        {/* <Box
          sx={{
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "0",
          }}
        ></Box> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            px: "8px",
            position: "relative",
            zIndex: "1",
            mt: "8px",
          }}
        >
          {!product.name &&
            !product.price &&
            !product.description &&
            !product.items && <Typography>Product Preview</Typography>}

          <Typography sx={{ color: product.background ? "#fff" : "#444444" }}>
            {product.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: "8px",
            position: "relative",
            zIndex: "1",
          }}
        >
          <Typography sx={{ color: product.background ? "#fff" : "#444444" }}>
            {product.price}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            background: "(rgba(225,225,225,0.15)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              // border: "1px solid red",
              // background: "rgba(0,0,0,0.3)",
              px: "8px",

              overflow: "auto",
              position: "relative",
              zIndex: "1",
            }}
          >
            <Typography sx={{ color: product.background ? "#fff" : "#444444" }}>
              {product.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                mt: "8px",
                gap: "4px",
                maxWidth: "100%",
                flexWrap: "wrap",
                position: "relative",
                zIndex: "1",
              }}
            >
              {product.items &&
                Object.values(product.items).map((item) => (
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        background: "#fff",
                        px: "8px",
                        py: "4px",
                        borderRadius: "32px",
                      }}
                    >
                      <Typography>{item}</Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              my: "16px",
              justifyContent: "center",
              alignItems: "flex-end",
              mr: "8px",
            }}
          >
            <Box>
              <LikeComponent />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  mt: "8px",
                }}
              >
                <IconButton sx={{ width: "24px", height: "24px" }}>
                  <img
                    src={Comment}
                    alt=""
                    style={{ height: "20px", width: "20px" }}
                  />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: "Quicksand",
                    position: "relative",
                    zIndex: "1",
                  }}
                >
                  123
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: "1",
            // border: "1px solid red",
            mb: "16px",
            px: "16px",
          }}
        >
          {product.name &&
            product.price &&
            product.description &&
            product.items &&
            product.background && (
              <Button
                fullWidth
                sx={{
                  borderRadius: "32px",
                  color: "#363636",
                  background:
                    "linear-gradient(143deg, #00FFE0 14.29%, #00B2FF 84.16%)",
                }}
                onClick={handleUploadProduct}
              >
                Create Product
              </Button>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPreview;
