const results = document.querySelector('#results');
const params = new URLSearchParams(window.location.search);

// Label shown on the page for each form field (name attribute -> text)
const fields = [
  ['first', 'First Name'],
  ['last', 'Last Name'],
  ['phone', 'Cell Phone'],
  ['email', 'Email'],
  ['ordinance', 'Ordinance'],
  ['date', 'Date'],
  ['location', 'Location']
];

if (!params.has('first')) {
  results.textContent = 'No appointment data found. Please fill out the form first.';
} else {
  const list = document.createElement('ul');

  fields.forEach(([name, label]) => {
    const item = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;

    // textContent shows the value as plain text, so any markup in the URL is not run
    const value = document.createTextNode(params.get(name) || 'Not provided');

    item.append(strong, value);
    list.append(item);
  });

  results.append(list);
}
