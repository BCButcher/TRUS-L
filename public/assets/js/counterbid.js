function createCounterBid() {
    let storedService = getServices();
    let listId = getParam()[1];
    let offer = escape($('#offer').val());

    // Test if the agent hasn't selected any checkboxes. Use a value that isn't an option so that the 
    // URL works but won't select any checkboxes.
    if(listId === "") {
        listId = '1';
    }

    if(offer === "") {
        offer = "No additional services."
    }
     
    // console.log("/api/bid/active/" + listId + "/" + storedService + "/" + offer);
    $.ajax({
        url: "/api/bid/active/" + listId + "/" + storedService + "/" + offer,
        method: "PUT"
    }).then(function() {
        // console.log('new bid posted')
        window.location.href='/dashboard';
    });
}

function populateRejectionReason(bid) {
    const reason = (bid.rejection_reason) ? bid.rejection_reason : "No reason given.";
    let rejectionReason = `
    <h5 class="pt-3">Your bid was rejected because</h5>
    <div class="input-group">
        <textarea class="form-control" aria-label="With textarea" id="rejectionReason">${reason}</textarea>
    </div>
    `;
    const rejectionReasonSection = $('#rejectionReasonSection').empty();
    rejectionReasonSection.append(rejectionReason);
}

$( document ).ready(async function() {
    // '/counterbid?id=3
    // Only one query parameter is expected in this URL, the bid id

    // Array(6) ["id", "1", "name", "foo", "address", "123%20Main%20St"]
    // In this page, we expect id=num, so get the value in the second position
    let ids = getParam(); // getParam is defined in common.js
    generateDisplayName();
    generateLoginLogout();

    let bids = await getBidWithIdIncludeAgentName(ids[1]);
    const bid = bids[0];

    listenToEvents();
    selectCheckboxes(bid);
    populateMessage(bid);
    populateRejectionReason(bid);
  });
