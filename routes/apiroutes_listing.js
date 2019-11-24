const express = require('express');
const ListingsDBAccess = require('../controller/ListingsDBAccess');

const listingsDBAccess = new ListingsDBAccess();
const router = express.Router();

// Retrieve all listings
router.get('/api/listing', async function (req, res) {
  try {
    res.status(200);
    let rows = await listingsDBAccess.getListings();
    res.send(rows);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

router.get('/api/listing/:id', async function (req, res) {
  try {
    res.status(200);
    let rows = await listingsDBAccess.getListingsWithId(req.params.id);
    res.send(rows);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// For a signed listing, return the agent who will be selling the property
// The id is the listing_id
router.get('/api/listing/agent/signed/:id', async function (req, res) {
  try {
    res.status(200);
    let rows = await listingsDBAccess.getSignedAgentForListing(req.params.id);
    res.send(rows);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

router.get('/api/listing/agent/:id', async function (req, res) {
  try {
    res.status(200);
    let rows = await listingsDBAccess.getListingsForAgent(req.params.id);
    res.send(rows);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

router.get('/api/listing/consumer/:id', async function (req, res) {
  try {
    res.status(200);
    let rows = await listingsDBAccess.getListingsForConsumer(req.params.id);
    res.send(rows);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

router.delete('/api/listing/:id', async function (req, res) {
  try {
    const success = await listingsDBAccess.deleteListing(req.params.id);

    if (success) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    res.send(await listingsDBAccess.getListings());
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Update a listings's status, not the entire listing
router.put('/api/listing/:id/:status', async function (req, res) {
  try {
    // console.log("dbAccess put " + "/api/listing/" + req.params.id + "/" + req.params.status);
    const success = await listingsDBAccess.updateListingStatus(req.params.id, req.params.status);

    if (success) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    let listing = await listingsDBAccess.getListingsWithId(req.params.id);
    // console.log("apiroutes_listing");
    // console.log(listing);
    res.send(listing);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Create a listing
router.post('/api/listing', async function (req, res) {
  try {
    const newListing = await listingsDBAccess.createListing(req.body);
    // console.log("apiroutes_listing create a listing");
    // console.log(newListing);
    res.status(201); // HTML status 201 creation successful
    res.send(newListing);
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

  
module.exports = router;

