import apiClient from '@/apiClient';
import ButtonAppBar from '@/components/Navbar';
import { AppBar, Box, Button, Container, FormControl, Grid, IconButton, Paper, TextField, Toolbar, Typography } from '@mui/material';
import db from 'database/models';
import Head from 'next/head';
import { useState } from 'react';
import { auto } from '@popperjs/core';
import SendIcon from '@mui/icons-material/Send';
import { Op } from 'sequelize';
import Swal from 'sweetalert2';
import Footer from '@/components/ui/footer';

const RecoverPassword = (props) => {
    const { token } = props;
    const [mensaje, setMensaje] = useState(props.message);
    const [password, setPassword] = useState('');
    const [mostrar, setMostrar] = useState(props.token ? 'form' : 'result');

    const handleChange = (e) => {
        setPassword(e.target.value);
      };
    
      const handleRecovery = (e) => {
        e.preventDefault();
         
        //realizar envío de nueva contraseña
        apiClient.post('/api/password/change', { password, token })
        .then((response) => {
          console.log(response.data);
            setMostrar('result');
            setMensaje(response.data.message);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'La contraseña ha sido cambiada.',
                showConfirmButton: false,
                timer: 5000
              })
        })
        .catch((error) => {
          console.log(error);
          setMostrar('result');
          setMensaje(error.message || 'Error al intentar guardar la nueva contraseña.');
        });
      };

      const renderContent = () => {

        if(mostrar === 'form' ) {
            return(
                <>
                <Paper elevation={3} sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 600,
                flexGrow: 1,
                marginTop: 10
            }}
                >
                <Box>
                <Container sx={{alignContent: 'center'}}>
                <Grid container spacing={2} sx={{marginBottom: 3,marginTop: 1}}>
                    <Grid item xs={12}>
                    <strong>
                        <Typography 
                        variant='h5' 
                        sx={{ textAlign:'center' }}>
                            Cambiar constraseña
                        </Typography>
                    </strong>
                    <form onSubmit={handleRecovery} noValidate>
                        <FormControl>
                            <Grid container spacing={2} >
                                <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Ingresa nueva Contraseña"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handleChange}
                                />
                                </Grid>
                                <Grid container justifyContent='center'>
                                    <Button
                                        type="submit"
                                        size='medium'
                                        variant="contained"
                                        /* sx={{ 
                                            mt: 3,
                                            mb: 2, 
                                            width:200,
                                            backgroundColor: 'primary.dark',
                                            '&:hover': {
                                            backgroundColor: 'primary.main',
                                            }
                                        }} */
                                    >
                                        Restablecer contraseña
                                    </Button>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </form>
                    </Grid>
                    </Grid>
                </Container>
                </Box>
            </Paper>
            </>
            );
        }

        return(
            <Typography variant='h4'>{mensaje}</Typography>
        )
    }


    return (
        <Container>
            <Head>
                <title>Recuperación de contraseña</title>
            </Head>
            <Box>
                <ButtonAppBar/>
            </Box>
            <Typography variant='h4' align='center'>Recuperar contraseña</Typography>
            {/* <Paper>
            
            <Box>
                <Container sx={{alignContent: 'center'}}>
                <Grid container spacing={2} sx={{marginBottom: 3,marginTop: 1}}>
                    <Grid item xs={12}></Grid> */}
                
                {renderContent()}
                {/* </Grid>
                </Container>
            </Box>
            </Paper> */}
        </Container>
    );
};

export async function getServerSideProps({req, res, params}) {

    const { token } = params;
    console.log(token);

    const user = await db.User.findOne(
        { where: {
            passwordResetToken: token,
            passwordResetExpire: {[Op.gt]: new Date()},
        }}
    );

    if (!user) {
        return {
            props: {
                token: null,
                message: 'El link de recuperación de contresena es inválido o ha expirado.'
            }, // will be passed to the page component as props
        }
    }

    return {
        props: {
            token,
            message: 'Ingresar la nueva contraseña.',
        }, // will be passed to the page component as props
    }
}

export default RecoverPassword;

