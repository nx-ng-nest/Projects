import {
  contextBridge,
  ipcRenderer,
} from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,

  printers: (args: any) => ipcRenderer.invoke('get-printers', args),
  printPage: () => ipcRenderer.invoke('print-page'),
});
