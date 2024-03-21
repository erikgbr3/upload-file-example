import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useSession, signOut} from "next-auth/react";
import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Swal from 'sweetalert2';

export default function ButtonAppBarLogin() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         <IconButton >
         <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGws2k-RL57ZJZdxqHevCHwUOyikDyT52MW5SmMH3yORVnNXjHvWusw8ojK_CHkG0p8A&usqp=CAU' width="170px" height="40px" />
         </IconButton>
         <Typography component="div" sx={{ flexGrow: 1 }}>

         </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}