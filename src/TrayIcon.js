const Positioner = require('electron-positioner');

// electron imports
const electron = require('electron');
const path = require('path'); // eslint-disable-line no-unused-vars
const url = require('url'); // eslint-disable-line no-unused-vars

const { Tray } = electron;


class TrayIcon {
  constructor(trayWindow) {
    // tray icon image path
    const iconName = './icon.png';
    const iconPath = path.join(__dirname, iconName);

    // create tray icon
    this.trayIcon = new Tray(iconPath);
    this.trayIcon.setToolTip('CopyPasta');

    this.trayIcon.on('click', (e, bounds) => {
      if (trayWindow.isVisible()) {
        trayWindow.hide();
      } else {
        const positioner = new Positioner(trayWindow);
        positioner.move('trayCenter', bounds);

        trayWindow.show();
      }
    });
  }
}


module.exports = TrayIcon;
