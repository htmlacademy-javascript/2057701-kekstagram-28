import {isEscapeKeydown} from './utils.js';

const NUMBER_OF_VISIBLE_COMMENTS = 5;
let shownComments;
const bigPicture = document.querySelector('.big-picture');
const commentsTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentLoaderButton = bigPicture.querySelector('.comments-loader');
const comentsCount = bigPicture.querySelector('.social__comment-count');

const createCounterHtml = (commentsShown, commentsCount) => {
  comentsCount.textContent = '';
  const spanItem = document.createElement('span');
  spanItem.classList.add('comments-count');
  spanItem.textContent = commentsCount;
  comentsCount.append(`${commentsShown} из `,
    spanItem,
    ' комментариев');
};

const addBigPictureData = (photo) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
};

const getCommentData = (comments, numberToShow) => {
  const commentsFragment = document.createDocumentFragment();
  for (let i = shownComments; i < (shownComments + numberToShow); i++) {
    commentsFragment.append(comments[i]);
  }
  shownComments += numberToShow;
  socialComments.append(commentsFragment);
};

const createComments = (photo) => {
  const comments = photo.comments.map((comment) => {
    const commentItem = commentsTemplate.cloneNode(true);
    commentItem.querySelector('img').src = comment.avatar;
    commentItem.querySelector('img').alt = comment.name;
    commentItem.querySelector('p').textContent = comment.message;
    return commentItem;
  });
  return comments;
};

const hideCommentLoader = (onCommentButtonClick) => {
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  commentLoaderButton.removeEventListener('click', onCommentButtonClick);
};

const addCommentLoader = (onCommentButtonClick) => {
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  commentLoaderButton.addEventListener('click', onCommentButtonClick);
};

const addCommentsCount = (comments, onCommentButtonClick) => {
  const commentsCount = comments.length;
  createCounterHtml(Math.min(commentsCount, NUMBER_OF_VISIBLE_COMMENTS), comments.length);
  if (commentsCount <= NUMBER_OF_VISIBLE_COMMENTS) {
    hideCommentLoader(onCommentButtonClick);
  } else {
    addCommentLoader(onCommentButtonClick);
  }
};

const renderBigPicture = (evt, photo) => {

  document.body.classList.add('modal-open');
  socialComments.innerHTML = '';
  shownComments = 0;
  let numberToShow = Math.min(NUMBER_OF_VISIBLE_COMMENTS, photo.comments.length);
  const comments = createComments(photo);

  function onCommentButtonClick() {
    numberToShow = Math.min(NUMBER_OF_VISIBLE_COMMENTS, (comments.length - shownComments));
    getCommentData(comments, numberToShow);
    createCounterHtml(shownComments, comments.length);
    if (shownComments === comments.length) {
      hideCommentLoader(onCommentButtonClick);
    }
  }

  function onDocumentKeydown (e) {
    if (isEscapeKeydown(e)) {
      closeBigPicture();
    }
  }

  function closeBigPicture () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
    commentLoaderButton.removeEventListener('click', onCommentButtonClick);
  }

  getCommentData(comments, numberToShow);
  addCommentsCount(comments, onCommentButtonClick);
  addBigPictureData(photo);
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

export {renderBigPicture};
