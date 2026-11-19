const results = document.querySelector('#results');
const params = new URLSearchParams(window.location.search);

const fields = [
  ['first', 'First Name'],
  ['last', 'Last Name'],
  ['email', 'Email'],
  ['phone', 'Mobile Phone'],
  ['business', 'Business Name'],
  ['timestamp', 'Date and Time']
];

if (!params.has('first')) {
  results.textContent = 'No application data found. Please fill out the join form first.';
} else {
  const list = document.createElement('ul');

  fields.forEach(([name, label]) => {
    const item = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;
    item.append(strong, document.createTextNode(params.get(name) || 'Not provided'));
    list.append(item);
  });

  results.append(list);
}
