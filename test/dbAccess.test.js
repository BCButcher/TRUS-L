const DBAccess = require('../lib/dbAccess');

test('Can read the existing notes', () => {
  const dbAccess = new DBAccess();

  // The test JSON file starts with one note data: Test Title, Test text
  const notesJSON = dbAccess.getNotesJSON();
  const isLengthCorrect = (notesJSON.length === 1);
  const isCorrectNote = (notesJSON[0].id === 0);
  expect(isLengthCorrect).toBe(true);
  expect(isCorrectNote).toBe(true);
});


async function testListings(dbAccess) {
  let listings = await dbAccess.getListings();
  console.log('number of listings is: ' + listings.length);
  console.log(listings);
  console.log('');

  let status = ['Active', 'Signed', 'Closed'];
  for (let i = 0; i < status.length; i++) {
    let parm = status[i];
    listings = await dbAccess.getListings(parm);
    console.log('number of listings for getListings(' + parm + ') is: ' + listings.length);
    console.log(listings);
  }
  console.log('');
}

async function testBids(dbAccess) {
  let listings = await dbAccess.getBids();
  console.log('number of bids is: ' + listings.length);
  console.log(listings);
  console.log('');
  //   for (let i = 0; i < listings.length; i++) {
  //     console.log(listings[i]);
  //   }
}

async function testConsumers(dbAccess) {
  let listings = await dbAccess.getConsumers();
  console.log('number of consumers is: ' + listings.length);
  console.log(listings);
  console.log('');
  //   for (let i = 0; i < listings.length; i++) {
  //     console.log(listings[i]);
  //   }
}

async function testAgents(dbAccess) {
  let listings = await dbAccess.getAgents();
  console.log('number of agents is: ' + listings.length);
  console.log(listings);
  console.log('');
  //   for (let i = 0; i < listings.length; i++) {
  //     console.log(listings[i]);
  //   }
}

async function crudAgent(dbAccess) {
  let agentInfo = {
    license: 111111111,
    first_name: 'Bob',
    last_name: 'The-Minion',
    email: 'bob@gru.com',
    phone: '416-999-9999',
    web_site: 'https://www.despicable.me'
  };
    // create an agent
  await dbAccess.createAgent(agentInfo);

  // retrieve to ensure that the agent is there
  let query = 'SELECT MAX(id) as id FROM agents';
  let rows = await dbAccess.db.query(query);
  console.log(rows[0]);
  const id = rows[0].id;
  console.log('max id in agents table is ' + id);
  query = 'SELECT * FROM agents WHERE id=?';
  let args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log('Was agent created?');
  console.log(rows[0]);

  // update the agent
  agentInfo.license = 22222222;
  rows = await dbAccess.updateAgent(id, agentInfo); // SQL update doesn't return the affected rows
  console.log('Was agent updated? ');
  query = 'SELECT * FROM agents WHERE id=?';
  args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log(rows[0]);

  // delete the agent
  rows = await dbAccess.deleteAgent(id);

  // retrieve to ensure that the agent isn't there
  query = 'SELECT MAX(id) as id FROM agents';
  rows = await dbAccess.db.query(query);
  let id2 = rows[0].id;
  let success = (id !== id2);
  console.log(success);
  query = 'SELECT * FROM agents WHERE id=?';
  args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log('was agent deleted');
  console.log(rows);
}

async function crudConsumer(dbAccess) {
  let consumerInfo = {
    display_name: 'MacGyver',
    first_name: 'Angus',
    last_name: 'MacGyver',
    email: 'angus@macgyver.com'
  };
    // create an agent
  await dbAccess.createConsumer(consumerInfo);

  // retrieve to ensure that the agent is there
  let query = 'SELECT MAX(id) as id FROM consumers';
  let rows = await dbAccess.db.query(query);
  console.log(rows[0]);
  const id = rows[0].id;
  console.log('max id in consumer table is ' + id);
  query = 'SELECT * FROM consumers WHERE id=?';
  let args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log('Was consumer created?');
  console.log(rows[0]);

  // update the agent
  consumerInfo.display_name = 'The MacGyver';
  rows = await dbAccess.updateConsumer(id, consumerInfo); // SQL update doesn't return the affected rows
  console.log('Was consumer updated? ');
  query = 'SELECT * FROM consumers WHERE id=?';
  args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log(rows[0]);

  // delete the agent
  rows = await dbAccess.deleteConsumer(id);

  // retrieve to ensure that the agent isn't there
  query = 'SELECT MAX(id) as id FROM consumers';
  rows = await dbAccess.db.query(query);
  let id2 = rows[0].id;
  let success = (id !== id2);
  console.log(success);
  query = 'SELECT * FROM consumers WHERE id=?';
  args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log('was consumer deleted?');
  console.log(rows);
}

