import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  processText: (text: string) => ipcRenderer.send('process-text', text)
});
