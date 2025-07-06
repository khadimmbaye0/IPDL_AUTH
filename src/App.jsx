import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#334B6B',
    },
    background: {
      default: '#E5E7EB',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#000',
    },
    h5: {
      fontWeight: 500,
      color: '#000',
    },
  },
});

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setShowError(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    setShowError(false);
    
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ici vous intégrerez votre logique d'authentification backend
      console.log('Données de connexion:', formData);
      
      // Simulation d'une erreur pour démonstration
      throw new Error('Identifiants incorrects');
      
    } catch (error) {
      setShowError(true);
      console.error('Erreur de connexion:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Ici vous intégrerez votre logique de récupération de mot de passe
    console.log('Mot de passe oublié pour:', formData.email);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: { xs: 4, sm: 8 },
          paddingBottom: 4,
        }}
      >
        {/* Titre principal */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: '#000',
            fontWeight: 'bold',
            marginBottom: 4,
            textAlign: 'center',
            letterSpacing: '0.5px',
          }}
        >
          BUDGET - ESP
        </Typography>

        {/* Conteneur du formulaire */}
        <Container maxWidth={false} sx={{ maxWidth: '600px', width: '100%' }}>
          <Card
            elevation={3}
            sx={{
              backgroundColor: '#FFF',
              borderRadius: 2,
              maxWidth: 400,
              margin: '0 auto',
            }}
          >
            <CardContent sx={{ padding: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: '#000',
                  marginBottom: 3,
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                Authentification
              </Typography>

              {showError && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    marginBottom: 2,
                    '& .MuiAlert-message': {
                      color: '#000'
                    }
                  }}
                >
                  Identifiants incorrects. Veuillez réessayer.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  margin="normal"
                  variant="outlined"
                  sx={{
                    marginBottom: 2,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#FFF',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Mot de passe"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  margin="normal"
                  variant="outlined"
                  sx={{
                    marginBottom: 3,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#FFF',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    backgroundColor: '#334B6B',
                    color: '#FFF',
                    fontWeight: 500,
                    fontSize: '1rem',
                    padding: '12px 0',
                    marginBottom: 2,
                    borderRadius: 1,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#2a3f57',
                    },
                    '&:disabled': {
                      backgroundColor: '#334B6B',
                      opacity: 0.7,
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Se connecter'
                  )}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleForgotPassword}
                    sx={{
                      color: '#334B6B',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Mot de passe oublié ?
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;