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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const SignUp = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [ownRestaurants, setOwnRestaurants] = useState({});
  const [savedRestaurants, setSavedRestaurants] = useState({});
  const [createdMenus, setCreatedMenus] = useState({});
  const [savedMenus, setSavedMenus] = useState({});
  const [savedProducts, setSavedProducts] = useState({});
  const [followers, setFollowers] = useState({});
  const [followed, setFollowed] = useState({});
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
    const { email, password, username, avatarUrl } = data;

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
          avatarUrl, // Hinzufügen der Avatar-URL
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

      await navigate("/main");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="h3">Sign up for a free account</Typography>
      </Box>
      <form onSubmit={handleSubmit(handleReg)}>
        <Box>
          <TextField
            fullWidth
            type="email"
            label="Email"
            {...register("email")}
            InputProps={{ style: { borderRadius: "8px" } }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="password"
            label="Password"
            {...register("password")}
            InputProps={{ style: { borderRadius: "8px" } }}
          />
        </Box>
        <Box>
          {" "}
          <TextField
            fullWidth
            label="Username"
            {...register("username")}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{ style: { borderRadius: "8px" } }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Avatar URL"
            {...register("avatarUrl")}
            onChange={(e) => setAvatarUrl(e.target.value)}
            InputProps={{ style: { borderRadius: "8px" } }}
          />
        </Box>
        <Box>
          <Typography>Are you Restaurant Owner?</Typography>
          <Checkbox
            checked={userType}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
        <Box>
          <Button
            sx={{ background: "#FD540B" }}
            fullWidth
            variant="contained"
            type="submit"
          >
            Sign Up
          </Button>
          <Typography variant="p">
            Already have an account yet?{" "}
            <Link to="/" className="underline">
              Sign in.
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default SignUp;
