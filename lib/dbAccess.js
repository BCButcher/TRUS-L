require('dotenv').config();
const CryptoJS = require('crypto-js');
let Database = require('./async-db');

//  1. Post new consumer
//  2. Post new agent
//  3. Post new bid
//  4. Post new listing
//  5. Update bid
//  6. Update listing
//  7. Get all active listings
//  8. Get all bids
//  9. Get all bids for a listing owned by a customer_id
// 10. Get all booked bids for agent
// 11. Get all bids on a listing

class DBAccess {
  constructor() {
    try {
      this.db = new Database({
        host: process.env.HOST,
        port: 3306,
        user: process.env.USER,
        password: process.env.SQL_PASSWORD,
        database: 'trusl'
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getAgents() {
    let query = 'SELECT * from agents';
    const rows = await this.db.query(query);
    return rows;
  }

  async getAgentWithId(id) {
    let query = 'SELECT * from agents WHERE id=?';
    let args = [id];
    const rows = await this.db.query(query, args);
    return rows;
  }

  async getConsumers() {
    let query = 'SELECT * from consumers';
    const rows = await this.db.query(query);
    return rows;
  }

  async deleteAgent(id) {
    let query = 'DELETE FROM agents WHERE id=?';
    let args = [id];
    const rows = await this.db.query(query, args);
    return rows;
  }

  async deleteConsumer(id) {
    let query = 'DELETE FROM consumers WHERE id=?';
    let args = [id];
    const rows = await this.db.query(query, args);
    return rows;
  }

  async deleteBid(id) {
    let query = 'DELETE FROM bids WHERE id=?';
    let args = [id];
    const rows = await this.db.query(query, args);
    return rows;
  }

  async deleteListing(id) {
    let query = 'DELETE FROM listings WHERE id=?';
    let args = [id];
    const rows = await this.db.query(query, args);
    return rows;
  }

  async updateAgent(id, newAgent) {
    let query = 'UPDATE agents SET license=?, first_name=?, last_name=?, email=?, phone=?, web_site=? WHERE id=?';
    let args = [newAgent.license, newAgent.first_name, newAgent.last_name, newAgent.email, newAgent.phone, newAgent.web_site, id];
    const rows = await this.db.query(query, args);
    return rows;
  }

  async updateConsumer(id, newConsumer) {
    let query = 'UPDATE consumers SET display_name=?, first_name=?, last_name=?, email=? WHERE id=?';
    let args = [newConsumer.display_name, newConsumer.first_name, newConsumer.last_name, newConsumer.email, id];
    const rows = await this.db.query(query, args);
    return rows;
  }

  async verifyAgentPassword(id, password) {
    let query = 'SELECT password FROM agents WHERE id=?';
    let args = [id];
    const rows = await this.db.query(query, args);
    let cipher = this.encrypt(password);
    return (rows[0].password === cipher);
  }

  async verifyConsumerPassword(id, password) {
    let query = 'SELECT password FROM consumers WHERE id=?';
    let args = [id];
    const rows = await this.db.query(query, args);
    let cipher = this.encrypt(password);
    return (rows[0].password === cipher);
  }

  //  1. Post new consumer
  async createConsumer(consumerInfo) {
    // INSERT INTO consumers (display_name, first_name, last_name, email) VALUES
    // ("Sleepless_in_Toronto", "Annie", "Reed", "anniereed@fake.com");
    let query = 'INSERT INTO consumers (display_name, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)';
    let cipher = this.encrypt(consumerInfo.password);
    let args = [
      consumerInfo.display_name,
      consumerInfo.first_name,
      consumerInfo.last_name,
      consumerInfo.email,
      cipher
    ];
    let rows = await this.db.query(query, args);

    // Number of rows affected isn't the created consumer. Return the new consumer.
    // We want to retrieve the last consumer created.
    //   1. First get the max id in the table.
    //   2. Then return the consumer with that id.
    query = 'SELECT MAX(id) as id FROM consumers';
    rows = await this.db.query(query);
    const id = rows[0].id;
    query = 'SELECT * FROM consumers WHERE id=?';
    args = [id];
    rows = await this.db.query(query, args);
    return rows[0];
  }

  encrypt(password) {
    return CryptoJS.AES.encrypt(password, 'This should be random').toString();
  }

  //  2. Post new agent
  async createAgent(agentInfo) {
    // INSERT INTO agents (license, first_name, last_name, email, phone, web_site)
    //    VALUES (123456789, "Abby", "Banksy", "abbybanksy@broker.ca", "416-123-4567", "https://www.abbybanksy.com");
    let query = 'INSERT INTO agents (license, first_name, last_name, email, phone, web_site, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let cipher = this.encrypt(agentInfo.password);
    let args = [
      agentInfo.license,
      agentInfo.first_name,
      agentInfo.last_name,
      agentInfo.email,
      agentInfo.phone,
      agentInfo.web_site,
      cipher
    ];
    let rows = await this.db.query(query, args);

    // Number of rows affected isn't the created consumer. Return the new consumer.
    // We want to retrieve the last consumer created.
    //   1. First get the max id in the table.
    //   2. Then return the consumer with that id.
    query = 'SELECT MAX(id) as id FROM agents';
    rows = await this.db.query(query);
    const id = rows[0].id;
    query = 'SELECT * FROM agents WHERE id=?';
    args = [id];
    rows = await this.db.query(query, args);
    return rows[0];
  }

  //  3. Post new bid
  async createBid(bidInfo) {
    // INSERT INTO bids (agent_id, listing_id, bid_status, services, message)
    //    VALUES (2, 1, "Active", "f", "Hire me because I am your mother.");
    let query = 'INSERT INTO bids (agent_id, listing_id, bid_status, services, message) VALUES (?, ?, ?, ?, ?)';
    let args = [
      bidInfo.agent_id,
      bidInfo.listing_id,
      bidInfo.bid_status,
      bidInfo.services,
      bidInfo.message
    ];
    let rows = await this.db.query(query, args);
    // Number of rows affected isn't the created consumer. Return the new consumer.
    // We want to retrieve the last consumer created.
    //   1. First get the max id in the table.
    //   2. Then return the consumer with that id.
    query = 'SELECT MAX(id) as id FROM bids';
    rows = await this.db.query(query);
    const id = rows[0].id;
    query = 'SELECT * FROM bids WHERE id=?';
    args = [id];
    rows = await this.db.query(query, args);
    return rows[0];
  }

  //  4. Post new listing
  async createListing(listingInfo) {
    // INSERT INTO listings (poster_id, property_address, listing_status, estimated_value,
    // transaction_type) VALUES (1, "E02", "Active", 1000000, "b");
    let query = 'INSERT INTO listings (poster_id, property_address, listing_status, estimated_value, transaction_type) VALUES (?, ?, ?, ?, ?)';
    let args = [
      listingInfo.poster_id,
      listingInfo.property_address,
      listingInfo.listing_status,
      listingInfo.estimated_value,
      listingInfo.transaction_type
    ];
    let rows = await this.db.query(query, args);
    // Number of rows affected isn't the created consumer. Return the new consumer.
    // We want to retrieve the last consumer created.
    //   1. First get the max id in the table.
    //   2. Then return the consumer with that id.
    query = 'SELECT MAX(id) as id FROM listings';
    rows = await this.db.query(query);
    const id = rows[0].id;
    query = 'SELECT * FROM listings WHERE id=?';
    args = [id];
    rows = await this.db.query(query, args);
    return rows[0];
  }

  //  5. Update bid
  async updateBidStatus(id, bidStatus) {
    // UPDATE bids SET bid_status="Booked" WHERE id=4;
    let query = 'UPDATE bids SET bid_status=? WHERE id=?';
    let args = [bidStatus, id];
    const rows = await this.db.query(query, args);
    return rows;
  }

  //  6. Update listing
  async updateListingStatus(id, listingStatus) {
    // UPDATE listings SET listing_status="Signed" WHERE id=3;
    let query = 'UPDATE listings SET listing_status=? WHERE id=?';
    let args = [listingStatus, id];
    const rows = await this.db.query(query, args);
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
      rows = await this.db.query(query);
    } else {
      // SELECT * from listings WHERE listing_status = ?
      query = 'SELECT * from listings WHERE listing_status = ?';
      // console.log(query);
      let args = [listingStatus];
      rows = await this.db.query(query, args);
    }
    // console.log("dbAccess rows are");
    // console.log(rows);
    return rows;
  }

  //  8. Get all bids
  async getBids() {
    // SELECT * from bids;
    let query = 'SELECT * from bids';
    const rows = await this.db.query(query);
    return rows;
  }

  async getBidWithId(id) {
    // SELECT * from bids WHERE id=1;
    let query = 'SELECT * FROM bids WHERE id=?';
    let args = [id];
    const rows = await this.db.query(query, args);
    return rows;
  }

  //  9. Get all bids for a listing
  async getBidsWithStatus(bidStatus) {
    // SELECT * from bids WHERE listing_status = ?
    let query = 'SELECT * from bids WHERE bid_status = ?';
    let args = [bidStatus];
    const rows = await this.db.query(query, args);
    return rows;
  }

  // Get booked bids for an agent. (Could be active or closed too.)
  // 10. Get all booked bids for agent
  async getBidsForAgentWithStatus(agentId, bidStatus) {
    // SELECT * FROM bids WHERE bid_status="Active" AND agent_id="1";
    let query = 'SELECT * FROM bids WHERE bid_status="?" AND agent_id="?"';
    let args = [bidStatus, agentId];
    const rows = await this.db.query(query, args);
    return rows;
  }

  // 11. Get all bids on a listing
  async getBidsForListing(listingId) {
    // SELECT * from bids WHERE listing_id=3;
    let query = 'SELECT * from bids WHERE listing_id=?';
    let args = [listingId];
    const rows = await this.db.query(query, args);
    return rows;
  }

  // These functions are convenience methods to convert the cryptic table column value
  // into the actual value that the user chose. Only this class needs to use this method.
  static convertTransactionType(transaction) {
    // ENUM("Rent", "Buy", "Sell", "Rent out"),
    let transactionArray = [];
    if (transaction.indexOf('a') >= 0) {
      // option a was selected
      transactionArray.push('Rent');
    }

    if (transaction.indexOf('b') >= 0) {
      // option b selected
      transactionArray.push('Buy');
    }

    // Isn't there a way to declare an array with named indices?
    if (transaction.indexOf('c') >= 0) {
      // option b selected
      transactionArray.push('Sell');
    }

    if (transaction.indexOf('d') >= 0) {
      // option b selected
      transactionArray.push('Rent out');
    }
    return transactionArray;
  }

  // These functions are convenience methods to convert the cryptic table column value
  // into the actual value that the user chose. Only this class needs to use this method.
  static convertServicesType(services) {
    let servicesArray = [];
    if (services.indexOf('a') >= 0) {
      // option a was selected
      servicesArray.push('In-person tours');
    }

    if (services.indexOf('b') >= 0) {
      // option b selected
      servicesArray.push('Online advertising');
    }

    // Isn't there a way to declare an array with named indices?
    if (services.indexOf('c') >= 0) {
      // option b selected
      servicesArray.push('Paint');
    }

    if (services.indexOf('d') >= 0) {
      // option b selected
      servicesArray.push('Print brochures');
    }

    if (services.indexOf('e') >= 0) {
      // option b selected
      servicesArray.push('Print advertising');
    }

    if (services.indexOf('f') >= 0) {
      // option b selected
      servicesArray.push('Staging');
    }

    if (services.indexOf('g') >= 0) {
      // option b selected
      servicesArray.push('Virtual tours');
    }

    if (services.indexOf('h') >= 0) {
      // option b selected
      servicesArray.push("Buy your house if you can't sell it");
    }

    return servicesArray;
  }

  async close() {
    await this.db.close();
  }
}

module.exports = DBAccess;
