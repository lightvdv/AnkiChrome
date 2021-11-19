import { fetchTranslation } from '../../api/translation/skyEng';
import Status from './wordTranslationStatus';
import WordTranslationsState from './wordTranslationsState';
import {WordTranslationsKey} from  './wordTranslationsState'


export function getWordTranslation(word, positionX, positionY) {

  if (!/[a-z]+/g.test(word))
    return;

  fetchTranslation(word)
    .then(wordTranslations => {
      let key = WordTranslationsKey
      let WordTranslationsStateDispatch = {}
      WordTranslationsStateDispatch[key] = new WordTranslationsState(Status.READY, wordTranslations, positionX, positionY)

      chrome.storage.local.set(WordTranslationsStateDispatch);
    })
    .catch( error => console.error('Error:', error) )
}

