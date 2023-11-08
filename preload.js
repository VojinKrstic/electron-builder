const { contextBridge } = require("electron");
const { getNames } = require("./models/testmgr.js");

contextBridge.exposeInMainWorld("api", {
  getNames: getNames,
});
