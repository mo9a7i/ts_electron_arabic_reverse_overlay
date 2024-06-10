import './index.css';

const input = document.getElementById('input');

input.addEventListener('keydown', (event) => {
  //console.log('event:', event.key)
  if (event.key === 'Enter') {
    window.api.processText(input.value);
    input.value = '';
    window.api.hideWindow();
    //window.close();
  } else if (event.key === 'Escape') {
    input.value = '';
    window.api.hideWindow();
  }
});
