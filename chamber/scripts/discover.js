import { places } from '../data/places.mjs';

const container = document.querySelector('#places');

places.forEach((place, index) => {
  const card = document.createElement('section');
  card.className = 'place';
  card.style.gridArea = `p${index + 1}`;

  const title = document.createElement('h2');
  title.textContent = place.name;

  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = place.image;
  img.alt = place.alt;
  img.width = 300;
  img.height = 200;
  img.loading = index === 0 ? 'eager' : 'lazy';
  figure.appendChild(img);

  const address = document.createElement('address');
  address.textContent = place.address;

  const description = document.createElement('p');
  description.textContent = place.description;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Learn more';
  button.setAttribute('aria-label', `Learn more about ${place.name}`);
  button.addEventListener('click', () => {
    const query = encodeURIComponent(`${place.name}, ${place.address}`);
    const url = place.link || `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank', 'noopener');
  });

  card.append(title, figure, address, description, button);
  container.appendChild(card);
});

const box = document.querySelector('#visit-message');
const text = document.querySelector('#visit-text');
const DAY = 1000 * 60 * 60 * 24;
const now = Date.now();
let last = null;

try {
  last = Number(localStorage.getItem('discover-last-visit')) || null;
  localStorage.setItem('discover-last-visit', now);
} catch {
  last = null;
}

if (!last) {
  text.textContent = 'Welcome! Let us know if you have any questions.';
} else {
  const diff = now - last;
  if (diff < DAY) {
    text.textContent = 'Back so soon! Awesome!';
  } else {
    const days = Math.floor(diff / DAY);
    text.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
  }
}
box.hidden = false;
document.querySelector('#visit-close').addEventListener('click', () => { box.hidden = true; });
