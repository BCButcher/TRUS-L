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
    // If the user is an agent, we need to show them the listings where they can do the following:
    // 1. If Active, the agent can bid on the listing
    // 2. If Signed, the agent can view their customer's contact information
    // 3. If Rejected, the agent can counter the bid (or delete if the listing was signed to another agent)
    let query = "SELECT DISTINCT listings.*, bids.bid_status, bids.rejection_reason, bids.id as bids_id from (bids INNER JOIN listings ON bids.listing_id = listings.id) WHERE bids.agent_id=? order by bid_status";
    let args = [user_id];
    const agentRows = await this.connection.query(query, args);

    query = `SELECT DISTINCT listings.*, "Active" as bid_status, "" as rejection_reason, "" as bids_id from listings WHERE listings.listing_status="Active"`;
    const activeRows = await this.connection.query(query);

    const allRows = agentRows.concat(activeRows); // Not only do we need to see the listings that this agent has bid on, we need to see any active listings that this agent has not bid on yet.

    // Now remove any duplicates
    //
    // Why are there duplicates? Because we have to run two queries:
    //   1. All listings that have bids from this agent
    //   2. All active listings (includes those with bids and without bids from this agent)
    // 
    // We need to run the second query because we need to be able to
    // bid on a property even if it doesn't have bids yet.
    // 
    // But that means if the agent has bid on a property, and the customer
    // hasn't signed with an agent yet, then the listing will be both in 
    // the first query (this agent has bid on it) and in the second query
    // (the listing is active). 
    // 
    // We cannot use the standard JavaScript filter on the arrays because
    // the objects from the first query will have bid information in them
    // and the objects from the second query will have dummy bid information 
    // in them. The objects aren't equal even though they refer to the same
    // listing.
    // 
    // What is the same is the listing's id (primary key). Thus, filterUnique
    // looks at the primary key of the rows and removes any duplicates.
    const uniqueRows = this.filterUnique(allRows); 
    // console.log("dbAccess getListingsForAgent");
    // console.log(query);
    // console.log(rows);

    return uniqueRows;
  }

  // Can't use the typical JavaScript Set or filter to compare the objects in
  // the above method (getListingsForAgent) because some of the records are 
  // retrieved from their bids but some listings won't have bids, and thus need
  // to be retrieved as listings alone. This means that any Active listings that
  // have bids will be in both arrays but will be represented as different 
  // Objects. The item that is the same across both Objects is the listing's id.
  // 
  // This method looks at an Object's id and if that id is already in a list, removes
  // the duplicate.
  filterUnique( rows ) {
    rows.sort(
      function(a, b) {
        return a.id - b.id;
      }
    );

    for(let i=0; i<rows.length; i++) {
      let j=i+1;
      if(j>=rows.length) {
        break;
      }

      let row1 = rows[i];
      let row2 = rows[j];
      
      if(row1.id === row2.id) {
        // Remove the row without the bid information. We need that information
        // in order to edit the bid. 
        let index = (row1.bids_id === "") ? i : j;
        rows.splice(index, 1); // remove the i-th element in the array
        i = i-1; // need to compare the previous element with the next element
      }
    }

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
