// imports
const electron = require('electron');
const isDev = require('electron-is-dev');
const path = require('path'); // eslint-disable-line no-unused-vars
const url = require('url'); // eslint-disable-line no-unused-vars

const { BrowserWindow } = electron;


// constants
const windowWidth = 364;
const windowHeight = 600;


class TrayWindow {
  constructor() {
    this.window = new BrowserWindow({
      show: false,
      frame: false,
      resizable: false,
      backgroundColor: '#f4f4f4',
      width: windowWidth,
      height: windowHeight,
    });

    // load the index.html of the app.
    const startUrl = isDev ? 'http://localhost:3000' : url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
    this.window.loadURL(startUrl);

    // hide Tray Window on blur
    this.window.on('blur', () => {
      this.window.hide();
    });

    // on close
    this.window.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      this.window = null;
    });
  }
}


module.exports = TrayWindow;
