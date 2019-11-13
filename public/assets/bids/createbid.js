function createBid() {
    let storedService = getServices();
    const userInfo = getUserInfo();
    let listId = 1; //getParam();
    let bidInfo = {
        agent_id: userInfo.agent_id,
        listing_id: listId,
        bid_status: 'Active',
        services: storedService,
        message:$('#offer').val() 
    }
  console.log(bidInfo);
    $.ajax({
        url: "/api/bid/",
        method: "POST",
        data: bidInfo
    }).then(function(newConsumer) {
  console.log('new bid posted')
    });
}


    var storedService;
    var serviceProvided;
    var serviceArray;
    
function getServices() {
        serviceProvided = [];

        serviceArray = $("input[name='services[]']:checked").map(function(i, obj){
            console.log(obj.value);
            return obj.value;
        });
        
        for(var i = 0; i < serviceArray.length; i++){
            serviceProvided.push(serviceArray[i]); 
        }
    return storedService = serviceProvided.toString().replace(/,/g,'');
        
   
}




// function services(services){
     
//     let servicesArray = [];
//     if (services.indexOf('a') >= 0) {
//       // option a was selected
//       servicesArray.push('In-person tours');
//     }

//     if (services.indexOf('b') >= 0) {
//       // option b selected
//       servicesArray.push('Online advertising');
//     }

//     // Isn't there a way to declare an array with named indices?
//     if (services.indexOf('c') >= 0) {
//       // option b selected
//       servicesArray.push('Paint');
//     }

//     if (services.indexOf('d') >= 0) {
//       // option b selected
//       servicesArray.push('Print brochures');
//     }

//     if (services.indexOf('e') >= 0) {
//       // option b selected
//       servicesArray.push('Print advertising');
//     }

//     if (services.indexOf('f') >= 0) {
//       // option b selected
//       servicesArray.push('Staging');
//     }

//     if (services.indexOf('g') >= 0) {
//       // option b selected
//       servicesArray.push('Virtual tours');
//     }

//     if (services.indexOf('h') >= 0) {
//       // option b selected
//       servicesArray.push("Buy your house if you can't sell it");
//     }

//     return servicesArray;
//   
