function createCounterBid() {
    let storedService = getServices();
    let listId = getParam()[1];
    let offer = escape($('#offer').val());
    // console.log(bidInfo);
    $.ajax({
        url: "/api/bid/active/" + listId + "/" + storedService + "/" + offer,
        method: "PUT"
    }).then(function() {
        // console.log('new bid posted')
        window.location.href='/dashboard';
    });
}

function populateRejectionReason(bid) {
    if(bid.rejection_reason) {
        let rejectionReason = `
        <h5 class="pt-3">Your bid was rejected because</h5>
        <div class="input-group">
            <textarea class="form-control" aria-label="With textarea" id="rejectionReason">${bid.rejection_reason}</textarea>
        </div>
        `;
        const rejectionReasonSection = $('#rejectionReasonSection').empty();
        rejectionReasonSection.append(rejectionReason);
    }
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
