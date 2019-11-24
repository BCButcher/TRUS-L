const express = require('express');
const router = express.Router();
const AgentDBAccess = require('../controller/AgentDBAccess');

const agentDBAccess = new AgentDBAccess();

// Retrieve all agents
router.get('/api/agent', async function (req, res) {
  try {
    res.status(200);
    res.send(await agentDBAccess.getAgents());
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Get the agent with the given id
router.get('/api/agent/:id', async function (req, res) {
  try {
    res.status(200);
    res.send(await agentDBAccess.getAgentWithId(req.params.id));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Delete an agent
router.delete('/api/agent/:id', async function (req, res) {
  try {
    const success = await agentDBAccess.deleteAgent(req.params.id);

    if (success) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    res.send(await agentDBAccess.getAgents());
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Update an agent
router.put('/api/agent/:id', async function (req, res) {
  try {
    const success = await agentDBAccess.updateAgent(req.params.id, req.body);

    if (success) {
      res.status(204); // HTML 204 request succeeded
    } else {
      res.status(404); // HTML status 404 not found
    }
    res.send(await agentDBAccess.getAgents());
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

// Create an agent
router.post('/api/agent', async function (req, res) {
  try {
    res.status(201); // HTML status 201 creation successful
    res.send(await agentDBAccess.createAgent(req.body));
  } catch (err) {
    // Internal error on the server side.
    console.log(err);
    res.status(500);
    res.send(err);
  }
  return res;
});

module.exports = router;
