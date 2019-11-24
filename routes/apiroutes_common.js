let DBAccess = require('../controller/dbAccess');

const express = require('express');
const UserDBAccess = require('../controller/UserDBAccess');

const userDBAccess = new UserDBAccess();
const router = express.Router();


router.post('/api/:id/:password', async function (req, res) {
  try {
    res.status(200);
    res.send(await userDBAccess.verifyPassword(req.params.id, req.params.password));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});


module.exports = router;
