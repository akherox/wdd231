document.querySelector('#timestamp').value = new Date().toLocaleString('en-US');

document.querySelectorAll('.level-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.close-modal').addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});
