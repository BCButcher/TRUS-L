/* eslint-disable no-plusplus */
let Connection = require('../config/connection');


class AgentDBAccess {
  constructor() {
    this.sqlDB = new Connection();
  }

  async getAgents() {
    let query = 'SELECT users.id, users.first_name, users.last_name, users.display_name, users.email, agents.phone, agents.license, agents.title, agents.web_site from (users INNER JOIN agents ON users.agent_id = agents.id)';
    const rows = await this.sqlDB.query(query);
    return rows;
  }

  async getAgentWithId(userId) {
    let query = 'SELECT users.id, users.first_name, users.last_name, users.display_name, users.email, agents.phone, agents.license, agents.title, agents.web_site from (users INNER JOIN agents ON users.agent_id = agents.id) WHERE users.id=?';
    let args = [userId];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  async getAgentWithAgentId(agentId) {
    let query = 'SELECT users.id, users.first_name, users.last_name, users.display_name, users.email, agents.phone, agents.license, agents.title, agents.web_site from (users INNER JOIN agents ON users.agent_id = agents.id) WHERE agents.id=?';
    let args = [agentId];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  async deleteAgent(id) {
    let query = 'DELETE FROM agents WHERE id=?';
    let args = [id];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  async updateAgent(id, newAgent) {
    let query = 'UPDATE agents SET license=?, first_name=?, last_name=?, email=?, phone=?, web_site=? WHERE id=?';
    let args = [
      newAgent.license,
      newAgent.first_name,
      newAgent.last_name,
      newAgent.email,
      newAgent.phone,
      newAgent.web_site,
      id
    ];
    const rows = await this.sqlDB.query(query, args);
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
    let rows = await this.sqlDB.query(query, args);

    // Number of rows affected isn't the created consumer. Return the new consumer.
    // We want to retrieve the last consumer created.
    //   1. First get the max id in the table.
    //   2. Then return the consumer with that id.
    query = 'SELECT MAX(id) as id FROM agents';
    rows = await this.sqlDB.query(query);
    const agentId = rows[0].id;


    // To link the agent info to the user info, we need the agent's id
    query = 'INSERT INTO users (display_name, first_name, last_name, email, salt, password, agent_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let salt = this.generateRandomSalt();
    let hashedPassword = this.hashPassword(salt, agentInfo.password);
    args = [
      agentInfo.display_name,
      agentInfo.first_name,
      agentInfo.last_name,
      agentInfo.email,
      salt,
      hashedPassword,
      agentId
    ];

    // execute the query to insert it but we need to return all data, not just user data
    await this.sqlDB.query(query, args);

    // TODO FIX. Replace with call to this.getLastUserCreated()
    query = 'SELECT MAX(id) as id FROM users';
    rows = await this.sqlDB.query(query);
    const userId = rows[0].id;
    rows = await this.getAgentWithId(userId);
    return rows[0];
  }

  // Given a listing id, if the listing is signed, return the contact information
  // of the agent who will process it.
  async getAgentForListing(listingId) {
    let listings = await this.getListingsWithId(listingId);
    let listing = listings[0];
    // console.log(listing);
    if (listing.listing_status === 'Signed') {
      let bids = await this.getBidsForListing(listingId);
      // console.log(bids);
      for (let i = 0; i < bids.length; i++) {
        let bid = bids[i];
        // console.log(bid);
        if (bid.bid_status === 'Signed') {
          let agent = await this.getAgentWithAgentId(bid.agent_id);
          // console.log(agent);
          return agent;
        }
      }
      // No bids are signed. Should never happen.
      console.log(`dbAccess getAgentForListing: Listing ${listingId} is Signed but none of its bids are signed. Returning []`);
      return [];
    }

    console.log(`dbAccess getAgentForListing: the named listing with id ${listing_id} is not signed, which means there is no agent to return.`);
    return [];
  }

  // Called from the dashboard
  // TODO FIX
  // This was getListingsForUser(userId, userType). It is called from the dashboard. Update.
  async getListingsForAgent(userId) {
    // If the user is an agent, we need to show them the listings where
    // their bid is the accepted bid and any listings that they can bid on.
    let query = "SELECT DISTINCT listings.* from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE (bids.bid_status='Signed' AND bids.agent_id=?)";
    let args = [userId];
    const bidRows = await this.sqlDB.query(query, args);

    query = "SELECT DISTINCT * FROM listings WHERE listings.listing_status='Active'";
    const listingRows = await this.sqlDB.query(query);

    const rows = bidRows.concat(listingRows);

    // console.log("dbAccess getListingsForUser");
    // console.log(query);
    // console.log("this works in SQL workbench");
    // eslint-disable-next-line max-len
    // console.log("SELECT DISTINCT listings.* from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE (bids.bid_status='Signed' AND bids.agent_id=?) OR listings.listing_status='Active'")
    // console.log(rows);

    return rows;
  }

  async getBidsForAgentWithIdActiveOrRejected(agentId) {
    let query = 'SELECT listings.*, bids.* from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE (bids.bid_status="Active" OR bids.bid_status="Rejected") AND bids.agent_id=?;';
    let args = [agentId];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  // Get booked bids for an agent. (Could be active or closed too.)
  async getBidsForAgentWithStatus(agentId, bidStatus) {
    // SELECT * FROM bids WHERE bid_status="Active" AND agent_id="1";
    let query = 'SELECT * FROM bids WHERE bid_status="?" AND agent_id="?"';
    let args = [bidStatus, agentId];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  async getBidsAndAgentNameWithBidId(bidId) {
    let query = 'SELECT bids.*, users.first_name, users.last_name from (bids INNER JOIN users ON bids.agent_id = users.agent_id) WHERE bids.id=?';
    let args = [bidId];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  async close() {
    await this.sqlDB.close();
  }
}

module.exports = AgentDBAccess;
