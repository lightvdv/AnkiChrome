import { Button, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { getTranslation } from './getRequest';

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
    window.addEventListener('dblclick', (event) => {
      setTop(event.clientY);
      setLeft(event.clientX);


      const word = window.getSelection().toString();
      setWord(word);

      getTranslation(word).then(response => {
        setWord(word + '-' +
          response.data[0].meanings[0].translation.text
        );

        const imageUrl = response.data[0].meanings[0].imageUrl;
        setImage(imageUrl);
      });
    });
  }, [top, left, word, imageUrl]);


  const classes = useStyles({ top: top, left: left });

  return <Paper elevation={3}>
    <div className={classes.editor}>

    <Button color="secondary"
            variant="contained"
            min-width="200px"
            onClick={() => {
              chrome.storage.sync.set({"create_card": new Date().toString()});
            }}>
      {word}
    </Button>
    <div><img src={imageUrl} width="200px" height="200px" alt="Word description"

    /></div>
  </div>
  </Paper>
}

export default Editor;




