const countLetters = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (originalWord) => {
  originalWord = originalWord.toLowerCase();
  originalWord = originalWord.split(' ').join('');
  let reversedWord = '';
  for (let i = originalWord.length - 1; i >= 0; i--) {
    reversedWord += originalWord[i];
  }
  return originalWord === reversedWord;
};

const getNumber = (toNumber) => {
  toNumber = toNumber.replace(/\D/g, '');
  if (toNumber === '') {
    return NaN;
  } else {
    toNumber = Number(toNumber);
    return toNumber;
  }
};

const addPadding = (string, minLength, extraString) => {
  if (string.length >= minLength) {
    return string;
  }
  const diff = minLength - string.length;
  let croppedString = '';
  const secondDiff = diff - extraString.length;
  for (let i = 0; i < secondDiff; i++) {
    const cropIndex = i % extraString.length;
    croppedString += extraString.charAt(cropIndex);
  }
  for (let i = 0; i < extraString.length; i++) {
    croppedString += extraString[i];
  }
  return croppedString + string;
};

const getRandomInteger = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const getRandomIdGenerator = (min, max) => {
  const ids = Array.from({length: max - min + 1}, (_, i) => min + i);

  return function () {
    const randomIndex = getRandomInteger(0, ids.length - 1);
    const resultId = ids[randomIndex];
    ids.splice(randomIndex, 1);
    return resultId;
  };
};

export {addPadding, getNumber, countLetters, isPalindrome, getRandomInteger, getRandomIdGenerator};
