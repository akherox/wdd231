const spotlightList = document.querySelector('#spotlight-list');
const levelNames = { 2: 'Silver', 3: 'Gold' };

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function addRow(parent, label, value) {
  const p = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = `${label}: `;
  p.append(strong, value);
  parent.append(p);
}

function createCard(member) {
  const card = document.createElement('article');
  card.className = 'card';

  const header = document.createElement('div');
  header.className = 'card-header';
  const name = document.createElement('h3');
  name.textContent = member.name;
  const tagline = document.createElement('p');
  tagline.textContent = member.tagline;
  header.append(name, tagline);

  const image = document.createElement('img');
  image.src = `images/${member.image}`;
  image.alt = `${member.name} logo`;
  image.width = 100;
  image.height = 100;
  image.loading = 'lazy';

  const info = document.createElement('div');
  info.className = 'info';
  addRow(info, 'Phone', member.phone);
  addRow(info, 'Address', member.address);
  const link = document.createElement('a');
  link.href = member.website;
  link.textContent = member.website.replace('https://', '');
  addRow(info, 'URL', link);
  addRow(info, 'Level', levelNames[member.membership]);

  const body = document.createElement('div');
  body.className = 'card-body';
  body.append(image, info);

  card.append(header, body);
  return card;
}

async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(response.statusText);
    const members = await response.json();
    const eligible = members.filter((member) => member.membership >= 2);
    const count = Math.random() < 0.5 ? 2 : 3;
    shuffle(eligible).slice(0, count).forEach((member) => {
      spotlightList.append(createCard(member));
    });
  } catch (error) {
    spotlightList.textContent = 'Member spotlights are not available right now.';
    console.error(error);
  }
}

loadSpotlights();
