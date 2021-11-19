import React, { useEffect, useState } from 'react';
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
  paper: {
    width: '200px', textAlign: 'center',
  },
  list: {
    maxWidth: '180px', bgcolor: 'background.paper', textAlign: 'center',
    overflow: 'visible', minHeight: '50px', maxHeight: '300px', '& ul': { pb: 0, pl: 0, pr: 0, pt: 1, margin: 0 },
  },
  listItem: {
    adding: 0, mt: -2, ml: 2, mr: 2,
  },
  imageListItem: {
    width: '160px', mb: 1,
  },
});

export function Editor() {

  const [top, setTop] = useState(-10000);
  const [left, setLeft] = useState(-10000);
  const [translations, setTranslations] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [imageUrl, setImage] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let myListenerFunction = function(changes) {
      let path = changes.WordTranslationsState.newValue;

      let arrayOfTranslations = [];
      for (let i in path._Word._translations) {
        arrayOfTranslations.push(path._Word._translations[i]._russian);
      }
      setTranslations(arrayOfTranslations);
      setLeft(path._positionY);
      setTop(path._positionX);
      setImage(path._Word._imageUrl);
      setSelectedWord(path._Word._word);
      setOpen(true);
    };

    chrome.storage.onChanged.addListener(myListenerFunction);
    return () => {
      chrome.storage.onChanged.removeListener(myListenerFunction);
    };

  }, [left, top, translations, selectedWord, imageUrl, open]);
  const classes = useStyles({ top: top, left: left });

  return (
    <Dialog onClose={handleClose} open={open} hideBackdrop={true} disableScrollLock={true}>
      <Container fixed>
        <Box className={classes.editor}>
          <Paper elevation={10} variant='elevation' className={classes.paper}>
            <List className={classes.list}>
              <ul>
                {Object.values(translations).map((item) => (
                  <ListItem key={`item-${item}`} className={classes.listItem}>
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
            <ImageListItem className={classes.imageListItem}>
              <img src={imageUrl} alt='Word description' />
            </ImageListItem>
          </Paper>
        </Box>
      </Container>
    </Dialog>
  );
}

export default Editor;