const CryptoJS = require('crypto-js');

let Connection = require('../config/connection');
let AgentDBAccess = require('../controller/AgentDBAccess');

class DBAccess {
  constructor() {
    this.connection = new Connection();
  }

  async deleteBid(id) {
    let query = 'DELETE FROM bids WHERE id=?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  async deleteListing(id) {
    let query = 'DELETE FROM listings WHERE id=?';
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

  //  4. Post new listing
  async createListing(listingInfo) {
    // INSERT INTO listings (poster_id, property_address, listing_status, estimated_value,
    // transaction_type) VALUES (1, "E02", "Active", 1000000, "b");
    let query = 'INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, type_of_home) VALUES (?, ?, ?, ?, ?)';
    let args = [
      listingInfo.poster_id,
      listingInfo.property_address,
      listingInfo.listing_status,
      listingInfo.estimated_value,
      listingInfo.type_of_home
    ];
    let rows = await this.connection.query(query, args);
    // Number of rows affected isn't the created consumer. Return the new consumer.
    // We want to retrieve the last consumer created.
    //   1. First get the max id in the table.
    //   2. Then return the consumer with that id.
    query = 'SELECT MAX(id) as id FROM listings';
    rows = await this.connection.query(query);
    const id = rows[0].id;
    query = 'SELECT * FROM listings WHERE id=?';
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


  //  6. Update listing
  async updateListingStatus(id, listingStatus) {
    // UPDATE listings SET listing_status="Signed" WHERE id=3;
    let query = 'UPDATE listings SET listing_status=? WHERE id=?';
    let args = [listingStatus, id];
    let rows = await this.connection.query(query, args);

    // Retun the updated listing
    query = 'SELECT * FROM listings WHERE id=?';
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

  async getListingsWithId(id) {
    // SELECT * from listings where id = ?
    let query = 'SELECT * from listings where id = ?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  // Called from the dashboard
  async getListingsForConsumer(user_id) {
    let query = 'SELECT * from listings where poster_id = ?';
    let args = [user_id];
    const rows = await this.connection.query(query, args);
    return rows;
  }
  
  //  7. Get all active listings
  async getListings(listingStatus) {
    // console.log('getListings with parameter ' + listingStatus);
    let query = '';
    let rows = '';
    if (listingStatus === undefined) {
      query = 'SELECT * from listings';
      // console.log(query);
      rows = await this.connection.query(query);
    } else {
      // SELECT * from listings WHERE listing_status = ?
      query = 'SELECT * from listings WHERE listing_status = ?';
      // console.log(query);
      let args = [listingStatus];
      rows = await this.connection.query(query, args);
    }
    // console.log("dbAccess rows are");
    // console.log(rows);
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

  
  // Called from the dashboard
  async getListingsForAgent(user_id) {
    // If the user is an agent, we need to show them the listings where
    // their bid is the accepted bid and any listings that they can bid on.
    // SELECT listings.* from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE bids.bid_status='Signed' AND bids.agent_id=1;
    let query = "SELECT DISTINCT listings.* from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE (bids.bid_status='Signed' AND bids.agent_id=?)";
    let args = [user_id];
    const bidRows = await this.connection.query(query, args);

    query = "SELECT DISTINCT * FROM listings WHERE listings.listing_status='Active'";
    const listingRows = await this.connection.query(query);

    const rows = bidRows.concat(listingRows);

    // console.log("dbAccess getListingsForAgent");
    // console.log(query);
    // console.log("this works in SQL workbench");
    // console.log("SELECT DISTINCT listings.* from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE (bids.bid_status='Signed' AND bids.agent_id=?) OR listings.listing_status='Active'")
    // console.log(rows);

    return rows;
  }

  async getBidsForAgentWithIdActiveOrRejected(agent_id) {
    // SELECT listings.*, bids.bid_status from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE (bids.bid_status="Active" OR bids.bid_status="Rejected") AND bids.agent_id=?;
    let query = 'SELECT listings.*, bids.* from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE (bids.bid_status="Active" OR bids.bid_status="Rejected") AND bids.agent_id=?;';
    let args = [agent_id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  // Given a listing id, if the listing is signed, return the contact information
  // of the agent who will process it.
  async getSignedAgentForListing(listing_id) {
    let listings = await this.getListingsWithId(listing_id);
    let listing = listings[0];
    //console.log(listing);
    if(listing.listing_status == 'Signed') {
      let bids = await this.getBidsForListing(listing_id);
      //console.log(bids);
      for(let i=0; i<bids.length; i++) {
        let bid = bids[i];
        //console.log(bid);
        if(bid.bid_status == 'Signed') {
          let agent = await new AgentDBAccess(this.connection).getAgentWithAgentId(bid.agent_id);
          //console.log(agent);
          return agent;
        }
      }
      // No bids are signed. Should never happen.
      console.log(`dbAccess getAgentForListing: Listing ${listing_id} is Signed but none of its bids are signed. Returning []`);
      return [];
    } else {
      console.log(`dbAccess getAgentForListing: the named listing with id ${listing_id} is not signed, which means there is no agent to return.`);
      return [];
    }
  }



  async close() {
    await this.connection.close();
  }
}

module.exports = DBAccess;
