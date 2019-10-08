export default function initOffcanvasMenu() {
  const hamburger = document.querySelector('.hamburger');
  if (!hamburger) return;

  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.container').classList.toggle('is-open');
  });
}
