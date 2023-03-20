const NUMBER_OF_GENERATED_PHOTOS = 25;
const NUMBER_OF_GENERATED_COMMENT_IDS = 250;
const NUMBER_OF_GENERATED_COMMENTS = 10;
const MIN_COUNT_AVATAR = 1;
const MAX_COUNT_AVATAR = 6;
const MIN_COUNT_LIKE = 15;
const MAX_COUNT_LIKE = 200;

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

const createUniqueCommentId = getRandomIdGenerator(1, NUMBER_OF_GENERATED_COMMENT_IDS);

const createComments = () => ({
  id: createUniqueCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createPhotoDescription = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_COUNT_LIKE, MAX_COUNT_LIKE),
  comments: Array.from({length: getRandomInteger(1, NUMBER_OF_GENERATED_COMMENTS)}, createComments)
});

const getPictures = () =>
  Array.from({length: NUMBER_OF_GENERATED_PHOTOS}, (_, pictureIndex) =>
    createPhotoDescription(pictureIndex + 1)
  );

getPictures();
