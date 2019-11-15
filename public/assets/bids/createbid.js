function createBid() {
    let storedService = getServices();
    const userInfo = getUserInfo();
    let listId = getParam()[1];
    let bidInfo = {
        agent_id: userInfo.agent_id,
        listing_id: listId,
        bid_status: 'Active',
        services: storedService,
        message: $('#offer').val() 
    }

    //console.log(bidInfo);
    
    $.ajax({
        url: "/api/bid/",
        method: "POST",
        data: bidInfo
    }).then(function() {
        // console.log('new bid posted')
        window.location.href='/dashboard';
    });
}
