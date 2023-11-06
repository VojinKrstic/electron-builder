const { app, BrowserWindow } = require("electron");
const { spawn } = require("node:child_process");
const path = require("node:path");
import Store from "electron-store";
const store = new Store();

// IPC listener
ipcMain.on("electron-store-get", async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on("electron-store-set", async (event, key, val) => {
  store.set(key, val);
});

let nextServerProcess;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "public/loading.html"));

  // Moze i ne mora da bude ovde, ako se pre pokrene rucno
  const nextBuildProcess = spawn("npm", ["run", "build"], {
    shell: true,
  });

  nextBuildProcess.on("exit", (code) => {
    if (code !== 0) {
      console.error("Next Build Failed!");
    }

    nextServerProcess = spawn("npm", ["start"], {
      shell: true,
      detached: true, // da bi mogao da se ugasi server inace zauzme port do reseta racunara
    });

    nextServerProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    nextServerProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    win.loadURL("http://localhost:3003");
  });

  win.webContents.openDevTools();

  // win.on('closed', () => {
  //     console.log('zatvara', nextServerProcess.pid, nextServerProcess.killed);
  //     kill(nextServerProcess.pid);
  //     console.log('kenny: ', nextServerProcess.killed);
  // })
};

app.whenReady().then(() => {
  createWindow();
});

app.on("before-quit", () => {
  console.log(nextServerProcess.pid);
  nextServerProcess.kill(); // ne radi????
});

app.on("window-all-closed", () => {
  // if (nextServerProcess) {
  //     console.log('kill!!!', nextServerProcess, nextServerProcess.pid);
  //     process.kill(nextServerProcess.pid); ne radi
  // }
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
