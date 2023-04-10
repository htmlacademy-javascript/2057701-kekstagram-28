import './validation.js';
import {addListenersOnEffects, resetEffects} from './filter-sliders.js';
import {isEscapeKeydown} from './utils.js';
import {addOnScaleButton, resetScale} from './scale-button.js';

const uploadButton = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadModalCloseButton = uploadModal.querySelector('#upload-cancel');
const uploadImgPreview = uploadModal.querySelector('.img-upload__preview').children[0];
const uploadForm = document.querySelector('.img-upload__form');

const createUploadForm = () => {
  //#region
  const showModal = () => {
    uploadImgPreview.src = `photos/${uploadButton.value.split('\\')[2]}`;
    uploadModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    resetScale();
    resetEffects();
  };

  const hideModal = () => {
    uploadButton.value = '';
    uploadForm.querySelector('input[name="hashtags"]').value = '';
    uploadForm.querySelector('textarea[name="description"]').value = '';
    const pristineError = uploadModal.querySelector('.pristine-error');
    if (pristineError !== null) {
      pristineError.style.display = 'none';
    }
    uploadModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  const closeModal = () => {
    hideModal();
    uploadModalCloseButton.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown (e) {
    if (isEscapeKeydown(e)) {
      closeModal();
    }
  }
  //#endregion
  uploadButton.addEventListener('change', (evt) => {
    showModal();

    const selectedFile = evt.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    uploadImgPreview.src = fileUrl;
    uploadModalCloseButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', onDocumentKeydown);
  });

  uploadButton.addEventListener('change', () => {
    addOnScaleButton();
    addListenersOnEffects();
  }, {once: true});
};

export {createUploadForm};
