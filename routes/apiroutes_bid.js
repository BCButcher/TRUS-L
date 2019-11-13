let DBAccess = require('../lib/dbAccess');

const dbAccess = new DBAccess();

module.exports = function (app) {
  // Retrieve all bids
  app.get('/api/bid', async function (req, res) {
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
  app.get('/api/bid/:id?', async function (req, res) {
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
  app.get('/api/bid/consumer/:id', async function (req, res) {
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
  app.get('/api/bid/agent/open/:id', async function (req, res) {
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

  // Get the bids for the listing with the given id
  app.get('/api/bid/listing/:id', async function (req, res) {
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
  app.delete('/api/bid/:id', async function (req, res) {
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
  app.put('/api/bid/:id/:status', async function (req, res) {
    try {
      const success = await dbAccess.updateBidStatus(req.params.id, req.params.status);

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
  app.post('/api/bid', async function (req, res) {
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
};
