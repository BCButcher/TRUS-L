async function renderPage(id) {
  try {
    let userInfo = getUserInfo();
    if(userInfo.agent_id == "null") {
      await renderPageForConsumer(id);
    } else {
      await renderPageForAgent(id);
    }
  } catch ( err ) {
    console.log(err);
  }
}

async function renderPageForConsumer(listing_id) {
  // In the case that this page is being rendered for a user, 
  // a listing has been viewed and its "View Bids" link has been clicked.
  let bids = await getBidsForListing(listing_id);
  if(bids.length == 0) {
    $('#bids' ).append(`<h5>No bids yet</h5>`);
    return;
  }


    // If it's a consumer, only active and signed listings are shown.
    let bidSection = `
    <div id="accordion">
  `;

  let bidCount = 0;
  for(let i=0; i<bids.length; i++) {
    const bid = bids[i];
    if(bid.bid_status == "Active") {
      // If a bid was rejected, we don't want to list it. If the agent counters
      // then it will be marked Active again. 
      bidSection += await getBidRowForUser(bid);
      bidCount++;
    }
  }
  if(bidCount == 0) {
    $('#bids' ).append(`<h5>No bids yet</h5>`);
    return;
  }

  bidSection += `
        </div>
  `;
  $('#bids').append(bidSection);
}

async function renderPageForAgent(agentId) {
  // In the case that this page is being rendered for an agent,
  // the agent wants to see all bids that they opened, signed, or are rejected.
  let bids = await getBidsForAgent(agentId);
  if(bids.length === 0) {
    console.log("no bids for agent")
    return;
  }

    // All we know is that the list is sorted by bid_status.
    // First, filter on Signed
    // Second, filter on Rejected
    // Third, filter on Active
    // 
    // This order because Active will be the largest of the three sections, and the agent may not want to interact with it at all if they have enough business.
    const signedSection = getBidsSection('Signed', bids, 1);
    const rejectedSection = getBidsSection('Rejected', bids, 2);
    const activeSection = getBidsSection('Active', bids, 3);
    $('#bids').append(
      signedSection + 
      rejectedSection +
      activeSection
    );
}

function getBidsSectionAccordion(sectionName, accordionParentId) {
  let sectionRow = `
        <div id="${accordionParentId}">
          <div class="card dashboard-card-section">`;
  return sectionRow;
}

function getBidsSectionHeader(sectionName, parentHeaderId, collapsedId) {
  const sectionHeader = `
            <div class="card-header dashboard-card-header" id="${parentHeaderId}">
              <h5 class="dashboard-card-header-margin">
                <button class="btn btn-link dashboard-card-button-section" data-toggle="collapse" data-target="#${collapsedId}" aria-expanded="true" aria-controls="${collapsedId}">
                  <span class="dashboard-card-button-text">${sectionName} Bids</span>
                  <span class="ml-auto"><i class="fas fa-chevron-right"></i></span>
                </button>
              </h5>
            </div>
`;
return sectionHeader;
}


function getBidsSectionCollapsedAccordionStart(collapsedId, parentHeaderId, accordionParentId) {
  const collapsedAccordion = `
  <div id="${collapsedId}" class="collapse" aria-labelledby="${parentHeaderId}" data-parent="#${accordionParentId}">
    <div id="${accordionParentId}Collapsed">`;
  return collapsedAccordion;
}

function getBidsSectionCollapsedAccordionEnd() {
  const sectionEnd = `
    </div>
  </div>
  `;
  return sectionEnd;
}

function getBidsSectionEnd() {
  const sectionEnd = `
      </div>
    </div>
  </div>
  `;
  return sectionEnd;
}

function getBidsSection(sectionName, bids, index) {
  const filteredBids = bids.filter( row => { return row.bid_status === sectionName; } );
  if(filteredBids.length === 0) {
    // do not render an empty section
    return "";
  }

  let collapsedId = `collapse${sectionName}${index}`;
  const accordionParentId = sectionName + "Accordion";
  const parentHeaderId = `heading${sectionName}`;
  let bidRow = getBidsSectionAccordion(sectionName, accordionParentId);
  bidRow += getBidsSectionHeader(sectionName, parentHeaderId, collapsedId);
  bidRow += getBidsSectionCollapsedAccordionStart(collapsedId, parentHeaderId, accordionParentId);
  

  for(let i=0; i<filteredBids.length; i++) {
    const bid = filteredBids[i];
    bidRow += getListingRowForAgent(sectionName, bid, i, collapsedId);
  }

  bidRow += getBidsSectionEnd();

  bidRow += getBidsSectionCollapsedAccordionEnd();
  bidRow += getBidsSectionEnd();

  return bidRow;
}

$( document ).ready(function() {
  // Read the user_id from session storage
  // If it isn't there, redirect to the login page to set it.    
  
  // Array(6) ["id", "1", "name", "foo", "address", "123%20Main%20St"]
  // In this page, we expect id=num, so get the value in the second position
  let ids = getParam(); // getParam is defined in common.js
  let listing_id = ids[1];

  generateDisplayName();
  generateLoginLogout();

  if(!sessionStorage.user_id) {
    window.location = '/login';
  } else {
    renderPage(listing_id);
  }
});
