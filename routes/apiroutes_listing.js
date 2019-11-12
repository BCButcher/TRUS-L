let DBAccess = require('../lib/dbAccess');

const dbAccess = new DBAccess();

module.exports = function (app) {
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

  app.get('/api/listing/:id', async function (req, res) {
    try {
      res.status(200);
      let rows = await dbAccess.getListingsWithId(req.params.id);
      res.send(rows);
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
