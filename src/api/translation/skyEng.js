import Word from './Word';
import WordTranslation from './WordTranslation';

export function fetchTranslation(word) {

  return (
    fetch('https://dictionary.skyeng.ru/api/public/v1/words/search?search=' + word.toString().replace(/\s+/g, '').toLowerCase())
      .then(response => {
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
        let withoutDuplicatesArr = [...new Set(translationsArr)];
        withoutDuplicatesArr.splice(4, withoutDuplicatesArr.length - 1).join(', ');


        let wordTranslations = [];
        for (let translate of withoutDuplicatesArr) {
          wordTranslations.push(new WordTranslation(translate));
        }

        const imageUrl = response.data[0].meanings[0].imageUrl;
console.log(wordTranslations)
        return new Word(word, imageUrl, wordTranslations);
      })
  );
}