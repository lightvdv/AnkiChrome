import React, { useState } from 'react';
import { getTranslation } from './getRequest';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { ImageListItem, List, ListItem, ListItemText, IconButton, Container, Dialog } from '@mui/material';
import Paper from '@mui/material/Paper';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


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


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };




  React.useEffect(() => {

    const setData = (event) => {
      const selectedWord = window.getSelection().toString().replace(/\s+/g, '').toLowerCase();
      setSelectedWord(selectedWord);

      if (/[a-z]+/g.test(selectedWord)) {
      setTop(event.clientY + 15);
      setLeft(event.clientX - 40);

        getTranslation(selectedWord).then(response => {

          let translationsArr = [];
          for (let i in response.data) {
            if (response.data[i].text === selectedWord) {
              for (let j in response.data[i].meanings) {
                for (let u in response.data[i].meanings[j].translation) {
                  let translation = response.data[i].meanings[j].translation[u];
                  if (translation && !(translation.split('').includes(' '))) {
                    translationsArr.push(translation);
                  }
                }
              }
            } else {
              translationsArr.push(response.data[0].meanings[0].translation.text);
            }
          }
          let cleanArr = [...new Set(translationsArr)];
          cleanArr.splice(4, cleanArr.length - 1);
          console.log(cleanArr.join(', '));
          setTranslations(cleanArr.join(', '));


          const imageUrl = response.data[0].meanings[0].imageUrl;
          setImage(imageUrl);

        });

        let closePopUp = () => {
          setOpen(false);
        /*  setTop(-10000);
          setLeft(-2000);*/
        };


        window.addEventListener( 'click', setData, handleClose);
        return () => {
          window.removeEventListener( 'click', setData, handleClose);
        };
      }
      ;
    }


    window.addEventListener( 'dblclick', setData, handleClickOpen);
    return () => {
      window.removeEventListener('dblclick', setData, handleClickOpen);
    };


  }, [top, left, word, selectedWord, imageUrl, open]);
  const classes = useStyles({ top: top, left: left });


  return (
    <Dialog onClose={handleClose} open={open}>
    <Container fixed >
      <Box className={classes.editor}>
        <Paper elevation={10} variant='elevation' sx={{ width: 200, textAlign: 'center' }} >



          <List sx={{
            maxWidth: 180, bgcolor: 'background.paper', textAlign: 'center',
            overflow: 'visible', minHeight: 50, maxHeight: 300, '& ul': { pb: 0, pl:0, pr:0, pt:1, margin: 0 }
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
                    <ControlPointIcon />
                  </IconButton>
                </ListItem>
              ))}
            </ul>
          </List>

          <ImageListItem sx={{ width: 160, mb: 1 }}>
            <img src={imageUrl} alt='Word description' />
          </ImageListItem>

        </Paper>
      </Box>
    </Container>
    </Dialog>
  );
}

export default Editor;
