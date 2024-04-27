import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";

import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UserAuth } from "../Auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/slices/userByIdSlice";
import NonAccount from "../../Components/Reminder/NonAccount";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SignUp = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [ownRestaurants, setOwnRestaurants] = useState([]);
  const [prefereces, setPreferences] = useState([]);
  const [savedRestaurants, setSavedRestaurants] = useState([]);
  const [createdMenus, setCreatedMenus] = useState([]);
  const [savedMenus, setSavedMenus] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [userType, setUserType] = useState(false);
  const [error, setError] = useState("");
  const createdAt = serverTimestamp();
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  console.log("userType", userType);

  const handleChange = () => {
    setUserType((open) => !open);
  };
  const { register, handleSubmit } = useForm();

  const handleReg = async (data) => {
    const { email, password, username } = data;

    setError("");

    try {
      // Schritt 1: Registrieren Sie den Benutzer in Firebase Auth
      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      if (userType) {
        const usersCollectionRef = collection(db, "usersOwner"); // Ändern Sie "users" in den Namen Ihrer Firestore-Sammlung

        await addDoc(usersCollectionRef, {
          uid: user.uid,
          email,
          username, // Hinzufügen des Benutzernamens
          avatarUrl,
          ownRestaurants,
          followers,
          followed,
          createdAt,
          userType: "ownerUser",
        });
      } else {
        const usersCollectionRef = collection(db, "users"); // Ändern Sie "users" in den Namen Ihrer Firestore-Sammlung

        await addDoc(usersCollectionRef, {
          uid: user.uid,
          email,
          username, // Hinzufügen des Benutzernamens
          avatarUrl, // Hinzufügen der Avatar-URL
          savedRestaurants,
          createdMenus,
          savedMenus,
          savedProducts,
          followers,
          followed,
          createdAt,
          userType: "normalUser",
        });
      }
      // Schritt 2: Fügen Sie Benutzerdaten zu Firebase Firestore hinzu

      dispatch(setUser(user));

      await navigate("/preferences");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: "1",
        flexDirection: "column",
        gap: "40px",
        border: "1px solid reds",
      }}
    >
      <NonAccount />

      <Box
        sx={{
          display: "flex",
          width: "350px",
          // border: "1px solid red",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: "64px",
              fontFamily: "Knewave, system-ui",
              fontWeight: "400",
              fontStyle: "normal",
              lineHeight: "90%",
              color: "#EBFF00",
            }}
          >
            Sign Up
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(handleReg)}>
          <Box sx={{ mb: "8px" }}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              {...register("email")}
              InputProps={{
                style: { borderRadius: "32px", backgroundColor: "#F4F4F4" },
              }}
            />
          </Box>
          <Box sx={{ mb: "8px" }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              {...register("password")}
              InputProps={{
                style: { borderRadius: "32px", backgroundColor: "#F4F4F4" },
              }}
            />
          </Box>
          <Box sx={{ mb: "16px" }}>
            <TextField
              fullWidth
              label="Username"
              {...register("username")}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: { borderRadius: "32px", backgroundColor: "#F4F4F4" },
              }}
            />
          </Box>
          {/* <Box>
            <TextField
              fullWidth
              label="Avatar URL"
              {...register("avatarUrl")}
              onChange={(e) => setAvatarUrl(e.target.value)}
              InputProps={{ style: { borderRadius: "8px" } }}
            />
          </Box> */}
          {/* <Box>
            <Typography>Are you Restaurant Owner?</Typography>
            <Checkbox
              checked={userType}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box> */}
          <Box>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                py: "16px",
                borderRadius: "32px",
                backgroundColor: "#F4F4F4",
                color: "rgba(0,0,0,0.4)",
                mb: "16px",
                "&&:hover": {
                  backgroundColor: "#000",
                  color: "#EBFF00",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontFamily: "Knewave, system-ui",
                  fontWeight: "400",
                  fontStyle: "normal",
                  lineHeight: "90%",
                }}
              >
                lets do it
              </Typography>
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography>or</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "32px",
                justifyContent: "center",
                mt: "16px",
              }}
            >
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.5999 18.7003H22.3665V25.4837H32.4499C32.2665 27.1337 31.1665 29.7003 28.7832 31.3503C27.3165 32.4503 25.1165 33.1837 22.3665 33.1837C17.5999 33.1837 13.3832 30.067 11.9165 25.4837C11.5499 24.3837 11.3665 23.1003 11.3665 21.817C11.3665 20.5337 11.5499 19.2503 11.9165 18.1503C12.0999 17.7837 12.0999 17.417 12.2832 17.2337C13.9332 13.3837 17.7832 10.6337 22.3665 10.6337C25.8499 10.6337 28.0499 12.1003 29.5165 13.3837L34.6499 8.25033C31.5332 5.50033 27.3165 3.66699 22.3665 3.66699C15.2165 3.66699 8.9832 7.70033 6.04987 13.7503C4.76654 16.317 4.0332 19.067 4.0332 22.0003C4.0332 24.9337 4.76654 27.6837 6.04987 30.2503C8.9832 36.3003 15.2165 40.3337 22.3665 40.3337C27.3165 40.3337 31.5332 38.6837 34.4665 35.9337C37.9499 32.817 39.9665 28.0503 39.9665 22.367C39.9665 20.9003 39.7832 19.8003 39.5999 18.7003Z"
                  fill="black"
                />
              </svg>
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.4993 40.3337H16.4993C7.33268 40.3337 3.66602 36.667 3.66602 27.5003V16.5003C3.66602 7.33366 7.33268 3.66699 16.4993 3.66699H27.4993C36.666 3.66699 40.3327 7.33366 40.3327 16.5003V27.5003C40.3327 36.667 36.666 40.3337 27.4993 40.3337Z"
                  fill="black"
                />
                <path
                  d="M25.6667 17.05V22.3667H30.4333C30.8 22.3667 30.9833 22.7333 30.9833 23.1L30.25 26.5833C30.25 26.7667 29.8833 26.95 29.7 26.95H25.6667V40.3333H20.1667V27.1333H17.05C16.6833 27.1333 16.5 26.95 16.5 26.5833V23.1C16.5 22.7333 16.6833 22.55 17.05 22.55H20.1667V16.5C20.1667 13.3833 22.55 11 25.6667 11H30.6167C30.9833 11 31.1667 11.1833 31.1667 11.55V15.95C31.1667 16.3167 30.9833 16.5 30.6167 16.5H26.2167C25.85 16.5 25.6667 16.6833 25.6667 17.05Z"
                  fill="white"
                />
              </svg>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
