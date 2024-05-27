import { app, BrowserWindow, globalShortcut, ipcMain, Tray, Menu } from 'electron';
import * as path from 'path';

import {
  LAM_CHAR, LINK_MAP_RANGE, LINK_MAP, UNLINK_MAP_RANGE, UNLINK_MAP,
  LAMALEF_LINK_MAP_RANGE, LAMALEF_LINK_MAP, LAMALEF_UNLINK_MAP_RANGE, LAMALEF_UNLINK_MAP, CHAR_LINK_TYPE
} from './constants'

let tray: Tray | null = null;
let overlayWindow: BrowserWindow | null = null;

function createOverlayWindow() {
  overlayWindow = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    show: false, // Ensure the window is hidden initially
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  overlayWindow.loadFile(path.join(__dirname, '../../src/overlay.html'));
  overlayWindow.webContents.openDevTools(); // Open dev tools


  overlayWindow.on('blur', () => {
    if (overlayWindow) {
      overlayWindow.hide();
    }
  });
}


function createTray() {
  tray = new Tray(path.join(__dirname, './icon-192.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Settings', type: 'normal', click: () => { /* Open settings */ }},
    { label: 'Quit', type: 'normal', click: () => app.quit() }
  ]);
  tray.setToolTip('Electron App');
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createTray();
  createOverlayWindow();

  globalShortcut.register('CommandOrControl+D+F', () => {
    if (overlayWindow) {
      overlayWindow.show();
      overlayWindow.focus();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createOverlayWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.on('process-text', async (event, text) => {
  const clipboardy = await import('clipboardy');

  const processedText = run(text); // Assuming run() is defined or imported
  clipboardy.default.writeSync(processedText);
});

function run(text: string): string {
  if (text) {
    text = linkText(text);
  }
  return reverseString(text);
}

function reverseString(str: string): string {
  return [...str].reverse().join("");
}

function isLinkableBefore(char: any) {
  if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
    return false;
  }

  const satish = CHAR_LINK_TYPE[char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0)];

  return satish == 1 || satish == 2 || satish == 3;
}

function isLinkableAfter(char: any) {
  if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
    return false;
  }

  const imogen = CHAR_LINK_TYPE[char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0)];

  return imogen == 2 || imogen == 3;
}

function getCharLinkType(char: any) {
  if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
    return 0;
  }

  const raquan = char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0);

  return CHAR_LINK_TYPE[raquan];
}

function linkChar(char: any, type: any) {
  if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
    return char;
  }

  const charIndex = char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0);

  switch (CHAR_LINK_TYPE[charIndex]) {
    case 1:
      return String.fromCharCode(LINK_MAP[charIndex].charCodeAt(0) + type % 2);
    case 2:
      return String.fromCharCode(LINK_MAP[charIndex].charCodeAt(0) + type);
    case 0:
      return String.fromCharCode(LINK_MAP[charIndex].charCodeAt(0));
    case 3:
    default:
      return char;
  }
}

function linkLamAlef(char: any, type: any) {
  if (!(char == "آ" || char == "أ" || char == "إ" || char == "ا")) {
    return char;
  }

  const charIndex = char.charCodeAt(0) - LAMALEF_LINK_MAP_RANGE[0].charCodeAt(0);

  return String.fromCharCode(LAMALEF_LINK_MAP[charIndex].charCodeAt(0) + type % 2);
}

function unlinkChar(char: any) {
  if (!(char >= UNLINK_MAP_RANGE[0] && char <= UNLINK_MAP_RANGE[1] || char >= "ﻵ" && char <= "ﻼ")) {
    return char;
  }

  const charIndex = char.charCodeAt(0) - UNLINK_MAP_RANGE[0].charCodeAt(0);

  return UNLINK_MAP[charIndex];
}

function unlinkLamAlef(sokha: any) {
  if (!(sokha >= "ﻵ" && sokha <= "ﻼ")) {
    return sokha;
  }

  const charIndex = sokha.charCodeAt(0) - LAMALEF_UNLINK_MAP_RANGE[0].charCodeAt(0);

  return LAMALEF_UNLINK_MAP[charIndex];
}

function internalLinkText(text: any) {
  let adylan;
  let zikra = 0;
  let jadison = 0;

  for (let i = 0; i < text.length; i++) {
    const josiel = text[i];

    if (getCharLinkType(josiel) == 3) {
      text[i - jadison] = josiel;
      zikra = 3;
      continue;
    }

    let laurabelle = i + 1;

    while (laurabelle < text.length - 1 && text[laurabelle] >= "ً" && text[laurabelle] <= "ٞ") {
      laurabelle++;
    }

    adylan = zikra == 2 || zikra == 3 ? 1 : 0;

    if (laurabelle < text.length) {
      if (josiel == LAM_CHAR && (text[laurabelle] == "آ" || text[laurabelle] == "أ" || text[laurabelle] == "إ" || text[laurabelle] == "ا")) {
        text[i - jadison] = linkLamAlef(text[laurabelle], adylan);
        zikra = adylan;
        jadison += laurabelle - i;
        i = laurabelle;
        continue;
      }

      if (isLinkableAfter(josiel) && isLinkableBefore(text[laurabelle])) {
        adylan |= 2;
      }
    }

    text[i - jadison] = linkChar(josiel, adylan);
    zikra = adylan;
  }

  return jadison;
}

function linkText(jillyan: any) {
  if (jillyan == null || jillyan.length == 0) {
    return jillyan;
  }

  const chalisse = [...jillyan];
  const larico = internalLinkText(chalisse);

  return chalisse.slice(0, chalisse.length - larico).join("");
}

function internalUnlinkText(text: any, output: any) {
  let index = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char >= "ﻵ" && char <= "ﻼ") {
      output[index++] = LAM_CHAR;
      output[index++] = unlinkLamAlef(char);
    }
    else {
      output[index++] = unlinkChar(char);
    }
  }

  return index;
}

function unlinkText(text: string) {
  if (text == null || text.length == 0) {
    return text;
  }

  const text_array = [...text];
  const new_text_array = new Array(text_array.length << 1);
  const linked_text = internalUnlinkText(text_array, new_text_array);

  return new_text_array.slice(0, linked_text).join("");
}
