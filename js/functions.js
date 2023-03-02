const countLetters = function (string, maxLength) {
  const stringLength = string.length;
  return stringLength <= maxLength;
};
countLetters();

const isPalindrome = function (originalWord) {
  originalWord = originalWord.toLowerCase();
  originalWord = originalWord.split(' ').join('');
  let reversedWord = '';
  for (let i = originalWord.length - 1; i >= 0; i--) {
    reversedWord += originalWord[i];
  }
  return originalWord === reversedWord;
};
isPalindrome();

const getNumber = function (toNumber) {
  toNumber = toNumber.replace(/\D/g, '');
  if (toNumber === '') {
    return NaN;
  } else {
    toNumber = Number(toNumber);
    return toNumber;
  }
};
getNumber();

function addPadding(string, minLength, extraString) {
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
}
addPadding();
