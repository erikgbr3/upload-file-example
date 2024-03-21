import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useSession, signOut} from "next-auth/react";
import { Button, Grid, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Swal from 'sweetalert2';

export default function ButtonAppBar() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    Swal.fire({
      title: 'Estas seguro?',
      text: "Puedes inciar sesión despues!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si quiero salir!'
    }).then((result) => {
      if (result.isConfirmed) { 
        Swal.fire({
          title: 'Cerrando sesión!',
           showConfirmButton: false,
      })
      signOut();
      }
    })
    

  };

  if (!session) {
    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         <IconButton>
         <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGws2k-RL57ZJZdxqHevCHwUOyikDyT52MW5SmMH3yORVnNXjHvWusw8ojK_CHkG0p8A&usqp=CAU' width="170px" height="40px" />
         </IconButton>
         <Typography component="div" sx={{ flexGrow: 1 }}>

         </Typography>
         <Stack spacing={2} direction="row">
          <Button align='right'variant='contained' color='success' href='/login' sapcing={2}>Iniciar sesión</Button>
          <Button align='right'variant='contained' color='secondary' href='/signup'>Registrarse</Button>
         </Stack>
        </Toolbar>
      </AppBar>
    </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         <IconButton >
         <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGws2k-RL57ZJZdxqHevCHwUOyikDyT52MW5SmMH3yORVnNXjHvWusw8ojK_CHkG0p8A&usqp=CAU' width="170px" height="40px" />
         </IconButton>
         <Typography component="div" sx={{ flexGrow: 1 }}>

         </Typography>
         <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}