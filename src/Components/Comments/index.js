import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Add from "../../assets/icons/add.svg";
import Like from "../../assets/icons/likeComment.svg";
import Liked from "../../assets/icons/likedComment.svg";
import DisLike from "../../assets/icons/disLike.svg";
import DisLiked from "../../assets/icons/disLiked.svg";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../Auth/Auth";
import { AddAPhotoOutlined, TryRounded } from "@mui/icons-material";
import { setIsComment } from "../../Redux/functions/slices/IsComment";
import { getUserByIdAll } from "../../Redux/thunks/userByIdAll";

const CommentsComponent = ({ product, handleComment }) => {
  const { id } = useParams();
  const restaurantId = id ? id : null;
  const categoryTypeData = useSelector((state) => state.categoryActive);
  const categoryType = categoryTypeData.categoryActive;
  const selectedCategoryId = useSelector((state) => state.selectedCategory);
  const { user } = UserAuth();
  const userId = user?.uid;
  const productId = product?.product?.id || null;
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userByIdAll);
  console.error("userData aus dem comment----", userData);

  console.error("restaurantId aus comments:", restaurantId);
  console.error("categoryType aus comments:", categoryType);
  console.error("selectedCategoryId aus comments:", selectedCategoryId);
  console.error("productId aus comments:", productId);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  console.error("comments aus der firestore", comments);

  const [isOnInput, setIsOnInput] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  console.error("is on input ----------", isOnInput);
  console.error("is on isButtonClicked---------------", isButtonClicked);

  const [count, setCount] = useState(15);
  const handleLoadMoreComments = () => {
    setCount((prevLimit) => prevLimit + 15); // Zum Beispiel 15 weitere Kommentare laden
  };

  const handleInputFocus = () => {
    setIsOnInput(true);
  };

  const handleInputBlur = () => {
    if (isButtonClicked) {
    } else {
      setIsOnInput(false);
      setIsButtonClicked(false);
    }
  };
  const handleUploadComment = () => {
    setIsButtonClicked(true);
    handleAddComment();
  };

  // Im CommentsComponent
  // Im CommentsComponent
  // Im CommentsComponent
  //Pagination-start
  const endOfListRef = useRef();
  const handleScroll = () => {
    // Überprüfe, ob das Ende der Liste sichtbar ist
    if (endOfListRef.current && isElementInView(endOfListRef.current)) {
      handleLoadMoreComments();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Entferne den Event-Listener, wenn das Komponenten-Unmounted wird
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isElementInView = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    );
  };
  //Pagination-end

  useEffect(() => {
    const fetchData = async () => {
      try {
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

          const commentsCollectionRef = collection(productDocRef, "comments");

          const snapshot = await getDocs(
            query(
              commentsCollectionRef,
              orderBy("createdAt", "desc"),
              limit(count)
            )
          );
          console.error("snapshot comments", snapshot);
          const updatedComments = [];

          const userPromises = snapshot.docs.map(async (commentDoc) => {
            const commentData = commentDoc.data();
            const userPromise = dispatch(getUserByIdAll(commentData.userId));
            return { commentData, userPromise };
          });

          const userResponses = await Promise.all(userPromises);

          userResponses.forEach(async ({ commentData, userPromise }) => {
            const userData = (await userPromise).payload[0]; // Hier auf das payload-Array zugreifen
            console.error("user data from comments", userData);
            const commentWithUserData = {
              ...commentData,
              userName: userData?.username || "Unknown User",
              userAvatar: userData?.avatarURL || "default-avatar-url",
            };

            updatedComments.push(commentWithUserData);
          });

          setComments(updatedComments);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Kommentare:", error);
      }
    };

    fetchData();
  }, [
    productId,
    restaurantId,
    categoryType,
    selectedCategoryId,
    dispatch,
    count,
  ]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      // Verhindere das Hinzufügen leerer Kommentare
      return;
    }

    // Pfad zu einem Produkt-Dokument
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
      // Referenz auf die Kommentar-Subcollection unter dem Produkt
      const commentsCollectionRef = collection(productDocRef, "comments");

      // Füge einen neuen Kommentar zur Subcollection hinzu
      const newCommentEntry = {
        userId: userId,
        comment: newComment,
        createdAt: new Date().toISOString(),
        commentState: 0,
      };

      await addDoc(commentsCollectionRef, newCommentEntry);

      // Du musst nichts mehr hier tun, da der useEffect automatisch die Kommentare aktualisiert
      setNewComment("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Kommentars:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
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
      // Referenz auf die Kommentar-Subcollection unter dem Produkt
      const commentsCollectionRef = collection(productDocRef, "comments");

      // Referenz auf das zu löschende Kommentar-Dokument
      const commentDocRef = doc(commentsCollectionRef, commentId);

      const commentDocSnapshot = await getDoc(commentDocRef);
      const existingComments = commentDocSnapshot.data() || {};

      if (existingComments.userId === userId) {
        // Lösche das Kommentar-Dokument
        await deleteDoc(commentDocRef);

        // Lese Kommentare aus der Subcollection nach dem Löschen erneut ein
        const commentsQuerySnapshot = await getDocs(commentsCollectionRef);
        const comments = {};
        commentsQuerySnapshot.forEach((commentDoc) => {
          comments[commentDoc.id] = commentDoc.data();
        });

        setComments(comments);
      }
    } catch (error) {
      console.error("Fehler beim Löschen des Kommentars:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: "3",
        background: "rgba(0,0,0,0.3)",
        pb: "8px",
        pt: "8px",
        top: "0",
        flexGrow: "1",
        // border: "1px solid red",
      }}
    >
      <IconButton
        onClick={() => handleComment((open) => !open)}
        sx={{ position: "absolute", top: "0", right: "0", zIndex: "10" }}
      >
        <img src={Add} style={{ transform: "rotate(45deg)" }} alt="" />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          marginTop: "8px",
          flexDirection: "column",
          gap: "4px",
          mt: "32px",
          // border: "1px solid yellow",
          flexGrow: "1",
          overflowY: "auto", // Hinzugefügt
          width: "100%",
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {Object.entries(comments)?.map(([commentId, commentEntry], index) => (
          <Box
            key={commentId}
            sx={{
              display: "flex",
              px: "4px",
              // border: "1px solid black",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                ml: "4px",
                px: "4px",
                py: "4px",
                display: "flex",
                // border: "1px solid red",
                flexDirection: "column",
                width: "100%",
                borderRadius: "16px",
                background: "rgba(225,225,225,0.30)",
                backdropFilter: "blur(3px)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Avatar
                  src={commentEntry.userAvatar}
                  sx={{ height: "16px", width: "16px" }}
                />
                <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                  {commentEntry.userName}
                </Typography>
              </Box>
              <Typography
                key={commentId}
                sx={{
                  color: "#fff",
                  marginBottom: "4px",
                  fontSize: "14px",
                  px: "4px",
                }}
              >
                {commentEntry.comment}
                {/* {commentEntry.userId === userId && (
                  <IconButton onClick={() => handleDeleteComment(commentId)}>
                    <img
                      src={Add}
                      style={{ transform: "rotate(45deg)" }}
                      alt="Delete"
                    />
                  </IconButton>
                )} */}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <IconButton>
                <img src={Like} alt="" />
              </IconButton>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                123
              </Typography>
              <IconButton>
                <img src={DisLike} alt="" />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box ref={endOfListRef} sx={{ minHeight: "100px" }}></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          px: "8px",
          position: "absolute",
          width: "100%",
          bottom: "0",
          pb: "8px",
          pt: "4px",
          zIndex: 5,
          background: "rgba(225,225,225,0.2)",
          backdropFilter: "blur(7.5px)",
        }}
      >
        <TextField
          size="small"
          sx={{ borderRadius: "32px", position: "relative", zIndex: "5" }}
          placeholder="Add your comment"
          variant="outlined"
          multiline
          fullWidth
          rows={isOnInput ? 4 : 1}
          InputProps={{
            style: {
              borderRadius: !isOnInput ? "32px" : "4px 4px 18px 18px",
              color: "#fff",
              fontSize: "12px",
              background: "rgba(225,225,225,0.2)",
              backdropFilter: "blur(7.5px)",
            },
          }}
          value={newComment}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Box>
          <IconButton
            onClick={handleUploadComment}
            sx={{ position: "relative", zIndex: "5", mr: "16px" }}
          >
            <img src={Add} alt="" />
          </IconButton>
        </Box>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          flexGrow: "1",
          width: "100%",
          border: "1px solid blue",
        }}
      ></Box> */}
    </Box>
  );
};

CommentsComponent.propTypes = {
  // PropTypes definieren
};

export default CommentsComponent;
