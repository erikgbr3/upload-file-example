import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import apiClient from '@/apiClient';
import { Paper } from '@mui/material';

const theme = createTheme();

export default function SignUp() {
  const { reset, register, handleSubmit, watch, formState: { errors }, setError} = useForm();

  const onSubmit = data => {
    console.log(data);
    reset();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario registrado exitosamente!',
      showConfirmButton: false,
      timer: 5000,
    })

    apiClient.post('/api/users', data)
    .then((response) => {
      console.log(response.data);
    })
    .catch ((error) => {
      console.log(error);
      alert(error.response.data.message);

      if (error.response.data.errors) {
        error.response.data.errors.forEach((errorItem) => {
          setError(errorItem.field, {
            type: "validation",
            message: errorItem.error
          })
        })
      }
    })
    }

    return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{width: 500, margin: '150px', marginLeft: 65}}>
      <Container component="form" maxWidth="xs" onSubmit={handleSubmit(onSubmit)}>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Unete
          </Typography>
          <Box sx={{ mt: 3 }}>
          
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="name"
                  label="Nombre(s)"
                  error = {!!errors.name}
                  helperText = { errors.name?.message }
                  {
                    ...register('name',{
                        required: 'Este campo es obligatorio',
                        pattern: {
                          value: /^[A-Za-z ]+$/i,
                          message: 'No es un nombre valido',
                        }
                      })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="username"
                  label="Nombre de Usuario"
                  name="username"
                  error = {!!errors.lastname}
                  helperText = { errors.lastname?.message }
                  {
                    ...register('username',
                      {
                        required: 'Este campo es obligatorio',
                      }
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="email"
                  error = {!!errors.email}
                  helperText = {errors.email?.message}
                  {
                    ...register('email',
                      {
                        required: 'Este campo es obligatorio',
                        pattern: {
                          value: /(.+)@(.+){2,}\.(.+){2,}/i,
                          message: 'No es un email valido',
                        }
                      }
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error = {!!errors.password}
                  helperText = {errors.password?.message}
                  {
                    ...register('password',
                      {
                        required: 'Este campo es obligatorio',
                      }
                    )
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrate
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                    ¿Ya tienes una cuenta? Iniciar sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Paper>
    </ThemeProvider>
  );
}