const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

let _db;

module.exports = {
  connectToServer: async function (callback) {

    try {
      await client.connect();
    } catch (e) {
      console.error(e);
    }

    _db = client.db("MongoDB");

    return (_db === undefined ? false : true);
  },
  getDb: function () {
    return _db;
  },
};