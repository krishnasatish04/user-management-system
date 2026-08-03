import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import { login } from "../../services/authService";
import { login as loginAction } from "../../redux/actions/authActions";


//dispatch() writes to Redux.
//useSelector() reads from Redux.

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  
  const handleLogin = () => {
    const user = login(email, password);

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    dispatch(loginAction(user));

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    navigate("/dashboard");
  };



  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4,  width: {
        xs: "90%",
        sm: 400,
      }, }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Management System
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;