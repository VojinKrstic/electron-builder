const dbmgr = require("./dbmgr");
const https = require("https");

const db = dbmgr.db;

const getNames = () => {
  const query = "SELECT * FROM test";
  const statement = db.prepare(query);
  const res = statement.all();
  return res;
};

const storeData = () => {
  https
    .get("https://catfact.ninja/fact", (resp) => {
      let data = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        const name = JSON.parse(data).fact;
        const query = `INSERT INTO test (name) VALUES ('${name}')`;
        db.exec(query);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

exports.getNames = getNames;
exports.storeData = storeData;