async function crudListings(dbAccess) {
  let listingInfo = {
    poster_id: 3,
    property_address: '1 Main Street, Toronto ON, M1M 1M1',
    listing_status: 'Active',
    estimated_value: 1000000,
    transaction_type: 'abcd'
  };
    // create an agent
  await dbAccess.createListing(listingInfo);

  // retrieve to ensure that the agent is there
  let query = 'SELECT MAX(id) as id FROM listings';
  let rows = await dbAccess.db.query(query);
  console.log(rows[0]);
  const id = rows[0].id;
  console.log('max id in listings table is ' + id);
  query = 'SELECT * FROM listings WHERE id=?';
  let args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log('Was listing created?');
  console.log(rows[0]);

  // update the agent
  rows = await dbAccess.updateListingStatus(id, 'Signed'); // SQL update doesn't return the affected rows
  console.log('Was listing updated? ');
  query = 'SELECT * FROM listings WHERE id=?';
  args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log(rows[0]);

  // delete the agent
  rows = await dbAccess.deleteListing(id);

  // retrieve to ensure that the agent isn't there
  query = 'SELECT MAX(id) as id FROM listings';
  rows = await dbAccess.db.query(query);
  let id2 = rows[0].id;
  let success = (id !== id2);
  console.log(success);
  query = 'SELECT * FROM listings WHERE id=?';
  args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log('was listing deleted?');
  console.log(rows);
}

async function crudBids(dbAccess) {
  let bidInfo = {
    agent_id: 2,
    listing_id: 7,
    bid_status: 'Active',
    services: 'abcd',
    message: 'Hire me because I am your mother.'
  };
    // create an agent
  await dbAccess.createBid(bidInfo);

  // retrieve to ensure that the agent is there
  let query = 'SELECT MAX(id) as id FROM bids';
  let rows = await dbAccess.db.query(query);
  console.log(rows[0]);
  const id = rows[0].id;
  console.log('max id in bids table is ' + id);
  query = 'SELECT * FROM bids WHERE id=?';
  let args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log('Was bid created?');
  console.log(rows[0]);

  // update the agent
  rows = await dbAccess.updateBidStatus(id, 'Signed'); // SQL update doesn't return the affected rows
  console.log('Was bid updated? ');
  query = 'SELECT * FROM bids WHERE id=?';
  args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log(rows[0]);

  // delete the agent
  rows = await dbAccess.deleteBid(id);

  // retrieve to ensure that the agent isn't there
  query = 'SELECT MAX(id) as id FROM bids';
  rows = await dbAccess.db.query(query);
  let id2 = rows[0].id;
  let success = (id !== id2);
  console.log(success);
  query = 'SELECT * FROM bids WHERE id=?';
  args = [id];
  rows = await dbAccess.db.query(query, args);
  console.log('was bid deleted?');
  console.log(rows);
}

async function specialtyGet(dbAccess) {
  // getBidsForAgent
  let rows = await dbAccess.getBidsForAgentWithStatus(1, 'Signed');
  console.log('get signed bids for agent 1');
  console.log(rows);

  // getBidsForListing
  rows = await dbAccess.getBidsForListing(1);
  console.log('get bids for listing 1');
  console.log(rows);

  // getBidsWithStatus
  rows = await dbAccess.getBidsWithStatus('Signed');
  console.log('get bids with status Signed');
  console.log(rows);
}


async function main() {
  let dbAccess = null;
  try {
    dbAccess = new DBAccess();
    await testListings(dbAccess);
    await testBids(dbAccess);
    await testConsumers(dbAccess);
    await testAgents(dbAccess);

    await crudAgent(dbAccess);
    await crudConsumer(dbAccess);
    await crudListings(dbAccess);
    await crudBids(dbAccess);

    await specialtyGet(dbAccess);

    dbAccess.close();
  } catch (err) {
    if (dbAccess != null) {
      dbAccess.close();
    }
    console.log(err);
  }


  process.exit(0);
}
main();
