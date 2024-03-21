import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Divider, ThemeProvider, createTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function BasicTable({ index, product, onDelete, onUpdate}) {
  const [data, setData] = React.useState({...product});

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
  () =>
    createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
  [prefersDarkMode],
  );

  const handleDelete = () =>{
    onDelete(data.id);
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <Paper>
      <Container>
      </Container>
      <Divider></Divider>
      <TableContainer component={Paper} md={2}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Movimientos</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="right">Hay</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.description}
                </TableCell>
                <TableCell align="right">{data.movements}</TableCell>
                <TableCell align="right">{data.tipe}</TableCell>
                <TableCell align="right">{data.amount}</TableCell>
                <TableCell align="right">{data.are}</TableCell>
                <TableCell align="center">
                  <Button variant='contained' >EDitar</Button>
                  <Button variant='outlined' color='error' onClick={handleDelete}>Eliminar</Button>
                  </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </ThemeProvider>
    </>
  );
}