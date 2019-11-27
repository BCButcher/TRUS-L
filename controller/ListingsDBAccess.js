require('dotenv').config();

let Connection = require('../config/connection');

class ListingsDBAccess {
  constructor(connection) {
    if(connection === undefined) {
      this.connection = new Connection();
    }
    else {
      this.connection = connection;
    }
  }

  async deleteListing(id) {
    let query = 'DELETE FROM listings WHERE id=?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
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

  async getListingsWithId(id) {
    // SELECT * from listings where id = ?
    let query = 'SELECT * from listings where id = ?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  // Called from the dashboard
  async getListingsForConsumer(user_id) {
    let query = 'SELECT * from listings where poster_id = ? ORDER BY listing_status';
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

  // Given a listing id, if the listing is signed, return the contact information
  // of the agent who will process it.
  async getSignedAgentForListing(listing_id) {
    let listings = await this.getListingsWithId(listing_id);
    let listing = listings[0];
    //console.log(listing);
    if(listing.listing_status != 'Signed') {
      console.log(`dbAccess getAgentForListing: the named listing with id ${listing_id} is not signed, which means there is no agent to return.`);
      return [];
    }

    let query = 'SELECT DISTINCT users.first_name, users.last_name, users.display_name, users.email, agents.id, agents.title, agents.phone, agents.web_site from (((agents inner join bids on agents.id = bids.agent_id AND bids.bid_status="Signed") INNER JOIN listings ON bids.listing_id = ?) INNER JOIN users on users.agent_id = agents.id)';
    let args = [listing_id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  async close() {
    await this.connection.close();
  }
}

module.exports = ListingsDBAccess;
