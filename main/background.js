import { app } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    icon: "../../public/images/logo.png",
    backgroundColor: "#373737",
    minWidth: 500,
    minHeight: 800,
  });

  mainWindow.setTitle("WebSocket Client");
  if (isProd) {
    mainWindow.setMenu(null);

    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
