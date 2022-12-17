const express = require('express');

const Server = require('../../models/server.model');

const router = express.Router();

const getServers = () => {
  return new Promise(resolve => {
    Server.find()
    .then(docs => {
      resolve(docs);
    })
  })
}

router.post('/add', (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;

  const doc = new Server({
    user_id: _id,
    server_name: name
  })

  doc.save()
  .then(async () => {
    res.json(await getServers());
  })
});

router.post('/get', async (req, res) => {
  res.json(await getServers());
})

router.post('/remove', (req, res) => {
  const { id } = req.body;

  Server.findOneAndDelete({
    _id: id
  })
  .then(async () => {
    res.json(await getServers());
  })
})

module.exports = router;