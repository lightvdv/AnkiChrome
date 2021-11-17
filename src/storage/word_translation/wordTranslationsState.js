class WordTranslationsState {
  static StorageKey = "WordTranslationsState"

  constructor(status, Word, positionX, positionY) {
    this._status = status;
    this._Word = Word;
    this._positionX = positionX;
    this._positionY = positionY;
  }

}

export default WordTranslationsState