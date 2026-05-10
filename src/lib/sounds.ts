const SOUNDS = {
  correct: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  wrong: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
  victory: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  pop: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  spin: 'https://assets.mixkit.co/active_storage/sfx/1470/1470-preview.mp3',
};

export const playSound = (type: keyof typeof SOUNDS) => {
  const audio = new Audio(SOUNDS[type]);
  audio.volume = 0.5;
  audio.play().catch(e => console.log('Audio play failed', e));
};
