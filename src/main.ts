import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer' 


app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
});

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

console.log(`isEnvProduction = ${isEnvProduction} - isEnvDevelopment = ${isEnvDevelopment}`);


const createWindow = (): void => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(
        isEnvDevelopment
            ? 'http://localhost:9090'
            : `file://${app.getAppPath()}/index.html`,
    ).finally(() => { /* no action */ });
}

app.on('ready', createWindow);
