import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  processText: (text) => ipcRenderer.send('process-text', text),
    hideWindow: () => ipcRenderer.send('hide-window'),
});
