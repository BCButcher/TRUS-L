function createCounterBid() {
    let storedService = getServices();
    let listId = getParam()[1];
    // console.log(bidInfo);
    $.ajax({
        url: "/api/bid/active/" + listId + "/" + storedService + "/" + $('#offer').val(),
        method: "PUT"
    }).then(function() {
        // console.log('new bid posted')
        window.location.href='/dashboard';
    });
}

$( document ).ready(async function() {
    // '/counterbid?id=3
    // Only one query parameter is expected in this URL, the bid id

    // Array(6) ["id", "1", "name", "foo", "address", "123%20Main%20St"]
    // In this page, we expect id=num, so get the value in the second position
    let ids = getParam(); // getParam is defined in common.js

    let bids = await getBidWithIdIncludeAgentName(ids[1]);
    const bid = bids[0];

    listenToEvents();
    selectCheckboxes(bid);
    populateMessage(bid);
  });
