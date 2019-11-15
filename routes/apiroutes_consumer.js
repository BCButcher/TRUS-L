let DBAccess = require('../lib/dbAccess');

const dbAccess = new DBAccess();

module.exports = function (app) {
  // Retrieve all consumers
  app.get('/api/consumer', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.getUsers());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  app.get('/api/consumer/last', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.getLastUserCreated());
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });

  app.get('/api/consumer/:id', async function (req, res) {
    try {
      res.status(200);
      res.send(await dbAccess.getUserWithId(req.params.id));
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
      const success = await dbAccess.deleteUser(req.params.id);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(await dbAccess.getUsers());
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
      const success = await dbAccess.updateUser(req.params.id, req.body);

      if (success) {
        res.status(204); // HTML 204 request succeeded
      } else {
        res.status(404); // HTML status 404 not found
      }
      res.send(await dbAccess.getUserWithId(req.params.id));
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
      res.send(await dbAccess.createUser(req.body));
    } catch (err) {
      // Internal error on the server side.
      console.log(err);
      res.status(500);
      res.send(err);
    }
    return res;
  });
};
