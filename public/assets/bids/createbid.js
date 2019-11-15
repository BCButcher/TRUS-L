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

function listenToEvents() {
    var checkboxesSocial = $("#social_media");

    checkboxesSocial.on('click', checkStatus1);

    function checkStatus1() {
        if ($(checkboxesSocial).is(':checked')) {
            $("#facebook").prop('disabled', false);
            $("#instagram").prop('disabled', false);
            $("#pinterest").prop('disabled', false);
            $("#twitter").prop('disabled', false);
        } else {
            $("#facebook").prop('disabled', true);
            $("#instagram").prop('disabled', true);
            $("#pinterest").prop('disabled', true);
            $("#twitter").prop('disabled', true);
        }
    }

    var checkboxesMeetings = $("#progress_meetings");

    checkboxesMeetings.on('click', checkStatus2);

    function checkStatus2() {
        if ($(checkboxesMeetings).is(':checked')) {
            $("#in_person_reports").prop('disabled', false);
            $("#phone").prop('disabled', false);
            $("#video_conferencing").prop('disabled', false);
        } else {
            $("#in_person_reports").prop('disabled', true);
            $("#phone").prop('disabled', true);
            $("#video_conferencing").prop('disabled', true);
        }
    }

    var checkboxesTriple = $("#in_person_reports, #phone, #video_conferencing");

    checkboxesTriple.on('click', checkStatus3);

    function checkStatus3() {
        if ($(checkboxesTriple).is(':checked')) {
            $("#daily").prop('disabled', false);
            $("#twice_per_week").prop('disabled', false);
            $("#bi_weekly").prop('disabled', false);
            $("#weekly").prop('disabled', false);
        } else {
            $("#daily").prop('disabled', true);
            $("#twice_per_week").prop('disabled', true);
            $("#bi_weekly").prop('disabled', true);
            $("#weekly").prop('disabled', true);
        }
    }

    var checkboxesDrone = $("#pro_drone_videography");

    checkboxesDrone.on('click', checkStatus4);

    function checkStatus4() {
        if ($(checkboxesDrone).is(':checked')) {
            $("#drone_indoor").prop('disabled', false);
            $("#drone_outdoor").prop('disabled', false);
        } else {
            $("#drone_indoor").prop('disabled', true);
            $("#drone_outdoor").prop('disabled', true);
        }
    }
}


// Return the checkboxes selected as a string, e.g.
// If 'Painting' is selected, and that checkbox is option 'a',
// append 'a' to the services string
function getServices() {

}

$(document).ready(function() { 
    listenToEvents();
});