import {ipcRenderer} from 'electron';

const input = document.getElementById('input') as HTMLInputElement;

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    ipcRenderer.send('process-text', input.value);
    input.value = '';
    window.close();
  } else if (event.key === 'Escape') {
    input.value = '';
    window.close();
  }
});
