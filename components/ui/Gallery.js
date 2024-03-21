import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Modal } from '@mui/material';

export default function Gallery({ basePath, gallery, width, height }) {
  const [current, setCurrent] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleClick = (index) => {
    setCurrent(index);
    setOpen(true); 
  }

  return (
    <>
    <ImageList sx={{ width: width || 500, height: height || 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      {gallery.map((item, index) => (
        <ImageListItem key={item.id}>
          <img
            src={`${basePath}${item.path}`}
            srcSet={`${basePath}${item.path}`}
            alt={item.description}
            loading="lazy"
            onClick={() => {handleClick(index); }}
          />
          <ImageListItemBar
            title={item.description}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.description}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    <Modal
        open={open}
        onClose={handleOpen}

      >
        <Box sx={{textAlign: 'center', height: '100%'}}>
         {current >= 0 &&(
          <img
          src={`${basePath}${gallery[current].path}`}
          alt={gallery[current].description}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}}
          onClick={handleOpen}
        />
         )}
        </Box>

      </Modal>
    </>
  );
}
