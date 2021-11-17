import { fetchTranslation } from '../../api/translation/skyEng';
import Status from './wordTranslationStatus';
import WordTranslationsState from './wordTranslationsState';


export function getWordTranslation(word, positionX, positionY) {

  if (!/[a-z]+/g.test(word))
    return;

  fetchTranslation(word)
    .then(wordTranslations => {

      let key = WordTranslationsState.StorageKey
      let obj = {}
      obj[key] = new WordTranslationsState(Status.READY, wordTranslations, positionX, positionY)

      chrome.storage.local.set(obj);
    })
    .catch( error => console.error('Error:', error) )
}

