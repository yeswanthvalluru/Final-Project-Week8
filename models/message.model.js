const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  server_id: {
    type: ObjectId
  },
  user_id: {
    type: ObjectId
  },
  message: {
    type: String
  },
  user_name: String,
  time: Number
});

const Server = mongoose.model('message', serverSchema);

module.exports = Server;