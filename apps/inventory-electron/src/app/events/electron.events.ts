/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import {
  app,
  ipcMain,
  IpcMainInvokeEvent,
  webContents,
} from 'electron';

import { environment } from '../../environments/environment';

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle('get-app-version', (event) => {
  console.log(`Fetching application version... [v${environment.version}]`);

  return environment.version;
});

ipcMain.handle(
  'print-page',
  async (event: IpcMainInvokeEvent) => {
    await webContents.getFocusedWebContents().print({
      silent: true,
      deviceName: 'Microsoft Print to PDF',
    });
  }
);

ipcMain.handle('get-printers', async (event: IpcMainInvokeEvent, args: any) => {
  console.log(`Fetching printers... `);
  const printers = await webContents.getFocusedWebContents().getPrintersAsync();
  return printers;
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
