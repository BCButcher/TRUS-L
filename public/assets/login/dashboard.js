async function renderListingsAndBidsForUser() {
  let listings = await getListingsForUser();
  if(listings.length == 0) {
    $('#listings' ).append(`<li>No listings yet</li>`);
    renderBidsForListing(null);
    return;
  }


    // Default the list of bids to the first listing in the list
    let userInfo = getUserInfo();
    if(userInfo.agent_id == "null") {
      // If it's a consumer, their posted listings are at the top of the page
      // and the open bids on that listing are on the bottom
      const listingsHeader = $('#listingsHeader').empty();
      listingsHeader.append(`<h1>Listings</h1>`);
 
      for(const listing of listings) {
        let listingRow = getListingRowForConsumer(listing);
        $('#listings').append(listingRow);
      }
      renderBidsForListing(listings[0].id, listings[0].property_address);
    } else {
      // If it's an agent, the listed bids are the open/active ones
      const listingsHeader = $('#listingsHeader').empty();
      listingsHeader.append(`<h1>Signed Listings</h1>`);
      for(const listing of listings) {
        let listingRow = getListingRowForAgent(listing);
        $('#listings').append(listingRow);
      }
      renderOpenBidsForAgent();
    }
}

function getListingRowForConsumer(listing) {
   return 
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
}

function getListingRowForAgent(listing) {
  let listingRow = 
  `<br>
    <div class="list-group" onClick="renderOpenBidsForAgent())">
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
  return listingRow;
}

function getUserInfo() {
  return {
    user_id: sessionStorage.user_id,
    agent_id: sessionStorage.agent_id
  };
}

async function renderOpenBidsForAgent() {
  try {
    const bidsList = $('#bids').empty();


    let userInfo = getUserInfo();
    let bids = await getOpenBidsForAgent(userInfo.agent_id);
    if(bids.length == 0) {
       bidsList.append(`<p>You have no open bids</p>`);
       return;
    }

     const bidsHeader = $('#bidsHeader').empty();
     bidsHeader.append(`<h1>Open Bids</h1>`);
 
      for(const bid of bids) {
          let listingRow = 
          `
            <br>
            <div class="list-group">
              <a href="/viewbid/${bid.id}" class="list-group-item">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${bid.property_address}</h5>
                <small>${bid.estimated_value}</small>
                <small>${bid.type_of_home}</small>
                <small>${bid.bid_status}</small>
              </div>
             </a>
            </div>
           `;
          bidsList.append(listingRow);
        } 
    } catch(err) {
        console.log(err);
    };
}


// Show the bids for the listing with the current id
async function renderBidsForListing(listing_id, address) {
  try {
    const bidsList = $('#bids').empty();
    if(listing_id === null) {
       // no listing has been selected yet
       bidsList.append(`<li>Select a listing to see its bids</li>`);
       return;
     }

     let bids = await getBidsForListing(listing_id);
     if(bids.length == 0) {
          bidsList.append(`<li>No bids for this listing yet</li>`);
     }

     const bidsHeader = $('#bidsHeader').empty();
     bidsHeader.append(`<h1>Bids For <i>${address}</i></h1>`);
 
      for(const bid of bids) {
          let listingRow = 
          `
            <br>
            <div class="list-group">
              <a href="/viewbid/${bid.id}" class="list-group-item">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${bid.first_name} ${bid.last_name}</h5>
                <small>${bid.message}</small>
              </div>
             </a>
            </div>
           `;
          bidsList.append(listingRow);
        } 
    } catch(err) {
        console.log(err);
    };
}



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

$( document ).ready(function() {
  // Read the user_id from session storage
  // If it isn't there, redirect to the login page to set it.

  if(!sessionStorage.user_id) {
    window.location = '/login';
  } else {
    renderListingsAndBidsForUser();
  }
});
