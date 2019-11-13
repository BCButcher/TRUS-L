function createbid() {
    let newBid = {
        agent_id:
        listing_id:
        bid_status:
        services:
        message:
    }
  
    $.ajax({
        url: "/api/bids/",
        method: "POST",
        data: newBid
    }).then(function(newConsumer) {
  
    });
  




function services(services){
     
    let servicesArray = [];
    if (services.indexOf('a') >= 0) {
      // option a was selected
      servicesArray.push('In-person tours');
    }

    if (services.indexOf('b') >= 0) {
      // option b selected
      servicesArray.push('Online advertising');
    }

    // Isn't there a way to declare an array with named indices?
    if (services.indexOf('c') >= 0) {
      // option b selected
      servicesArray.push('Paint');
    }

    if (services.indexOf('d') >= 0) {
      // option b selected
      servicesArray.push('Print brochures');
    }

    if (services.indexOf('e') >= 0) {
      // option b selected
      servicesArray.push('Print advertising');
    }

    if (services.indexOf('f') >= 0) {
      // option b selected
      servicesArray.push('Staging');
    }

    if (services.indexOf('g') >= 0) {
      // option b selected
      servicesArray.push('Virtual tours');
    }

    if (services.indexOf('h') >= 0) {
      // option b selected
      servicesArray.push("Buy your house if you can't sell it");
    }

    return servicesArray;
  }


