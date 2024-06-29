import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { loginApi } from "../utils/api/userAuth";
import Cookies from 'js-cookie';
import { RegisterFormData } from "../interface"; // Importing form data interface

// Copyright component to display footer copyright information
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.sasqnet.com/">
        SasqNet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Create a default theme using MUI's createTheme
const defaultTheme = createTheme();

// Main SignIn component
export default function SignIn() {
  // State for managing error and success messages
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const form = event.currentTarget; // Get the form element
    const data = new FormData(form); // Create a new FormData object from the form
    const formData: RegisterFormData = {
      username: data.get('username')!.toString(), // Get the username from the form data
      password: data.get('password')!.toString(), // Get the password from the form data
    };

    try {
      // Attempt to log in using the provided credentials
      const token = await loginApi(formData.username, formData.password);
      console.log('Token:', token);
      Cookies.set('token', token); // Save the token in cookies

      const cookieToken = Cookies.get('token');
      console.log('Cookie Token:', cookieToken);

      setSuccessMessage('Login successful!'); // Set success message
      setErrorMessage(null); // Clear any previous error messages

      form.reset(); // Reset the form
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your username and password and try again.'); // Set error message
      setSuccessMessage(null); // Clear any previous success messages
    }
  };

  // Render the component
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>} 
          {successMessage && <Alert severity="success">{successMessage}</Alert>} 
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
