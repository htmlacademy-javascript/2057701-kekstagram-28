const countLetters = (string, maxLength) => string.length <= maxLength;
countLetters('проверяемая строка', 20);

const isPalindrome = (originalWord) => {
  originalWord = originalWord.toLowerCase();
  originalWord = originalWord.split(' ').join('');
  let reversedWord = '';
  for (let i = originalWord.length - 1; i >= 0; i--) {
    reversedWord += originalWord[i];
  }
  return originalWord === reversedWord;
};
isPalindrome('Лёша на полке клопа нашёл ');

const getNumber = (toNumber) => {
  toNumber = toNumber.replace(/\D/g, '');
  if (toNumber === '') {
    return NaN;
  } else {
    toNumber = Number(toNumber);
    return toNumber;
  }
};
getNumber('1 кефир, 0.5 батона');

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
addPadding('qwerty', 4, '0');
