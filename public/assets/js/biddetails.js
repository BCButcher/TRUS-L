function getRejectionReasonRow(bidId) {
    let rejectionReasonRow = `
    <div class="row">
      <div class="col">
        <form>
            Would you like to share your reason for rejecting this bid?
            <br />
            Your feedback is completely optional but, it will greatly assist both agents, and Trusael make improvements to better meet your needs.
            <div class="form-group ">
                <label for="agent_bid_reject_message" id="agent_bid_reject_label">Please briefly explain your reason for rejecting the agents bid</label>
                <textarea class="form-control" id="agent_bid_reject_message" rows="3 "></textarea>
            </div>
            <button type="button" id="submit_reject_reason_button" class="btn btn-primary" onClick="save(${bidId});">Submit</button>
            <button type="button" id="skip_reject_reason_button" class="btn btn-primary" onClick="skip(${bidId})">Skip</button>
        </form>
     </div>
   </div>
   `;
//    console.log("biddetails " + rejectionReasonRow);
   return rejectionReasonRow;
}

async function acceptBid(bidId) {
    try {
        // If the user clicks Accept, post then 
        // Update all other bids to rejected then
        // Update listing to Signed then
        // redirect to dashboard

        // Update this bid from 'Active' to 'Signed'
        const bid_status = 'Signed';
        let updatedBid = await updateBidStatus(bidId, bid_status);
        // console.log("biddetails acceptBid ");
        // console.log(updatedBid);
        if(updatedBid == undefined) {
            updatedBid = await getBidWithId(bidId);
            updatedBid = updatedBid[0];
        }
        
        // Now get all of the bids on this listing and update them
        let bids = await getBidsForListing(updatedBid.listing_id);
        for(bid of bids) {
            if(bid.id !== bidId) {
                // We don't want to update the bid that we already Signed
                await updateBidRejected(bid.id, 'Another agent has been awarded the contract.');
            }
        }

        // Now update the listing to signed
        let updatedListing = await updateListing(updatedBid.listing_id, 'Signed');

        // Now send the user back to the dashboard so they can see the updates to everything
        window.location = "/dashboard";
    } catch(err) {
        console.log(err);
    }
}

async function getBidWithId(bidId) {
    // console.log("/api/bid/" + bidId);
    return $.ajax({
        url: "/api/bid/" + bidId,
        method: "GET"
    });
}

async function updateBidStatus(bidId, bidStatus) {
    // console.log("/api/bid/" + bidId + "/" + bidStatus);
    return $.ajax({
        url: "/api/bid/" + bidId + "/" + bidStatus,
        method: "PUT"
    });
}

async function getBidsForListing(listing_id) {
    return $.ajax({
        url: "/api/bid/listing/" + listing_id,
        method: "GET"
    });
}

async function updateListing(listing_id, listing_status) {
    return $.ajax({
        url: "/api/listing/" + listing_id + "/" + listing_status,
        method: "PUT"
    });
}

async function updateBidRejected(bid_id, reason) {
    // console.log("updateBidRejected " + bid_id + " " + reason);
    return $.ajax({
        url: "/api/bid/rejected/" + bid_id + "/" + reason,
        method: "PUT"
    });
}

function getRejectionReason() {
    return $("#agent_bid_reject_message").val();
}

function rejectBid(bidId) {
    // If the user clicks Reject, render the reason section
    // console.log("rejectBid "+ bidId);

    const rejectionReasonSection = $('#rejectionReason').empty();
    let rejectionReasonRow = getRejectionReasonRow(bidId);
    rejectionReasonSection.append(rejectionReasonRow);
}

async function save(bidId) {
    // console.log("save " + bidId);
    // This method is called when the user saves a Rejection reason

    let reason = getRejectionReason();
    let updatedBid = await updateBidRejected(bidId, reason);
    window.location = "/dashboard";
}

async function skip(bidId) {
    // console.log("skip " + bidId);
    // This method is called when the user does not enter a rejection reason
    let updatedBid = await updateBidStatus(bidId, "Rejected");
    window.location = "/dashboard";
}

function renderBidDetailTitle(bid) {
    const bidDetailTitle = $('#bidDetailTitle').empty();

    let title = `
       Bid From ${bid.first_name} ${bid.last_name}
    `;
    bidDetailTitle.append(title);
}

function renderBidButtons(bid) {
    // console.log("renderBidButtons");
    let buttonRow = `
        <button type="button" class="btn btn-primary btn-lg" onClick="acceptBid(${bid.id})">Accept</button>
        <button type="button" class="btn btn-secondary btn-lg" onClick="rejectBid(${bid.id})">Reject</button>
    `;
    $('#bidButtons').append(buttonRow);
    // console.log(buttonRow);
}

function renderPage(bid) {
    // console.log("biddetails " + bidId);

    // Render the bid title "bid from firstName lastName"
    // console.log(bid);

    renderBidDetailTitle(bid);

    // Render the Accept and Reject buttons
    renderBidButtons(bid);
}

$( document ).ready(async function() {
    // '/biddetails?id=3
    // Only one query parameter is expected in this URL, the bid id

    // Array(6) ["id", "1", "name", "foo", "address", "123%20Main%20St"]
    // In this page, we expect id=num, so get the value in the second position
    let ids = getParam(); // getParam is defined in common.js

    let bids = await getBidWithIdIncludeAgentName(ids[1]);
    const bid = bids[0];
    renderPage(bid); 

    listenToEvents();
    selectCheckboxes(bid); // render the bid checkboxes
    populateMessage(bid);
  });
