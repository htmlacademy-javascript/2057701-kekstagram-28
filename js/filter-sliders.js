const effectLevelField = document.querySelector('.effect-level');
const effectLevelInput = effectLevelField.children[0];
const effectLevelSlider = effectLevelField.children[1];
const imgUploadPreview = document.querySelector('.img-upload__preview').children[0];

const deleteHiddenClass = () => {
  if (effectLevelSlider.classList.contains('hidden')) {
    effectLevelSlider.classList.remove('hidden');
    effectLevelField.classList.remove('hidden');
  }
  imgUploadPreview.className = '';
};

const effectName = {
  'effects__preview--chrome': ['grayscale', ''],
  'effects__preview--sepia': ['sepia', ''],
  'effects__preview--marvin': ['invert', '%'],
  'effects__preview--phobos': ['blur', 'px'],
  'effects__preview--heat': ['brightness', '']
};

const options = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    selector: 'effects__preview--chrome'
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    selector: 'effects__preview--sepia'
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    selector: 'effects__preview--marvin'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    selector: 'effects__preview--phobos'
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    selector: 'effects__preview--heat'
  }
};

const onSliderUpdate = () => {
  effectLevelInput.value = effectLevelSlider.noUiSlider.get();
  if (imgUploadPreview.className) {
    const effectOptions = effectName[imgUploadPreview.className];
    imgUploadPreview.style.filter =
      `${effectOptions[0]}(${effectLevelInput.value}${effectOptions[1]})`;
  }
};

const updateEffectSlider = (isOriginalPhoto, minSlider, maxSlider, step, effectClass) => {
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = '';
  if (isOriginalPhoto) {
    if (!effectLevelSlider.classList.contains('hidden')) {
      effectLevelField.classList.add('hidden');
      effectLevelSlider.classList.add('hidden');
    }
  } else {
    deleteHiddenClass();
    effectLevelSlider.noUiSlider.updateOptions({
      start: maxSlider,
      range: {
        'min': minSlider,
        'max': maxSlider
      },
      step: step
    });
    imgUploadPreview.classList.add(effectClass);
  }
};


Array.from(document.querySelectorAll('.effects__radio')).forEach((checkbox) => {
  checkbox.addEventListener('change', (evt) => {
    const targetEffect = evt.target.id.split('-')[1];
    if (options[targetEffect]) {
      const { min, max, step, selector } = options[targetEffect];
      updateEffectSlider(false, min, max, step, selector);
      return;
    }
    updateEffectSlider(true);
  });
});

const addListenersOnEffects = () => {
  noUiSlider.create(effectLevelSlider, {
    start: 0,
    range: {
      'min': 0,
      'max': 1
    },
    step: 0.1
  });
  effectLevelSlider.classList.add('hidden');
  effectLevelField.classList.add('hidden');
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
};

const resetEffects = () => {
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = '';
  effectLevelSlider.classList.add('hidden');
  effectLevelField.classList.add('hidden');
};

export {addListenersOnEffects, resetEffects};
