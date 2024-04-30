import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, IconButton, Typography } from "@mui/material";
import Likes from "../../assets/icons/likeee.svg";
import Liked from "../../assets/icons/liked.svg";
import { db } from "../../firebase"; // Stelle sicher, dass du die Firestore-Instanz importierst
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserAuth } from "../../Auth/Auth";
import useMobileCheck from "../MobileCheck";

const LikeComponent = (product) => {
  const { id } = useParams();
  const isMobile = useMobileCheck();
  const restaurantId = id;
  const categoryTypeData = useSelector((state) => state.categoryActive);
  const categoryType = categoryTypeData.categoryActive;
  const selectedCategoryId = useSelector((state) => state.selectedCategory);
  const { user } = UserAuth();
  const userId = user?.uid;
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(145);
  const productId = product?.product?.product?.id || null;

  console.error("restaurantId:", restaurantId);
  console.error("categoryType:", categoryType);
  console.error("selectedCategoryId:", selectedCategoryId);
  console.error("Product ID aus Likes:", productId);
  console.error("User ID aus Likes:", user);

  useEffect(() => {
    if (
      productId !== null &&
      restaurantId &&
      categoryType &&
      selectedCategoryId
    ) {
      const productDocRef = doc(
        db,
        "restaurants",
        restaurantId,
        categoryType,
        selectedCategoryId,
        "products",
        productId
      );

      const fetchLike = async () => {
        try {
          // Lese die vorhandenen Likes aus der Datenbank
          const productDocSnapshot = await getDoc(productDocRef);
          const existingLikes = productDocSnapshot.data().likes || {};

          // Holen Sie die Benutzer-ID des aktuellen Benutzers (angenommen, du hast eine Authentifizierung implementiert)
          const currentUserId = userId;

          // Überprüfen, ob der Benutzer bereits ein Like abgegeben hat
          if (existingLikes[currentUserId]) {
            // Benutzer hat bereits ein Like abgegeben, also entferne es
            setIsLiked(true); // Setze IsLiked auf true, da der Benutzer das Produkt bereits geliked hat
          }

          // Aktualisiere die Likes in der Datenbank

          // Aktualisiere den lokalen Zustand
          setLikes(Object.keys(existingLikes).length);
        } catch (error) {
          console.error("Fehler beim Aktualisieren der Likes:", error);
        }
      };

      if (productId !== null) {
        fetchLike();
      }
    }
  }, [productId]);
  const handleLikes = async () => {
    const productDocRef = doc(
      db,
      "restaurants",
      restaurantId,
      categoryType,
      selectedCategoryId,
      "products",
      productId
    );

    try {
      // Lese die vorhandenen Likes aus der Datenbank
      const productDocSnapshot = await getDoc(productDocRef);
      const existingLikes = productDocSnapshot.data().likes || {};

      // Holen Sie die Benutzer-ID des aktuellen Benutzers (angenommen, du hast eine Authentifizierung implementiert)
      const currentUserId = userId;

      // Überprüfen, ob der Benutzer bereits ein Like abgegeben hat
      if (existingLikes[currentUserId]) {
        // Benutzer hat bereits ein Like abgegeben, also entferne es
        delete existingLikes[currentUserId];
      } else {
        // Benutzer hat noch kein Like abgegeben, füge es hinzu
        existingLikes[currentUserId] = new Date().getTime();
      }

      // Aktualisiere die Likes in der Datenbank
      await updateDoc(productDocRef, {
        likes: existingLikes,
      });

      // Aktualisiere den lokalen Zustand
      setLikes(Object.keys(existingLikes).length);
      setIsLiked((open) => !open);
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Likes:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        // border: "2px solid yellow",
      }}
    >
      <IconButton
        onClick={handleLikes}
        sx={{
          // border: "1px solid red",
          width: isMobile ? "44px" : "24px",
          height: isMobile ? "44px" : "24px",
        }}
      >
        {/* <img
          src={isLiked ? Liked : Likes}
          alt=""
          style={{
            height: !isLiked ? "16px" : "16px",
            width: !isLiked ? "16px" : "16px",
          }}
        /> */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.1 7.56 3.1C9.38 3.1 10.99 3.98 12 5.34C13.01 3.98 14.63 3.1 16.44 3.1C19.51 3.1 22 5.6 22 8.69C22 15.69 15.52 19.82 12.62 20.81Z"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconButton>
      <Typography
        sx={{
          fontSize: isMobile ? "18px" : "12px",
          color: !isLiked ? "#fff" : "#fff",
          display: "flex",
          position: "relative",
          zIndex: "1",
          fontFamily: "Noto Sans",
          fontWeight: "300",
        }}
      >
        {likes}
      </Typography>
    </Box>
  );
};

LikeComponent.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  categoryType: PropTypes.string.isRequired,
  selectedCategoryId: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
};

export default LikeComponent;

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { Box, IconButton, Typography } from "@mui/material";
// import Likes from "../../assets/icons/likeee.svg";
// import Liked from "../../assets/icons/liked.svg";

// const LikeComponent = (props) => {
//   const [isLiked, setIsLiked] = useState(false);

//   const [likes, setLikes] = useState(145);
//   const handleLikes = () => {
//     isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
//     setIsLiked((open) => !open);
//   };
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}
//     >
//       <IconButton onClick={handleLikes} sx={{ width: "24px", height: "24px" }}>
//         <img
//           src={isLiked ? Liked : Likes}
//           alt=""
//           style={{
//             height: !isLiked ? "20px" : "24px",
//             width: !isLiked ? "20px" : "24px",
//           }}
//         />
//       </IconButton>
//       <Typography
//         sx={{
//           fontSize: "12px",
//           color: !isLiked ? "#fff" : "#fff",
//           display: "flex",
//           justifyContent: "center",
//           position: "relative",
//           zIndex: "1",
//         }}
//       >
//         {likes}
//       </Typography>
//     </Box>
//   );
// };

// export default LikeComponent;
