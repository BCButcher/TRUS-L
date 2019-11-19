async function renderPage() {
    let listings = await getListings();
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
          let bidsRow = getBidRowForAgent(bid);
          bidsList.append(bidsRow);
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
          let bidsRow = getBidRowForUser(bid);
          bidsList.append(bidsRow);
        } 
    } catch(err) {
        console.log(err);
    };
}

$( document ).ready(function() {
  // Read the user_id from session storage
  // If it isn't there, redirect to the login page to set it.
  generateDisplayName();
  generateLoginLogout();

  if(!sessionStorage.user_id) {
    window.location = '/login';
  } else {
    renderPage();
  }
});
