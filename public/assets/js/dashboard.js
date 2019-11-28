async function renderPage() {
    let listings = await getListings();
    if(listings.length == 0) {
      $('#listings' ).append(`<li>No listings yet</li>`);
      return;
    }

    let userInfo = getUserInfo();
    if(userInfo.agent_id == "null") {
      // If it's a consumer, only active and signed listings are shown.
      let listingSection = `
            <div id="accordion">
      `;
 
      for(let i=0; i<listings.length; i++) {
        const listing = listings[i];
        listingSection += getListingRowForConsumer(listing, i);
      }

      listingSection += `
            </div>
      `;
      $('#listings').append(listingSection);

    } else {
      // All we know is that the list is sorted by bid_status.
      // First, filter on Signed
      // Second, filter on Rejected
      // Third, filter on Active
      // 
      // This order because Active will be the largest of the three sections, and the agent may not want to interact with it at all if they have enough business.
      const signedSection = getListingSection('Signed', listings, 1);
      const rejectedSection = getListingSection('Rejected', listings, 2);
      const activeSection = getListingSection('Active', listings, 3);
      $('#listings').append(
        signedSection + 
        rejectedSection +
        activeSection
      );

      const viewBidsButton = `
         <button type="button" onClick="window.location.href='/viewbids?agent_id=${userInfo.agent_id}'" class="btn btn-trusael">View all bids</button>
      `;
      $('#listings').append(
        viewBidsButton
      );
    }
}

function getListingSectionAccordion(sectionName, accordionParentId) {
  let sectionRow = `
        <div id="${accordionParentId}">
          <div class="card dashboard-card-section">`;
  return sectionRow;
}

function getListingSectionHeader(sectionName, parentHeaderId, collapsedId) {
  const sectionHeader = `
            <div class="card-header dashboard-card-header" id="${parentHeaderId}">
              <h5 class="dashboard-card-header-margin">
                <button class="btn btn-link dashboard-card-button-section" data-toggle="collapse" data-target="#${collapsedId}" aria-expanded="true" aria-controls="${collapsedId}">
                  <span class="dashboard-card-button-text">${sectionName} Listings</span>
                  <span class="ml-auto"><i class="fas fa-chevron-right"></i></span>
                </button>
              </h5>
            </div>
`;
return sectionHeader;
}


function getListingSectionCollapsedAccordionStart(collapsedId, parentHeaderId, accordionParentId) {
  const collapsedAccordion = `
  <div id="${collapsedId}" class="collapse" aria-labelledby="${parentHeaderId}" data-parent="#${accordionParentId}">
    <div id="${accordionParentId}Collapsed">`;
  return collapsedAccordion;
}

function getListingSectionCollapsedAccordionEnd() {
  const sectionEnd = `
    </div>
  </div>
  `;
  return sectionEnd;
}

function getListingSectionEnd() {
  const sectionEnd = `
      </div>
    </div>
  </div>
  `;
  return sectionEnd;
}

function getListingSection(sectionName, listings, index) {
  let collapsedId = `collapse${sectionName}${index}`;
  const accordionParentId = sectionName + "Accordion";
  const parentHeaderId = `heading${sectionName}`;
  let listingRow = getListingSectionAccordion(sectionName, accordionParentId);
  listingRow += getListingSectionHeader(sectionName, parentHeaderId, collapsedId);
  listingRow += getListingSectionCollapsedAccordionStart(collapsedId, parentHeaderId, accordionParentId);
  
  const filteredListings = listings.filter( row => { return row.bid_status === sectionName; } );

  for(let i=0; i<filteredListings.length; i++) {
    const listing = filteredListings[i];
    listingRow += getListingRowForAgent(sectionName, listing, i, collapsedId);
  }

  listingRow += getListingSectionEnd();

  listingRow += getListingSectionCollapsedAccordionEnd();
  listingRow += getListingSectionEnd();

  return listingRow;
}

// async function renderOpenBidsForAgent() {
//   try {
//     const bidsList = $('#bids').empty();


//     let userInfo = getUserInfo();
//     let bids = await getOpenBidsForAgent(userInfo.agent_id);
//     if(bids.length == 0) {
//        bidsList.append(`<p>You have no open bids</p>`);
//        return;
//     }

//      const bidsHeader = $('#bidsHeader').empty();
//      bidsHeader.append(`<h1>Open Bids</h1>`);
 
//       for(const bid of bids) {
//           let bidsRow = getBidRowForAgent(bid);
//           bidsList.append(bidsRow);
//         } 
//     } catch(err) {
//         console.log(err);
//     };
// }


// // Show the bids for the listing with the current id
// async function renderBidsForListing(listing_id, address) {
//   try {
//     const bidsList = $('#bids').empty();
//     if(listing_id === null) {
//        // no listing has been selected yet
//        bidsList.append(`<li>Select a listing to see its bids</li>`);
//        return;
//      }

//      let bids = await getBidsForListing(listing_id);
//      if(bids.length == 0) {
//           bidsList.append(`<li>No bids for this listing yet</li>`);
//      }

//      const bidsHeader = $('#bidsHeader').empty();
//      bidsHeader.append(`<h1>Bids For <i>${address}</i></h1>`);
 
//       for(const bid of bids) {
//           let bidsRow = getBidRowForUser(bid);
//           bidsList.append(bidsRow);
//         } 
//     } catch(err) {
//         console.log(err);
//     };
// }

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
