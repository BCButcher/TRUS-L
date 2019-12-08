async function getBidsForListing(listing_id) {
  return $.ajax({
    url: "/api/bid/listing/" + listing_id,
    method: "GET"
  });
}

async function getAgentWithId(agent_id) {
  return $.ajax({
    url: "/api/agent/" + agent_id,
    method: "GET"
  });
}

async function getReviews(agent_id) {
  return $.ajax({
    url: "/api/reviews/" + agent_id,
    method: "GET"
  });
}

async function getBidsForAgent(agent_id) {
  return $.ajax({
    url: "/api/bid/agent/all/" + agent_id,
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
      url: "/api/listing/consumer/" + userInfo.user_id,
      method: "GET"
    });
  } else {    
    return $.ajax({
      url: "/api/listing/agent/" + userInfo.agent_id,
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

function getListingRowForConsumer(listing, index) {
  let view;
  let statusButton;
  if(listing.listing_status === 'Active') {
    view = `
       <a href="/viewbids?id=${listing.id}">View Bids</a>
    `; 
    statusButton = `<span class='dashboard-card-button-active'>${listing.listing_status}</span>`;
  } else if(listing.listing_status === 'Signed') {
    view = `
       <a href="/agentdetails?id=${listing.id}">View Agent</a>
    `;
    statusButton = `<span class='dashboard-card-button-signed'>${listing.listing_status}</span>`;
  } else {
    // Should never happen. Consumer should not see the bids that they rejected.
    console.log("Unknown listing status ", listing.listing_status);
  }

  const headingId = `heading${index}`;
  const collapseId = `collapse${index}`;
  const listingRow = `
    <div class="card dashboard-card-section">
      <div class="card-header dashboard-card-header" id="${headingId}">
        <h5 class="dashboard-card-header-margin">
          <button class="btn btn-link dashboard-card-button-address" data-toggle="collapse" data-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
            ${statusButton}
            <span class="dashboard-card-button-text"><i class="fas fa-map-marked-alt"></i>${listing.property_address}</span>
            <span class="ml-auto"><i class="fas fa-chevron-right"></i></span>
          </button>
        </h5>
      </div>
      <div id="${collapseId}" class="collapse" aria-labelledby="${headingId}" data-parent="#accordion">
        <div class="card-body dashboard-card-body">
          <span>${listing.type_of_home}</span>
          <span>$${listing.estimated_value}</span>
          ${view}
        </div>
      </div>
    </div>
 `;
 // console.log(listingRow);
 return listingRow;
}

function getListingRowForAgent(sectionName, listing, index, collapsedAccordionId) {
  // const collapsedAccordionId = `accordion${sectionName}${index}`;
  const collapsedListingId = `collapseSub${sectionName}${index}`;
  const collapsedHeadingId = `heading${sectionName}${index}`;
  let view;
  if(listing.bid_status === 'Signed') {
    view = `<a href="/clientdetails?id=${listing.poster_id}">View customer</a>`;
  } else if (listing.bid_status === 'Rejected') {
      if(listing.rejection_reason === 'Another agent has been awarded the contract.') {
        // can only delete
        view = `<a href="/deletebid?id=${listing.bids_id}">Delete bid</a>`;
      } else {
        // can counter bid
        view = `<a href="/counterbid?id=${listing.bids_id}">Edit bid</a>`;
      }
      // view = `<a href="/biddetails?id=${listing.poster_id}">Bid</a>`;
  } else if (listing.bid_status === 'Active') {
    if(listing.bids_id === "") {
      // No bid has been created
      view = `<a href="/createbid?id=${listing.id}">Bid</a>`;
    } else {
      // Edit the bid that was created
      view = `<a href="/biddetails?id=${listing.bids_id}">Edit Bid</a>`;
    }
  } else {
    // Should never happen
    console.log("Error. Unknown bid status ", listing);
    return;
  }

    // <div id="${collapsedId}" class="collapse" aria-labelledby="${collapsedHeadingId}" data-parent="#${sectionName}Accordion">
    //   <div id="${collapsedAccordionId}">
    const row = `
        <div class="card dashboard-card-address">
          <div class="card-header dashboard-card-header" id="${collapsedHeadingId}">
            <h5 class="dashboard-card-header-margin">
              <button class="btn btn-link dashboard-card-button-address" data-toggle="collapse" data-target="#${collapsedListingId}" aria-expanded="true" aria-controls="${collapsedListingId}">
                <span class="dashboard-card-button-text"><i class="fas fa-map-marked-alt"></i>${listing.property_address}</span>
                <span class="ml-auto"><i class="fas fa-chevron-right"></i></span>
              </button>
            </h5>
          </div>
          <div id="${collapsedListingId}" class="collapse" aria-labelledby="${collapsedHeadingId}" data-parent="#${collapsedAccordionId}">
            <div class="card-body dashboard-card-body">
              <span>${listing.type_of_home}</span>
              <span>$${listing.estimated_value}</span>
              ${view}
            </div>
          </div>
        </div>
  `;
  return row;
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

function getStars(starsAverage) {
  let stars = [];
  for(let i=0; i<Math.floor(starsAverage); i++) {
    stars.push('<i class="fas fa-star"></i>');
  }
  if(parseInt(starsAverage) < starsAverage) {
    stars.push('<i class="fas fa-star-half-alt"></i>'); 
  }

  let remainingStars = 5 - stars.length;
  for(let i=0; i<remainingStars; i++){
      stars.push('<i class="far fa-star"></i>');
  }
  return stars.join('').toString();  
}

function getStarsAverage(rows) {
  let starsCount = rows.reduce((a, b) => a + b, 0);
  // console.log(starsCount);
  let starsAverage = (starsCount / rows.length).toFixed(1);
  // console.log(starsAverage);
  if(isNaN(starsAverage)) {
    starsAverage = "No reviews yet";
  }
  return starsAverage;
}

async function getBidRowForUser(bid) {
  if(bid.bid_status !== 'Active') {
    // The user does not have anything else to do if it's Rejected. The agent can counter 
    // but that's it for the user.
    //
    // If the bid is Signed, then so is the Listing, and clicking on the Listing will take
    // the user to the agent's bid showing what was promised.
    return;
  }

  let review = await getReviews(bid.agent_id);
  let rows = review.map( (row) => {return row.stars;});
  let starsAverage = getStarsAverage(rows);
  let stars = getStars(starsAverage);
  let starsExplanation = " out of 5";
  if(isNaN(starsAverage)) {
    starsExplanation = "";
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
      </div>
      <div class="d-flex w-100 justify-content-between">
        <small class="text-warning font-weight-bold">Rating ${stars} (${starsAverage}${starsExplanation}) </small>
        <small><a href="/viewreviews?id=${bid.agent_id}">View reviews</a></small>
      </div>
     </a>
    </div>
    
   `;
  return bidsRow;
}

async function getReviewRows(agent_id) {
  let reviews = await getReviews(agent_id);

  let reviewRows = "";
  for(review of reviews){
    let stars = getStars(review.stars);
    let starsExplanation = " out of 5";
    if(isNaN(review.stars)) {
      starsExplanation = "";
    }  
    reviewRows += `
      <div class="card border-left-0 border-right-0 mt-3">
        <div class="d-flex w-100 justify-content-between">
          <small class="text-warning font-weight-bold">Rating ${stars} (${review.stars}${starsExplanation}) </small>
        </div>
        <div class="d-flex w-100 justify-content-between mt-3">
          <p class='text-info'><i class="fas fa-quote-left"></i> ${review.review} <i class="fas fa-quote-right"></i></p>
        </div>
        <h6 class="card-title text-dark"> --<i class="fas fa-user-tie"></i> ${review.first_name} </h6>
      </div>
    `;
  }

  return reviewRows;
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
       <a class="navbar-text font-color" href="/dashboard" id="displayName">Hello, ${userInfo.display_name}</a>
    `;
  } else {
    return `
       <a class="navbar-text font-color" href="/login" id="displayName">Hello, Sign in</a>
    `;
  }
}

function generateDisplayName() {
  const navDisplayName = $('#displayName').empty();
  navDisplayName.append(getNavDisplayName());
}

function getNavLogout() {
  return `
      <a class="nav-link font-color" href='/login' onClick="logout()">Logout</a>
  `;
}

function getNavLogin() {
  return `
      <a class="nav-link font-color" href='/login' onClick="logout()">Login</a>
  `;
}

function generateLoginLogout() {
  const logoutName = $('#logout').empty();
  if(sessionStorage.user_id) {
    logoutName.append(getNavLogout());
  } else {
    logoutName.append(getNavLogin());
  }
}


function logout() {
  sessionStorage.clear();
}

