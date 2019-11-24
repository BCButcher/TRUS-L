require('dotenv').config();

let Connection = require('../config/connection');

class BidsDBAccess {
  constructor(connection) {
    if(connection === undefined) {
      this.connection = new Connection();
    }
    else {
      this.connection = connection;
    }
  }

  async deleteBid(id) {
    let query = 'DELETE FROM bids WHERE id=?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
  }


  //  3. Post new bid
  async createBid(bidInfo) {
    // console.log(bidInfo);
    // INSERT INTO bids (agent_id, listing_id, bid_status, services, message)
    let message = unescape(bidInfo.message);
    //    VALUES (2, 1, "Active", "f", "Hire me because I am your mother.");
    let query = 'INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (?, ?, ?, ?, ?)';
    let args = [
      bidInfo.agent_id,
      bidInfo.listing_id,
      bidInfo.bid_status,
      bidInfo.services,
      message
    ];
    let rows = await this.connection.query(query, args);
    // Number of rows affected isn't the created consumer. Return the new consumer.
    // We want to retrieve the last consumer created.
    //   1. First get the max id in the table.
    //   2. Then return the consumer with that id.
    query = 'SELECT MAX(id) as id FROM bids';
    rows = await this.connection.query(query);
    const id = rows[0].id;
    query = 'SELECT * FROM bids WHERE id=?';
    args = [id];
    rows = await this.connection.query(query, args);
    return rows[0];
  }

  //  5. Update bid
  async updateBidStatus(id, bidStatus) {
    // UPDATE bids SET bid_status="Booked" WHERE id=4;
    let query = 'UPDATE bids SET bid_status=? WHERE id=?';
    let args = [bidStatus, id];
    let rows = await this.connection.query(query, args);

    // Return the updated Bid
    query = 'SELECT * FROM bids WHERE id=?';
    args = [id];
    rows = await this.connection.query(query, args);
    // console.log("dbAccess updateBidStatus");
    // console.log(rows[0]);
    return rows[0];
  }

  async updateBidOptions(id, services, encodedMessage) {
    // UPDATE bids SET bid_status="Booked" WHERE id=4;
    let message = unescape(encodedMessage);
    let query = 'UPDATE bids SET bid_status="Active", services=?, message=? WHERE id=?';
    let args = [services, message, id];
    let rows = await this.connection.query(query, args);

    // Return the updated Bid
    query = 'SELECT * FROM bids WHERE id=?';
    args = [id];
    rows = await this.connection.query(query, args);
    // console.log("dbAccess updateBidStatus");
    // console.log(rows[0]);
    return rows[0];
  }


  async updateBidRejected(id, encodedRejectionReason) {
    // console.log("dbAccess updateBidRejected " + id + " " + rejectionReason)
    // UPDATE bids SET bid_status="Booked" WHERE id=4;
    let rejectionReason = unescape(encodedRejectionReason);
    let query = 'UPDATE bids SET rejection_reason=?, bid_status="Rejected" WHERE id=?';
    let args = [rejectionReason, id];
    let rows = await this.connection.query(query, args);

    // Return the updated Bid
    query = 'SELECT * FROM bids WHERE id=?';
    args = [id];
    rows = await this.connection.query(query, args);
    return rows[0];
  }

  async getBidsForUserWithId(id) {
    // SELECT * from bids where poster_id = ?
    let query = 'SELECT * from bids where poster_id = ?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  //  8. Get all bids
  async getBids() {
    // SELECT * from bids;
    let query = 'SELECT * from bids';
    const rows = await this.connection.query(query);
    return rows;
  }

  async getBidWithId(id) {
    // SELECT * from bids WHERE id=1;
    let query = 'SELECT * FROM bids WHERE id=?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  //  9. Get all bids for a listing
  async getBidsWithStatus(bidStatus) {
    // SELECT * from bids WHERE listing_status = ?
    let query = 'SELECT * from bids WHERE bid_status = ?';
    let args = [bidStatus];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  // Get booked bids for an agent. (Could be active or closed too.)
  // 10. Get all booked bids for agent
  async getBidsForAgentWithStatus(agentId, bidStatus) {
    // SELECT * FROM bids WHERE bid_status="Active" AND agent_id="1";
    let query = 'SELECT * FROM bids WHERE bid_status="?" AND agent_id="?"';
    let args = [bidStatus, agentId];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  async getBidsAndAgentNameWithBidId(bidId) {
    let query = 'SELECT bids.*, users.first_name, users.last_name from (bids INNER JOIN users ON bids.agent_id = users.agent_id) WHERE bids.id=?';
    let args = [bidId];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  // 11. Get all bids on a listing
  async getBidsForListing(listingId) {
    // SELECT * from bids WHERE listing_id=3;
    let query = 'SELECT bids.*, users.first_name, users.last_name from (bids INNER JOIN users ON bids.agent_id = users.agent_id) WHERE listing_id=?';
    let args = [listingId];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  async getBidsForAgentWithIdActiveOrRejected(agent_id) {
    // SELECT listings.*, bids.bid_status from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE (bids.bid_status="Active" OR bids.bid_status="Rejected") AND bids.agent_id=?;
    let query = 'SELECT listings.*, bids.* from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE (bids.bid_status="Active" OR bids.bid_status="Rejected") AND bids.agent_id=?;';
    let args = [agent_id];
    const rows = await this.connection.query(query, args);
    return rows;
  }



  async close() {
    await this.connection.close();
  }
}

module.exports = BidsDBAccess;
