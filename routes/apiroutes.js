let DBAccess = require('../lib/dbAccess');

const dbAccess = new DBAccess();

module.exports = function (app) {
  // Retrieve all agents
  app.get('/api/agent', function (req, res) {
    try {
      res.status(200);
      res.send(dbAccess.getAgents());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.json(err);
    }
    return res;
  });

  // Retrieve all consumers
  app.get('/api/consumer', function (req, res) {
    try {
      res.status(200);
      res.json(dbAccess.getConsumers());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.json(err);
    }
    return res;
  });

  // Retrieve all bids
  app.get('/api/bid', function (req, res) {
    try {
      res.status(200);
      res.json(dbAccess.getBids());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Retrieve all listings
  app.get('/api/listing', function (req, res) {
    try {
	  console.log('/api/listing');
      res.status(200);
      res.json(dbAccess.getListings());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Delete an agent
  app.delete('/api/agent/:id', function (req, res) {
    try {
      const success = dbAccess.deleteAgent(req.params.id);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(dbAccess.getAgents());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Delete a consumer
  app.delete('/api/consumer/:id', function (req, res) {
    try {
      const success = dbAccess.deleteConsumer(req.params.id);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(dbAccess.getConsumers());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Delete a bid
  app.delete('/api/bid/:id', function (req, res) {
    try {
      const success = dbAccess.deleteBid(req.params.id);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(dbAccess.getBids());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  app.delete('/api/listing/:id', function (req, res) {
    try {
      const success = dbAccess.deleteListing(req.params.id);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(dbAccess.getListings());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Update an agent
  app.put('/api/agent/:id', function (req, res) {
    try {
      const success = dbAccess.updateAgent(req.params.id, req.body);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(dbAccess.getAgents());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Update a consumer
  app.put('/api/consumer/:id', function (req, res) {
    try {
      const success = dbAccess.updateConsumer(req.params.id, req.body);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(dbAccess.getConsumers());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });


  // Update a bid's status
  app.put('/api/bid/:id/:status', function (req, res) {
    try {
      const success = dbAccess.updateBidStatus(req.params.id, req.params.status);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(dbAccess.getBids(req.params.status));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Update a listings's status, not the entire listing
  app.put('/api/listing/:id/:status', function (req, res) {
    try {
      const success = dbAccess.updateListingStatus(req.params.id, req.params.status);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(dbAccess.getListings(req.params.status)); 
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });


  // Create an agent
  app.post('/api/agent', function (req, res) {
    try {
      res.status(201); // HTML status 201 creation successful
      res.send(dbAccess.createAgent(req.body));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Create a consumer
  app.post('/api/consumer', function (req, res) {
    try {
      res.status(201); // HTML status 201 creation successful
      res.send(dbAccess.createConsumer(req.body));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Create a bid
  app.post('/api/bid', function (req, res) {
    try {
      res.status(201); // HTML status 201 creation successful
      res.send(dbAccess.createBid(req.body));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  // Create a listing
  app.post('/api/listing', function (req, res) {
    try {
      res.status(201); // HTML status 201 creation successful
      res.send(dbAccess.createListing(req.body));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });
};
