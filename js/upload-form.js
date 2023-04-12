import './validation.js';
import {addListenersOnEffects, resetEffects} from './filter-sliders.js';
import {isEscapeKeydown} from './utils.js';
import {addOnScaleButton, resetScale} from './scale-button.js';

const uploadButton = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadModalCloseButton = uploadModal.querySelector('#upload-cancel');
const uploadImgPreview = uploadModal.querySelector('.img-upload__preview').children[0];
const uploadForm = document.querySelector('.img-upload__form');

const closeModal = (isErrorOccurred = false) => {
  if (!isErrorOccurred) {
    resetScale();
    resetEffects();
    uploadButton.value = '';
    uploadForm.querySelector('input[name="hashtags"]').value = '';
    uploadForm.querySelector('textarea[name="description"]').value = '';
    const pristineError = uploadModal.querySelector('.pristine-error');
    if (pristineError !== null) {
      pristineError.style.display = 'none';
    }
  }
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
};

function onDocumentKeydown (e) {
  if (isEscapeKeydown(e)) {
    closeModal();
  }
}

const showModal = () => {
  uploadForm.querySelector('input[name="scale"]').value = '100%';
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const createUploadForm = () => {
  addOnScaleButton();
  addListenersOnEffects();
  uploadButton.addEventListener('change', (evt) => {
    showModal();

    const selectedFile = evt.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    uploadImgPreview.src = fileUrl;
    uploadModalCloseButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

export {createUploadForm, closeModal, showModal};
