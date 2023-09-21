const { app, BrowserWindow, screen, devicePixelRatio } = require('electron');

const createWindow = () => {
    //const devicePixelRatio = devicePixelRatio();
    // const window = new BrowserWindow({
    //     width: screen.width / devicePixelRatio,
    //     height: screen.height / devicePixelRatio
    // });

    const window = new BrowserWindow({
        width: 1400,
        height: 1100
    });
    window.loadFile('./pages/photos.html');
}

app.whenReady().then(createWindow);