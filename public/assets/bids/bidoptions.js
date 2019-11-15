function getServices() {
    let serviceProvided = [];
    let serviceArray;

    serviceArray = $("input:checked").map(function(i, obj){
        // console.log(obj.value);
        return obj.value;
    });
        
    for(let i = 0; i < serviceArray.length; i++){
        serviceProvided.push(serviceArray[i]); 
    }
    return serviceProvided.toString().replace(/,/g,'');
}

function selectCheckboxes(bid) {
    // If this is a page that is being populated from values stored in the database
    // (i.e., either counter bid or bid details), then the column stored in the database
    // must be used to pre-select the checkboxes (and maybe enable them?)

    
    const storedService = bid.services;

    $('#in_person_tours').prop('checked', (storedService.indexOf('a')>=0));
    $('#open_houses').prop('checked', (storedService.indexOf('i')>=0));
    $('#vr_tours').prop('checked', (storedService.indexOf('j')>=0));
    $('#have_own_website').prop('checked', (storedService.indexOf('k')>=0));
    $('#progress_meetings').prop('checked', (storedService.indexOf('l')>=0));
    $('#in_person_reports').prop('checked', (storedService.indexOf('m')>=0));
    $('#phone').prop('checked', (storedService.indexOf('n')>=0));
    $('#video_conferencing').prop('checked', (storedService.indexOf('o')>=0));
    $('#daily').prop('checked', (storedService.indexOf('p')>=0));
    $('#twice_per_week').prop('checked', (storedService.indexOf('q')>=0));
    $('#bi_weekly').prop('checked', (storedService.indexOf('r')>=0));
    $('#weekly').prop('checked', (storedService.indexOf('s')>=0));
    $('#references').prop('checked', (storedService.indexOf('t')>=0));
    $('#social_media').prop('checked', (storedService.indexOf('u')>=0));
    $('#facebook').prop('checked', (storedService.indexOf('v')>=0));
    $('#instagram').prop('checked', (storedService.indexOf('w')>=0));
    $('#pinterest').prop('checked', (storedService.indexOf('x')>=0));
    $('#twitter').prop('checked', (storedService.indexOf('y')>=0));
    $('#pro_videography').prop('checked', (storedService.indexOf('z')>=0));
    $('#pro_drone_videography').prop('checked', (storedService.indexOf('A')>=0));
    $('#drone_indoor').prop('checked', (storedService.indexOf('B')>=0));
    $('#drone_outdoor').prop('checked', (storedService.indexOf('C')>=0));
    $('#pro_photography').prop('checked', (storedService.indexOf('D')>=0));
    $('#online_advertising').prop('checked', (storedService.indexOf('b')>=0));
    $('#painting').prop('checked', (storedService.indexOf('c')>=0));
    $('#brochures').prop('checked', (storedService.indexOf('d')>=0));
    $('#print_advertising').prop('checked', (storedService.indexOf('e')>=0));
    $('#staging').prop('checked', (storedService.indexOf('f')>=0));
    $('#virtual_tours').prop('checked', (storedService.indexOf('g')>=0));
    $('#buy_house').prop('checked', (storedService.indexOf('h')>=0));
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