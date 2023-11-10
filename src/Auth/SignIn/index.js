import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { UserAuth } from "../Auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [userName, setUserName] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const { register, handleSubmit } = useForm();

  const handleLog = async (data) => {
    const { email, password } = data;
    setError("");
    try {
      await signIn(email, password);
      navigate("/main");
    } catch (error) {
      setError(error.message);
      console.log("error-index-file-submit:", error.message);
    }
  };
  return (
    <Box>
      <Box>
        <Box>
          <img src="" alt="" />
        </Box>
        <Typography variant="h3">Sign in to find a courier. </Typography>
      </Box>
      <form onSubmit={handleSubmit(handleLog)}>
        <Box>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register("email")}
            InputProps={{ style: { borderRadius: "8px" } }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            InputProps={{ style: { borderRadius: "8px" } }}
          />
        </Box>
        <Box>
          <Button variant="contained" fullWidth type="submit">
            Sign In
          </Button>
          <Typography>
            Don't have an account yet?{" "}
            <Link to="/signup" className="underline">
              Sign up.
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default SignIn;
