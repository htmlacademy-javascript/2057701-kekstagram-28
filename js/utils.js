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

const isEscapeKeydown = (evt) => evt.key === 'Escape';

const stopPropagation = (evt) => evt.stopPropagation();

const addStyleToElement = (element, stylePropepries) => {
  for (const [property, value] of Object.entries(stylePropepries)) {
    element.style.setProperty(property, value);
  }
};


export {getRandomInteger, getRandomIdGenerator, isEscapeKeydown, stopPropagation, addStyleToElement};
