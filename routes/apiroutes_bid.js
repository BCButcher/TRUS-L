let DBAccess = require('../controller/dbAccess');

const dbAccess = new DBAccess();

const express = require('express');

const router = express.Router();

// Retrieve all bids
router.get('/api/bid', async function (req, res) {
  try {
    res.status(200);
    res.send(await dbAccess.getBids());
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Get the bids with the given bid id
router.get('/api/bid/:id?', async function (req, res) {
  try {
    res.status(200);
    res.send(await dbAccess.getBidWithId(req.params.id));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Get the bids for the consumer with the given consumer id
router.get('/api/bid/consumer/:id', async function (req, res) {
  try {
    res.status(200);
    res.send(await dbAccess.getBidsForConsumerWithId(req.params.id));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Get the bids and listings for the agent, with the given id, but only
// if the bid is Active or Rejected. We don't need Signed or Closed bids.
router.get('/api/bid/agent/open/:id', async function (req, res) {
  try {
    res.status(200);
    res.send(await dbAccess.getBidsForAgentWithIdActiveOrRejected(req.params.id));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Get the bid and agent name for the bid with the given id.
router.get('/api/bid/agent/:id', async function (req, res) {
  try {
    res.status(200);
    res.send(await dbAccess.getBidsAndAgentNameWithBidId(req.params.id));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Get the bids for the listing with the given id
router.get('/api/bid/listing/:id', async function (req, res) {
  try {
    res.status(200);
    let result = await dbAccess.getBidsForListing(req.params.id);
    res.send(result);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Delete a bid
router.delete('/api/bid/:id', async function (req, res) {
  try {
    const success = await dbAccess.deleteBid(req.params.id);

    if (success) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    res.send(await dbAccess.getBids());
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Update a bid's status
router.put('/api/bid/:id/:status', async function (req, res) {
  try {
    console.log("apiroutes_bids update bid status " + req.params.id + " " + req.params.status);
    let row = await dbAccess.updateBidStatus(req.params.id, req.params.status);

    if (row) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    // let bids = await dbAccess.getBidWithId(req.params.id);
    console.log("apiroutes_bids update bid status ");
    console.log(row);
    res.send(row);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Update a bid's status and options
router.put('/api/bid/active/:id/:services/:message', async function (req, res) {
  try {
    console.log("apiroutes_bids  /api/bid/active/" + req.params.id);
    let row = await dbAccess.updateBidOptions(req.params.id, req.params.services, req.params.message);

    if (row) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    // let bids = await dbAccess.getBidWithId(req.params.id);
    console.log("apiroutes_bids update bid status ");
    console.log(row);
    res.send(row);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});


router.put('/api/bid/rejected/:id/:reason', async function (req, res) {
  try {
    console.log("apiroutes_bid /api/bid/rejected/" + req.params.id + " " + req.params.reason);
    const success = await dbAccess.updateBidRejected(req.params.id, req.params.reason);

    if (success) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    res.send(await dbAccess.getBids(req.params.status));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});


// Create a bid
router.post('/api/bid', async function (req, res) {
  try {
    res.status(201); // HTML status 201 creation successful
    res.send(await dbAccess.createBid(req.body));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

module.exports = router;

