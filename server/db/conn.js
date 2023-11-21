const { MongoClient } = require("mongodb");
const ATLAS_URI = process.env.ATLAS_URI;
const client = new MongoClient(ATLAS_URI);

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("sample_guides");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
