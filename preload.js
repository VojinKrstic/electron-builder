const { contextBridge } = require("electron");
const { getNames, storeData } = require("./models/testmgr.js");

contextBridge.exposeInMainWorld("api", {
  getNames: getNames,
  storeData: storeData,
});
