async function renderPage() {
    let listings = await getListings();
    if(listings.length == 0) {
      $('#listings' ).append(`<li>No listings yet</li>`);
      return;
    }

    let userInfo = getUserInfo();
    if(userInfo.agent_id == "null") {
      renderPageForConsumer(listings);
    } else {
      renderPageForAgent(listings);
    }
}

async function renderPageForConsumer(listings) {
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
}

async function renderPageForAgent(listings) {
    // All we know is that the list is sorted by bid_status and also contains active listings for which this agent has no bid.
    // Listings where the bid_id = '' are ones where this agent can bid on them. 

    // First, filter on Signed
    // Second, filter on Rejected
    // Third, filter on Active
    // 
    // This order because Active will be the largest of the three sections, and the agent may not want to interact with it at all if they have enough business.
    const signedSection = getListingSection('Signed', listings, 1);
    const rejectedSection = getListingSection('Rejected', listings, 2);
    const pendingSection = getPendingListingSection("Pending", listings, 3)
    const activeSection = getActiveListingSection('Active', listings, 4);

    $('#listings').append(
      signedSection + 
      rejectedSection +
      pendingSection +
      activeSection
    );
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
  const filteredListings = listings.filter( row => { return row.bid_status === sectionName; } );
  return getFilteredListingSection(sectionName, filteredListings, index);
}

function getActiveListingSection(sectionName, listings, index) {
  // If it's Active and there is a bids_id, the agent has submitted a bid on it.
  // If it's Active and there is no bids_id, the agent has not submitted a bid on it. 
  const filteredListings = listings.filter( row => { return ((row.bids_id === "") && (row.bid_status === "Active")); } );
  return getFilteredListingSection(sectionName, filteredListings, index);
}

function getPendingListingSection(sectionName, listings, index) {
  // If it's Active and there is a bids_id, the agent has submitted a bid on it.
  // If it's Active and there is no bids_id, the agent has not submitted a bid on it. 
  const filteredListings = listings.filter( row => { return ((row.bids_id != "") && (row.bid_status === "Active")); } );
  return getFilteredListingSection(sectionName, filteredListings, index);
}

function getFilteredListingSection(sectionName, filteredListings, index) {
  if(filteredListings.length === 0) {
    // Do not show a section without content
    console.log("No listings for ", sectionName);
    return "";
  }

  let collapsedId = `collapse${sectionName}${index}`;
  const accordionParentId = sectionName + "Accordion";
  const parentHeaderId = `heading${sectionName}`;
  let listingRow = getListingSectionAccordion(sectionName, accordionParentId);
  listingRow += getListingSectionHeader(sectionName, parentHeaderId, collapsedId);
  listingRow += getListingSectionCollapsedAccordionStart(collapsedId, parentHeaderId, accordionParentId);
  

  for(let i=0; i<filteredListings.length; i++) {
    const listing = filteredListings[i];
    listingRow += getListingRowForAgent(sectionName, listing, i, collapsedId);
  }

  listingRow += getListingSectionEnd();

  listingRow += getListingSectionCollapsedAccordionEnd();
  listingRow += getListingSectionEnd();

  return listingRow;
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
