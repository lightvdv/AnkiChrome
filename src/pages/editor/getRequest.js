import React from 'react';
import axios from 'axios';


export function getTranslation(word) {
  return axios.get('https://dictionary.skyeng.ru/api/public/v1/words/search?search=' + word);
}

