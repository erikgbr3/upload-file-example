import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Input, Paper } from "@mui/material";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import apiClient from "@/apiClient";
import Swal from 'sweetalert2';
import BreadCrumbs from "@/components/ui/Breadcumbs";
import ButtonAppBar from "@/components/Navbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "@/components/ui/footer";
import { useSession } from "next-auth/react";
import Head from "next/head";

/*
function mostrar(){
    const archivo = document.getElementById("image").files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(archivo );
      reader.onloadend = function () {
        document.getElementById("image").src = reader.result;
      }
    }
  }
*/

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function AddProduct(){
  const { data: session, status } = useSession();
  const { register, handleSubmit, watch, formState: { errors }, setError, reset } = useForm();
  
  console.log(session);

  if (!session) {
    return (
      <>
        <Head>
          <title>Acerca de</title>
        </Head>
        <Paper>
          <h1 align='center'>Acceso denegado</h1>
        </Paper>
      </>
    )
  }

    
    const onSubmit = (data) => {
        console.log(data);

        //enviar informacion al backend
        apiClient.post('/api/product', data)
        .then((response) => {

            Swal.fire(response.data.message);
            reset();
        })
        .catch((error) => {
            //Swal.fire(error.response.data.message);

            if (error.response.data.errors){
                error.response.data.errors.forEach((errorItem) => {
                    setError(errorItem.field, {
                        type: "validation",
                        message: errorItem.error
                    });
                })
            }

        })
    };
//parte del form
    const theme = createTheme();
    
    return(
            <>
        <Box>
          <ButtonAppBar/>
        </Box>
        <Paper elevation={3} style={{ padding:10}}>

        <div>
        <BreadCrumbs />
        </div>
         <div  style={{ display: "flex", justifyContent:"center", alignItems:"center"}}>
              <Box>
                  <Typography variant="h3" component="h3">
                      Registrar Producto
                  </Typography>
              </Box>
          </div>
          <ThemeProvider theme={theme}>
      <Container id="formul" component="main" maxWidth="xs" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
              <TextField 
                  id="description" 
                  label="Descripción" 
                  fullWidth 
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  {
                    ...register('description', {
                        required:'Este campo es obligatorio',
                    })
                  }
                  />
              </Grid>
              <Grid item xs={12} >
              <TextField 
                  id="movements"
                  label="Movimiento" 
                  fullWidth  
                  error={!!errors.movements}
                  helperText={errors.movements?.message}
                  {
                    ...register('movements', {
                        required:'Este campo es obligatorio',
                    })
                  }
                  />
              </Grid>
              <Grid item xs={12} >
              <TextField 
                  id="tipe"
                  label="Tipo" 
                  fullWidth  
                  error={!!errors.tipe}
                  helperText={errors.tipe?.message}
                  {
                    ...register('tipe', {
                        required:'Este campo es obligatorio',
                    })
                  }
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField 
                  id="amount"
                  label="Monto" 
                  fullWidth 
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  {
                    ...register('amount', {
                        required:'Este campo es obligatorio',
                        /* pattern: {
                            value: /[0-150]/,
                            message: 'La cantidad no es valida'
                        } */
                    })
                  }
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  id="are"
                  label="Hay" 
                  fullWidth 
                  error={!!errors.are}
                  helperText={errors.are?.message}
                  {
                    ...register('are', {
                        required:'Este campo es obligatorio',
                        /* pattern: {
                          value: /[0-150]/,
                          message: 'La cantidad no es valida'
                      } */
                    })
                  }>
                </TextField>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Guardar
            </Button>
            <Button
              href="/inventory"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 1, mb: 1 }}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
       </Paper>
       <Footer/>
            </>
    );
}