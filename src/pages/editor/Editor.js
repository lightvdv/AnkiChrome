import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { ImageListItem, List, ListItem, ListItemText, IconButton, Container, Dialog } from '@mui/material';
import Paper from '@mui/material/Paper';



const useStyles = makeStyles({
  editor: {
    position: 'fixed',
    zIndex: 10000,
    top: (props) => props.top + 'px',
    left: (props) => props.left + 'px',
  },
});

export function Editor() {
  const [top, setTop] = useState(-10000);
  const [left, setLeft] = useState(-10000);
  const [word, setTranslations] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [imageUrl, setImage] = useState('');
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ top: top, left: left });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  console.log('result')

    const handleClose = () => {
      setOpen(false);
    };


    return (
      <Dialog onClose={handleClose} open={open} hideBackdrop={true} disableScrollLock={true}>
        <Container fixed>
          <Box className={classes.editor}>
            <Paper elevation={10} variant='elevation' sx={{ width: 200, textAlign: 'center' }}>

              <List sx={{
                maxWidth: 180, bgcolor: 'background.paper', textAlign: 'center',
                overflow: 'visible', minHeight: 50, maxHeight: 300, '& ul': { pb: 0, pl: 0, pr: 0, pt: 1, margin: 0 },
              }}>
                <ul>
                  {Object.values(word).join('').split(',').map((item) => (
                    <ListItem key={`item-${item}`} sx={{ padding: 0, mt: -2, ml: 2, mr: 2 }}>
                      <ListItemText primary={`${item}`} />
                      <IconButton color='primary'
                                  onClick={() => {
                                    chrome.storage.sync.set({
                                      engVersion: selectedWord,
                                      rusVersion: item,
                                    });

                                  }}>
                      </IconButton>
                    </ListItem>
                  ))}
                </ul>
              </List>

             <ImageListItem sx={{ width: 160, mb: 1 }}>
                <img src={imageUrl} alt='Word description' />
              </ImageListItem>

            </Paper>
          /*</Box>
        </Container>
      </Dialog>
    );
  });
}


export default Editor