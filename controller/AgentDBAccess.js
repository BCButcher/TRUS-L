/* eslint-disable no-plusplus */
let Connection = require('../config/connection');
let UserDBAccess = require("./UserDBAccess");


class AgentDBAccess extends UserDBAccess {
  constructor(connection) {
    super(connection);
  }

  async getAgents() {
    let query = 'SELECT users.id, users.first_name, users.last_name, users.display_name, users.email, agents.phone, agents.license, agents.title, agents.web_site from (users INNER JOIN agents ON users.agent_id = agents.id)';
    const rows = await this.connection.query(query);
    return rows;
  }

  async getAgentWithId(user_id) {
    let query = 'SELECT users.id, users.first_name, users.last_name, users.display_name, users.email, agents.phone, agents.license, agents.title, agents.web_site from (users INNER JOIN agents ON users.agent_id = agents.id) WHERE users.id=?';
    let args = [user_id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  async getAgentWithAgentId(agent_id) {
    let query = 'SELECT users.id, users.first_name, users.last_name, users.display_name, users.email, agents.phone, agents.license, agents.title, agents.web_site from (users INNER JOIN agents ON users.agent_id = agents.id) WHERE agents.id=?';
    let args = [agent_id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  async deleteAgent(id) {
    let query = 'DELETE FROM agents WHERE id=?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  async updateAgent(id, newAgent) {
    let query = 'UPDATE agents SET license=?, first_name=?, last_name=?, email=?, phone=?, web_site=? WHERE id=?';
    let args = [newAgent.license, newAgent.first_name, newAgent.last_name, newAgent.email, newAgent.phone, newAgent.web_site, id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  //  2. Post new agent
  async createAgent(agentInfo) {
    // INSERT INTO agents (license, first_name, last_name, email, phone, web_site)
    //    VALUES (123456789, "Abby", "Banksy", "abbybanksy@broker.ca", "416-123-4567", "https://www.abbybanksy.com");
    let query = 'INSERT INTO agents (license, phone, web_site, title) VALUES (?, ?, ?, ?)';
    let args = [
      agentInfo.license,
      agentInfo.phone,
      agentInfo.web_site,
      agentInfo.title
    ];
    let rows = await this.connection.query(query, args);

    // Number of rows affected isn't the created consumer. Return the new consumer.
    // We want to retrieve the last consumer created.
    //   1. First get the max id in the table.
    //   2. Then return the consumer with that id.
    query = 'SELECT MAX(id) as id FROM agents';
    rows = await this.connection.query(query);
    const agent_id = rows[0].id;

    const userPart = await super.createUser(agentInfo, agent_id);

    // Now to get the user portion of the agent information we need the "users" table's id.
    // getAgentWithId calls an inner join and returns a combination of user and agent info.
    const user_id = userPart.id;
    rows = await this.getAgentWithId(user_id);
    return rows[0];
  }

  async close() {
    await this.connection.close();
  }
}

module.exports = AgentDBAccess;
