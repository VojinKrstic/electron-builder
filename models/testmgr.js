const dbmgr = require("./dbmgr");
const db = dbmgr.db;

const getNames = () => {
  const query = "SELECT * FROM test";
  const statement = db.prepare(query);
  const res = statement.all();
  return res;
};

exports.getNames = getNames;
