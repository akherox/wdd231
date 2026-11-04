const container = document.querySelector('#members');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');
const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(response.statusText);
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    container.textContent = 'Sorry, the member list could not be loaded.';
    console.error(error);
  }
}

function addRow(parent, label, value) {
  const p = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = `${label}: `;
  p.append(strong, value);
  parent.append(p);
}

function displayMembers(members) {
  members.forEach((member) => {
    const card = document.createElement('article');
    card.className = 'card';

    const header = document.createElement('div');
    header.className = 'card-header';
    const name = document.createElement('h2');
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
    addRow(info, 'Address', member.address);
    addRow(info, 'Phone', member.phone);
    addRow(info, 'Level', levels[member.membership]);
    const link = document.createElement('a');
    link.href = member.website;
    link.textContent = member.website.replace('https://', '');
    addRow(info, 'URL', link);

    const body = document.createElement('div');
    body.className = 'card-body';
    body.append(image, info);

    card.append(header, body);
    container.append(card);
  });
}

function setView(view) {
  container.classList.toggle('grid', view === 'grid');
  container.classList.toggle('list', view === 'list');
  gridButton.setAttribute('aria-pressed', view === 'grid');
  listButton.setAttribute('aria-pressed', view === 'list');
}

gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

getMembers();
