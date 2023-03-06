const MIN_COUNT_USERS_ID = 1;
const MAX_COUNT_USERS_ID = 25;
const MIN_COUNT_COMMENTS_ID = 26;
const MAX_COUNT_COMMENTS_ID = 1000;
const MIN_COUNT_PHOTOS_ID = 1;
const MAX_COUNT_PHOTOS_ID = 25;
const MIN_COUNT_LIKE = 15;
const MAX_COUNT_LIKE = 200;
const MIN_COUNT_AVATAR = 1;
const MAX_COUNT_AVATAR = 6;

const SIMILAR_USERS_COUNT = 25;

const NAMES = [ 'Иван',
  'Андрей',
  'Лука',
  'Полина',
  'Стефания',
  'Катя',
  'Дима',
  'Арсений',
  'Олеся',
  'Кирилл',
  'Таисия',
  'Алена',
  'Александр',
  'Инна',
  'Оля',
  'Маргарита',
  'Настя',
  'Даша',
  'Платон',
  'Елисей',
  'Никита',
  'Максим',
  'Даниил',
  'Эдик',
  'Злата'
];

const DESCRIPTIONS = [
  'Неопознанный летающий объект',
  'Хорошо же общались',
  'Фотография на фоне моря',
  'Идеальный день для этого...',
  'Вы только посмотрите на ЭТО...',
  'Поздравляю! Наконец-то это случилось!',
  'Так начинается мое типичное утро',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

function getRandomInteger (min, max) {
  const minValue = Math.abs(min);
  const maxValue = Math.abs(max);
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUniqueCommentId = createRandomIdFromRangeGenerator(MIN_COUNT_COMMENTS_ID, MAX_COUNT_COMMENTS_ID);
const getUniqueUserId = createRandomIdFromRangeGenerator(MIN_COUNT_USERS_ID, MAX_COUNT_USERS_ID);
const getUniquePhotoId = createRandomIdFromRangeGenerator(MIN_COUNT_PHOTOS_ID, MAX_COUNT_PHOTOS_ID);

const createUserComments = () => ({
  id: getUniqueCommentId(),
  avatar: `img/avatar-${ getRandomInteger(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createUser = () => ({
  id: getUniqueUserId(),
  url: `photos/${ getUniquePhotoId() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_COUNT_LIKE, MAX_COUNT_LIKE),
  name: getRandomArrayElement(NAMES),
  comment: createUserComments(),
});

Array.from({length: SIMILAR_USERS_COUNT}, createUser);
