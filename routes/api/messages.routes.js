const express = require('express');
const moment = require('moment');

const Message = require('../../models/message.model');

const router = express.Router();

const getMessages = (server) => {
  return new Promise(resolve => {
    Message.find({
      server_id: server
    })
    .then(docs => {
      resolve(docs);
    })
  })
}

router.post('/get', async (req, res) => {
  const {
    server
  } = req.body;

  res.json(await getMessages(server));
});

router.post('/add', (req, res) => {
  const { _id, name } = req.user;
  const { serverId, message } = req.body;

  const doc = new Message({
    server_id: serverId,
    user_id: _id,
    message,
    user_name: name,
    time: moment().valueOf()
  });

  doc.save()
  .then(async () => {
    res.json(await getMessages(serverId));
  })
});

module.exports = router;