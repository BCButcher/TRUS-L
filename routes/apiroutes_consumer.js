let DBAccess = require('../controller/dbAccess');

const UserDBAccess = require("../controller/UserDBAccess");
const userDBAccess = new UserDBAccess();

const express = require('express');

const router = express.Router();

// Retrieve all consumers
router.get('/api/consumer', async function (req, res) {
  try {
    res.status(200);
    res.send(await userDBAccess.getUsers());
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

router.get('/api/consumer/last', async function (req, res) {
  try {
    res.status(200);
    res.send(await userDBAccess.getLastUserCreated());
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

router.get('/api/consumer/:id', async function (req, res) {
  try {
    res.status(200);
    res.send(await userDBAccess.getUserWithId(req.params.id));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Delete a consumer
router.delete('/api/consumer/:id', async function (req, res) {
  try {
    const success = await userDBAccess.deleteUser(req.params.id);

    if (success) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    res.send(await userDBAccess.getUsers());
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Update a consumer
router.put('/api/consumer/:id', async function (req, res) {
  try {
    const success = await userDBAccess.updateUser(req.params.id, req.body);

    if (success) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    res.send(await userDBAccess.getUserWithId(req.params.id));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Create a consumer
router.post('/api/consumer', async function (req, res) {
  try {
    res.status(201); // HTML status 201 creation successful
    res.send(await userDBAccess.createUser(req.body));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

module.exports = router;
