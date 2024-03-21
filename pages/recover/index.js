import apiClient from '@/apiClient';
import ButtonAppBar from '@/components/Navbar';
import { AppBar, Box, Button, Container, FormControl, Grid, IconButton, Paper, Stack, TextField, Toolbar, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { auto } from '@popperjs/core';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';
import Footer from '@/components/ui/footer';
import { ForkLeft } from '@mui/icons-material';

export default function Recover() {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handleRecovery = (e) => {
        e.preventDefault();
        
        //realizar envío de nueva contraseña
        apiClient.post('/api/password/reset', { email })
        .then((response) => {
            console.log(response.data);
            setEmail(response.data.email);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El email de recuperacion se ha enviado.',
                showConfirmButton: false,
                timer: 5000
              })
        })
        .catch(error => {
            console.log(error);
          });
      };

    return (
        <>
            <Head>
                <title>Recuperación de contraseña</title>
            </Head>
            <Box>
                <ButtonAppBar/>
            </Box>
            <Typography variant='h4' align='center'>Recuperar contraseña</Typography>
            
            <Paper elevation={3} sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 600,
                flexGrow: 1,
                marginTop: 10
            }}>
                <Box>
                <Container sx={{alignContent: 'center'}}>
                <Grid container spacing={2} sx={{marginBottom: 3,marginTop: 1}}>
                    <Grid item xs={12}>
                    <strong>
                        <Typography 
                        variant='h5' 
                        sx={{ textAlign:'center' }}>
                            Enviar email
                        </Typography>
                    </strong>
                    <form onSubmit={handleRecovery} noValidate>
                        <FormControl>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        name="email"
                                        label="Ingresa tu correo"
                                        type="email"
                                        id="email"
                                        value={email || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid container justifyContent='center'>
                                    <Stack direction="row" spacing={5}>
                                    <Button 
                                        href='/login'
                                        size='medium'
                                        variant="contained"
                                        color='error'
                                        
                                    >
                                        Cancelar 
                                    </Button>
                                    <Button
                                        type="submit"
                                        size='medium'
                                        variant="contained"
                                        endIcon={<SendIcon />}
                                    >
                                        Enviar email
                                    </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </form>
                    </Grid>
                    </Grid>
                </Container>
                </Box>
            </Paper>
            <Footer/>
        </>
    );
};
