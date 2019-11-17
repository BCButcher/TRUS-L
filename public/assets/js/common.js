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
     <div class="card border-left-0 border-right-0"
       <a href="#bids">     
         <div class="card-header bg-info font-weight-bolder"><i class="fas fa-map-marked-alt"></i> ${listing.property_address}, Toronto ,ON</div> 
         <hr> 
         <h5 class="card-title text-center"><i class="fas fa-dollar-sign"></i>${listing.estimated_value}</h5>
         <p class='text-center'>${listing.type_of_home}</p>
         <div class="d-flex w-100 justify-content-between">
         <small class='font-weight-bold'>id:${listing.poster_id}</small>
         <small class='font-weight-bold text-success'>${listing.listing_status}</small>
         </div>
       </a>
       </div>
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
    <div class="card card border-left-0 border-right-0" onClick="renderOpenBidsForAgent()">
      <a href="${url}">
       
        <div class="card-header bg-info text-dark font-weight-bolder"><i class="fas fa-map-marked-alt"></i> ${listing.property_address}, Toronto ,ON
        </div>
        <h5 class="card-title text-dark text-center">
        <i class="fas fa-dollar-sign"></i>${listing.estimated_value}</h5>
        <p class='text-center text-dark'>${listing.type_of_home}</p> 
        <div class="d-flex w-100 justify-content-between">
          <small>${listing.listing_status}</small>
        </div>
        
      
      </a>
    </div>
`;
//console.log(listingRow);
  return listingRow;
}

function getBidRowForAgent(bid) {
  let url = "";
  if(bid.bid_status === 'Rejected') {
    // console.log("***"+bid.rejection_reason+"***");
    if(bid.rejection_reason === 'Another agent has been awarded the contract.') {
      url = `/deletebid?id=${bid.id}`;
    } else {
      url = `/counterbid?id=${bid.id}`;
    }
  } else {
    url = `/biddetails?id=${bid.id}`;
  }

  let bidsRow = 
  `
    <br>
    <div class="card border-left-0 border-right-0">
  
      <a href="${url}">
      <div class="card-header bg-info text-dark font-weight-bolder"><i class="fas fa-map-marked-alt"></i>
      ${bid.property_address}, Toronto ,ON</div>
      <h5 class="card-title text-dark text-center">
        <i class="fas fa-dollar-sign"></i>
        ${bid.estimated_value}</h5>
        <p class='text-center text-dark'>${bid.type_of_home}</p>
        <div class="d-flex w-100 justify-content-between">
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
  <div class="card border-left-0 border-right-0">
    
      <a href="/biddetails/?id=${bid.id}">
      <h5 class="card-title text-dark"><i class="fas fa-user-tie"></i>
      ${bid.first_name} ${bid.last_name}</h5>
      <div class="d-flex w-100 justify-content-between">
        <p class='text-info'><i class="fas fa-quote-left"></i> ${bid.message} <i class="fas fa-quote-right"></i></p>
        <small class="text-success font-weight-bold">${bid.bid_status}</small>
      </div>
     </a>
    </div>
    
   `;
  return bidsRow;
}

function getUserInfo() {
  return {
    user_id: sessionStorage.user_id,
    agent_id: sessionStorage.agent_id,
    display_name: sessionStorage.display_name
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

function getNavDisplayName() {
  let userInfo = getUserInfo();
  if(userInfo.display_name) {
    return `
       <a class="navbar-brand" href="/dashboard" id="displayName">Hello, ${userInfo.display_name}</a>
    `;
  } else {
    return `
       <a class="navbar-brand" href="/login" id="displayName">Hello, Sign in</a>
    `;
  }
}

function generateDisplayName() {
  const navDisplayName = $('#displayName').empty();
  navDisplayName.append(getNavDisplayName());
}

function getNavLogout() {
  return `
      <a class="nav-link" href='/login?id=logout' id="logout">Logout</a>
  `;
}

function getNavLogin() {
  return `
      <a class="nav-link" href='/login' id="logout">Login</a>
  `;
}

function generateLoginLogout() {
  let ids = getParam(); // ?id='logout'
  const logoutName = $('#logout').empty();
  if(ids[1] === 'logout') {
    logoutName.append(getNavLogout());
  } else {
    logoutName.append(getNavLogin());
  }
}


function logout() {
  sessionStorage.clear();
}

