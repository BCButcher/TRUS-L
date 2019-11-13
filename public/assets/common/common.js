async function getBidsForListing(listing_id) {
  return $.ajax({
    url: "/api/bid/listing/" + listing_id,
    method: "GET"
  });
}

async function getOpenBidsForAgent(agent_id) {
  return $.ajax({
    url: "/api/bid/agent/open/" + agent_id,
    method: "GET"
  });
}

async function getListingsForUser() {
  const userInfo = getUserInfo();
  if(userInfo.agent_id == "null") {
    return $.ajax({
      url: "/api/listing/" + userInfo.user_id + "/consumer",
      method: "GET"
    });
  } else {    return $.ajax({
      url: "/api/listing/" + userInfo.agent_id + "/agent",
      method: "GET"
    });
  }
}

async function getBidWithIdIncludeAgentName(bid_id) {
  return $.ajax({
    url: "/api/bid/agent/" + bid_id,
    method: "GET"
  });
}

function getListingRowForConsumer(listing) {
  let listingRow = 
   `<br>
     <div class="list-group" onClick="renderBidsForListing(${listing.id}, '${listing.property_address}')">
       <a href="#bids" class="list-group-item">
         <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">${listing.property_address}</h5>
           <small>${listing.listing_status}</small>
         </div>
         <li>${listing.type_of_home}</li>
         <li>${listing.transaction_type}</li>
         <li>${listing.estimated_value}</li>
         <small>${listing.poster_id}</small>
       </a>
     </div>
 `;
// console.log(listingRow);
 return listingRow;
}

function getListingRowForAgent(listing) {
  let listingRow = 
  `<br>
    <div class="list-group" onClick="renderOpenBidsForAgent()">
      <a href="#bids" class="list-group-item">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${listing.property_address}</h5>
          <small>${listing.listing_status}</small>
        </div>
        <li>${listing.type_of_home}</li>
        <li>${listing.transaction_type}</li>
        <li>${listing.estimated_value}</li>
        <small>${listing.poster_id}</small>
      </a>
    </div>
`;
//console.log(listingRow);
  return listingRow;
}

function getBidRowForAgent(bid) {
  let bidsRow = 
  `
    <br>
    <div class="list-group">
      <a href="/biddetails/?id=${bid.id}" class="list-group-item">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${bid.property_address}</h5>
        <small>${bid.estimated_value}</small>
        <small>${bid.type_of_home}</small>
        <small>${bid.bid_status}</small>
      </div>
     </a>
    </div>
   `;
  return bidsRow;
}

function getBidRowForUser(bid) {
  let bidsRow = 
  `
    <br>
    <div class="list-group">
      <a href="/biddetails/?id=${bid.id}" class="list-group-item">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${bid.first_name} ${bid.last_name}</h5>
        <small>${bid.message}</small>
      </div>
     </a>
    </div>
   `;
  return bidsRow;
}

function getUserInfo() {
  return {
    user_id: sessionStorage.user_id,
    agent_id: sessionStorage.agent_id
  };
}

