import { lory } from 'lory.js';
import imagesLoaded from 'imagesloaded';

export default function() {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  imagesLoaded(slider).on('always', () => {
    slider.classList.remove('is-loading');
    lory(slider, { infinite: 2, enableMouseEvents: true });
  });
}
