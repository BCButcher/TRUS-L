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

};
