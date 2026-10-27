const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
  const isOpen = navButton.classList.toggle('show');
  navBar.classList.toggle('show');
  navButton.setAttribute('aria-expanded', isOpen);
});
