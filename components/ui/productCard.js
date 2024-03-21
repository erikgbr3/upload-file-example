import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Grid, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import apiClient from '@/apiClient';

export default function MediaCard({product, onDelete, onUpdate}) {
  const [data, setData] = React.useState({...product});
  const [edit, setEdit] = React.useState(false);



  const handleEdit = () => {
    setEdit(!edit);
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const cancelSave = () => {
    setData({...product});
    setEdit(false);
  }

  const handleDelete = () =>{
    onDelete(data.id);
  }

  const handleUpdate = (product, index) => {
    onUpdate(product.id, product, index);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://i.pinimg.com/originals/d4/a9/a9/d4a9a9c98ba49d9353d97fe156259d43.jpg"
        title="product"
        alt='iamge'
      />
      <CardContent >
        <Grid container>
            <Grid item xs={12}>
              {!edit && (
                <>
                 <Typography gutterBottom variant="h5" component="div">
                 {data.description}
                 </Typography>
                 
              </>
              )}
              {edit && (
                 <TextField 
                  name="description"
                  label="description" 
                  variant="standard"
                  value={data.description}
                  onChange={handleChange}
                 />
              )}
                
            </Grid> 
            <Grid item xs={4}>
            {!edit && (
                 <Chip  sx={{ fontWeight: '600'}} label={data.amount}/>
              )}
              {edit && (
                 <TextField 
                    name="amount"
                    label="amount" 
                    variant="standard"
                    value={data.amount}
                    onChange={handleChange}
                  />
              )}     
            </Grid>
            <Grid item xs={4}>
            {!edit && (
                 <Chip  sx={{ fontWeight: '600'}} label={data.are}/>
              )}
              {edit && (
                 <TextField 
                    name="are"
                    label="are" 
                    variant="standard"
                    value={data.are}
                    onChange={handleChange}
                  />
              )}     
            </Grid>
            <Grid item xs={6}>
            {!edit && (
                  <Typography variant="body2" color="text.primary" sx={{mt: 2}}>
                  {data.movements}
                </Typography>
              )}
              {edit && (
                 <TextField sx={{mt: 2}} 
                    name="movements"
                    label="movements" 
                    variant="standard"
                    value={data.movements}
                    onChange={handleChange}
                 />
              )}       
            </Grid>
            <Grid item xs={6}>
            {!edit && (
                  <Typography variant="body2" color="text.primary" sx={{mt: 2}}>
                  {data.tipe}
                </Typography>
              )}
              {edit && (
                 <TextField sx={{mt: 2}} 
                    name="tipe"
                    label="tipe" 
                    variant="standard"
                    value={data.tipe}
                    onChange={handleChange}
                 />
              )}       
            </Grid>
            </Grid>
      </CardContent>
      <CardActions>
              {!edit && (
                  <Button size="small" variant="contained" onClick={handleEdit}>Editar</Button>
              )}
              {edit && (
                <>
                 <Button type="submit" size="small" variant="contained" onClick={handleUpdate}>Guardar</Button>
                 <Button size="small" variant="outlined" color="error" onClick={cancelSave}>Cancelar</Button>
                 </>
              )}  
        
        <Button type="submit" size="small" variant="outlined" color="error" onClick={handleDelete}>Eliminar</Button>
      </CardActions>
    </Card>
  );
}
