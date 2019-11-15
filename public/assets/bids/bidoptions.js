function getServices() {
    let storedService;
    let serviceProvided = [];
    let serviceArray;

    serviceArray = $("input[name='services[]']:checked").map(function(i, obj){
        console.log(obj.value);
        return obj.value;
    });
        
    for(let i = 0; i < serviceArray.length; i++){
        serviceProvided.push(serviceArray[i]); 
    }
    return storedService = serviceProvided.toString().replace(/,/g,'');
}

function listenToEvents() {
    let checkboxesSocial = $("#social_media");

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

    let checkboxesMeetings = $("#progress_meetings");

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

    let checkboxesTriple = $("#in_person_reports, #phone, #video_conferencing");

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

    let checkboxesDrone = $("#pro_drone_videography");

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

$(document).ready(function() { 
    listenToEvents();
});