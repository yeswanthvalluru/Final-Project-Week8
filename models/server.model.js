const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId
  },
  server_name: {
    type: String
  }
});

const Server = mongoose.model('server', serverSchema);

module.exports = Server;