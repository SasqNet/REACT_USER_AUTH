import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { signupApi } from '../utils/api/userAuth';
import { SignupFormData } from '../interface'; // Importing form data interface

// Copyright component to display footer copyright information
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.sasqnet.com/">
        SasqNet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Create a default theme using MUI's createTheme
const defaultTheme = createTheme();

// Main SignUp component
export default function SignUp() {
  // State for managing error and success messages
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const form = event.currentTarget; // Get the form element
    const data = new FormData(form); // Create a new FormData object from the form
    const formData: SignupFormData = {
      firstName: data.get('first_name') as string, // Get the first name from the form data
      lastName: data.get('last_name') as string, // Get the last name from the form data
      username: data.get('username') as string, // Get the username from the form data
      email: data.get('email') as string, // Get the email from the form data
      password: data.get('password') as string, // Get the password from the form data
    };

    try {
      // Attempt to sign up using the provided details
      const signupData = await signupApi(formData.firstName, formData.lastName, formData.username, formData.email, formData.password);
      console.log('Signup data:', signupData);
      setSuccessMessage('Signup successful!'); // Set success message
      setErrorMessage(null); // Clear any previous error messages
      form.reset(); // Reset the form
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Signup failed. Please check your details and try again.'); // Set error message
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>} 
          {successMessage && <Alert severity="success">{successMessage}</Alert>} 
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
