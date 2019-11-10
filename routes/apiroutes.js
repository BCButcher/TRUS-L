let DBAccess = require('../lib/dbAccess');

const dbAccess = new DBAccess();

module.exports = function (app) {
  // Retrieve all agents
  app.get('/api/agent', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.getAgents());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  app.get('/api/consumer/:id/:password', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.verifyConsumerPassword(req.params.id, req.params.password));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  app.get('/api/agent/:id/:password', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.verifyAgentPassword(req.params.id, req.params.password));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Retrieve all consumers
  app.get('/api/consumer', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.getConsumers());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

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

  // Retrieve all listings
  app.get('/api/listing', async function (req, res) {
    try {
      res.status(200);
      let rows = await dbAccess.getListings();
      res.send(rows);
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Get the agent with the given id
  app.get('/api/agent/:id', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.getAgentWithId(req.params.id));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Get the bids for with the given bid id
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


  // Get the bids for the listing with the given id
  app.get('/api/bid/listing/:listing_id', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.getBidsForListing(req.params.listing_id));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Delete an agent
  app.delete('/api/agent/:id', async function (req, res) {
    try {
      const success = await dbAccess.deleteAgent(req.params.id);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(await dbAccess.getAgents());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Delete a consumer
  app.delete('/api/consumer/:id', async function (req, res) {
    try {
      const success = await dbAccess.deleteConsumer(req.params.id);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(await dbAccess.getConsumers());
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

  app.delete('/api/listing/:id', async function (req, res) {
    try {
      const success = await dbAccess.deleteListing(req.params.id);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(await dbAccess.getListings());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Update an agent
  app.put('/api/agent/:id', async function (req, res) {
    try {
      const success = await dbAccess.updateAgent(req.params.id, req.body);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(await dbAccess.getAgents());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Update a consumer
  app.put('/api/consumer/:id', async function (req, res) {
    try {
      const success = await dbAccess.updateConsumer(req.params.id, req.body);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(await dbAccess.getConsumers());
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

  // Update a listings's status, not the entire listing
  app.put('/api/listing/:id/:status', async function (req, res) {
    try {
      const success = await dbAccess.updateListingStatus(req.params.id, req.params.status);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(await dbAccess.getListings(req.params.status)); 
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });


  // Create an agent
  app.post('/api/agent', async function (req, res) {
    try {
      res.status(201); // HTML status 201 creation successful
      res.send(await dbAccess.createAgent(req.body));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Create a consumer
  app.post('/api/consumer', async function (req, res) {
    try {
      res.status(201); // HTML status 201 creation successful
      res.send(await dbAccess.createConsumer(req.body));
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

  // Create a listing
  app.post('/api/listing', async function (req, res) {
    try {
      res.status(201); // HTML status 201 creation successful
      res.send(await dbAccess.createListing(req.body));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });
};
