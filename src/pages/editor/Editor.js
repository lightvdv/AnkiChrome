import { Box, Button, List, ListItem, ListItemText, makeStyles} from '@material-ui/core';
import React, { useState } from 'react';
import { getTranslation } from './getRequest';
import { wordTranslations } from './wordTranslations';

const useStyles = makeStyles({
    editor:{
        position: "fixed",
        zIndex: 10000,
        top: (props) => props.top + "px",
        left: (props) => props.left + "px"
    }
});

export function Editor() {

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [word, setWord] = useState("")
  const [imageUrl, setImage] = useState("")

  React.useEffect(() => {

    const setTotal = (event) => {
      setTop(event.clientY);
      setLeft(event.clientX);

      const word = window.getSelection().toString().replace(/\s+/g, '').toLowerCase();
      /*setWord(word);*/

      getTranslation(word).then(response => {
        let translationsArr = [];
        for (let i in response.data) {
          if (response.data[i].text === word) {
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
        cleanArr.splice(5, cleanArr.length);
        console.log(cleanArr);

        setWord(word + '-' +
          cleanArr,
        );


        const imageUrl = response.data[0].meanings[0].imageUrl;
        setImage(imageUrl);
      });
    }

    window.addEventListener('dblclick', setTotal);
    return () => {
      window.removeEventListener('dblclick', setTotal);
    }
  }, [top, left, word, imageUrl]);

  const classes = useStyles({ top: top, left: left });




  return <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'text.secondary' }}>
    <div className={classes.editor}>

    <Button color="secondary"
            variant="contained"
            min-width="200px"
            onClick={() => {
              chrome.storage.sync.set({"create_card": new Date().toString()});
            }}>
            <p>Add to ANKI</p>

    </Button>



    <div><img src={imageUrl} width="200px" height="200px" alt="Word description" /></div>


      <List>
        {word}
      </List>


      {/*  {word.map((each) => (
          <div>{each}</div>
        ))}*/}
      {/*  console.log({word})
        {word}*/}

{/*

      <List>
        <ListItem disablePadding>
          {word}
        </ListItem>
        <ListItem disablePadding>
          {word}

        </ListItem>
      </List>
    <nav aria-label="secondary mailbox folders">
      <List>
        <ListItem disablePadding>

          {word}

        </ListItem>
        <ListItem disablePadding>
            <ListItemText primary="Spam" />

        </ListItem>*/}
{/*      </List>
    </nav>*/}
    </div>
  </Box>
}

export default Editor;




