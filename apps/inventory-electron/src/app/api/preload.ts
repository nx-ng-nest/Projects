import {
  contextBridge,
  ipcRenderer,
} from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,

  printers: () => ipcRenderer.invoke('get-printers'),
  printPage: () => ipcRenderer.invoke('print-page'),
});
