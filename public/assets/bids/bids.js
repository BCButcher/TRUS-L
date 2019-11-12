
// Show the bids for the listing with the current id
async function displayBids(listing_id) {
  try {
     let listing = await displayListingWithId(listing_id);

     let listingData = `
          <li>${listing[0].property_address}</li>
      `;

      let listingEl = $('#listingId').empty();
      listingEl.append(listingData);

      let bids = await getBidsForListing(listing_id);

      const bidsCurrentList = $('#bidColCurrent').empty();
      const bidsRejectedList = $('#bidColRejected').empty();

      if(bids.length == 0) {
          bidsCurrentList.append(`<li>No bids for this listing yet</li>`);
      }

      for(const bid of bids) {
          const id = bid.id;
          const bidName = `Bid by ${bid.agent_id}, <b>${bid.message}</b>`;
          let bidRow = `<li>${id}. ${bidName} <button onClick='viewBid(${id})'>View this bid</button></li>`;
          if(bid.bid_status === 'Active') {
            bidsCurrentList.append(bidRow);
          } else if(bid.bid_status === 'Rejected') {
            bidsRejectedList.append(bidRow);
          } else if(bid.bid_status === 'Signed') {
            // TO DO finish
          } else if(bid.bid_status === 'Closed') {
            // TO DO finish
          }
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

async function displayListingWithId(listing_id) {
  return $.ajax({
    url: "/api/listing/" + listing_id,
    method: "GET"
  });
}

$( document ).ready(function() {
  // Only one query parameter is expected in this URL
  let query = window.location.search.substring(1);
  let parms = query.split('&');
  let key=parms[0].split('=');
  displayBids(key[1]);
});

