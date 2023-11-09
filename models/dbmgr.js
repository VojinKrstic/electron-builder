const sqlite = require("better-sqlite3");
const path = require("path");

const db = new sqlite(
  path.join(__dirname, "../mytest.db").replace("\app.asar", "")
);
exports.db = db;
