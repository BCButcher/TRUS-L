let DBAccess = require('../lib/dbAccess');

const dbAccess = new DBAccess();

module.exports = function (app) {
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
};
