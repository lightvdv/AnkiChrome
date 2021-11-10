import React, { useState } from 'react';
import { getTranslation } from './getRequest';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { ImageListItem, List, ListItem, ListItemText, IconButton, Container } from '@mui/material';
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



  React.useEffect(() => {

    const setData = (event) => {
      setTop(event.clientY + 15);
      setLeft(event.clientX - 40);

      const selectedWord = window.getSelection().toString().replace(/\s+/g, '').toLowerCase();
      setSelectedWord(selectedWord)

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

      let closePopUp = (event) => {
        setTop(-10000);
        setLeft(-2000);
      };




      window.addEventListener('click', closePopUp);
      return () => {
        window.removeEventListener('click', closePopUp);
      };
    };



    window.addEventListener('dblclick', setData);

    return () => {
      window.removeEventListener('dblclick', setData);
    };





  }, [top, left, word, selectedWord, imageUrl]);
  const classes = useStyles({ top: top, left: left });


  return (
    <Container fixed>
    <Box className={classes.editor} >
      <Paper elevation={10} variant='elevation' sx={{ width: 200, textAlign: 'center' }}>

        <ImageListItem sx={{ width: 170, mt: 1 }}>
          <img src={imageUrl} alt='Word description' />
        </ImageListItem>

        <List sx={{
          width: '100%', maxWidth: 360, bgcolor: 'background.paper', position: 'relative',
          overflow: 'visible', minHeight: 50, maxHeight: 300, '& ul': { padding: 0 },
        }}>
          <ul>
            {Object.values(word).join('').split(',').map((item) => (
              <ListItem key={`item-${item}`} sx={{ width: 170, pb: 0, mb: -0.5, mt: -2 }}>
                <ListItemText primary={`${item}`} />
                <IconButton color='primary' sx={{ position: 'relative', right: -20 }}
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
      </Paper>
    </Box>
    </Container>
  );

}


export default Editor;
