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

async function getLastConsumerCreated() {
  return $.ajax({
    url: "/api/consumer/last",
    method: "GET"
  });
}

async function getListings() {
  const userInfo = getUserInfo();
  if(userInfo.agent_id == "null") {
    return $.ajax({
      url: "/api/listing/" + userInfo.user_id + "/consumer",
      method: "GET"
    });
  } else {    
    return $.ajax({
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
         <li>${listing.estimated_value}</li>
         <small>${listing.poster_id}</small>
       </a>
     </div>
 `;
// console.log(listingRow);
 return listingRow;
}

function getListingRowForAgent(listing) {
  let url = "";
  if(listing.listing_status === 'Signed') {
    url = `/clientdetails?id=${listing.id}`;
  } else {
    url = `/createbid?id=${listing.id}`;
  }

  let listingRow = 
  `<br>
    <div class="list-group" onClick="renderOpenBidsForAgent()">
      <a href="${url}" class="list-group-item">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${listing.property_address}</h5>
          <small>${listing.listing_status}</small>
        </div>
        <li>${listing.type_of_home}</li>
        <li>${listing.estimated_value}</li>
      </a>
    </div>
`;
//console.log(listingRow);
  return listingRow;
}

function getBidRowForAgent(bid) {
  let url = "";
  if(bid.bid_status === 'Rejected') {
    console.log("***"+bid.rejection_reason+"***");
    if(bid.rejection_reason === 'Another agent has been awarded the contract.') {
      url = `/deletebid?id=${bid.id}`;
    } else {
      url = `/counterbid?id=${bid.id}`;
    }
  } else {
    url = `/biddetails?id=${bid.id}`;
  }
  console.log(url);

  let bidsRow = 
  `
    <br>
    <div class="list-group">
      <a href="${url}">
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
  if(bid.bid_status !== 'Active') {
    // The user does not have anything else to do if it's Rejected. The agent can counter 
    // but that's it for the user.
    //
    // If the bid is Signed, then so is the Listing, and clicking on the Listing will take
    // the user to the agent's bid showing what was promised.
    return;
  }

  let bidsRow = 
  `
    <br>
    <div class="list-group">
      <a href="/biddetails/?id=${bid.id}" class="list-group-item">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${bid.first_name} ${bid.last_name}</h5>
        <small>${bid.message}</small>
        <small>${bid.bid_status}</small>
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

function getParam() {
  // When the HTML page is opened with a query parameter, it will be the id of something.
  // This method reads the incoming query parameters and returns the value of the first parameter.
  // This method assumes that only one query parameter will ever be used.

  // http://mysite.com/index.html?id=1&name=foo&address=123%20Main%20St

  let queryParams = window.location.search.substring(1); // window.location.search returns '?id=1'. substring(1) strips off the ?
  var paramsArray = new Array;
  var qpSplit = new RegExp('[&=]');
  paramsArray = queryParams.split(qpSplit); // Note that spaces, %20, will remain in the values. 

  // will return an array such as ['id', '1', 'name', 'foo', 'address', '123 Main St']
  return paramsArray;
}




