function submitReview() {
    let agent_id = getParam()[1];
    let review = $("#review").val().trim();
    if(review === "") {
        review = "The stars say it all."
    }
    let escapedReview = escape(review);
    let stars = $("#stars").val().trim();
    let poster_id = getUserInfo().user_id;
    let tempStars = parseInt(stars);
    if(tempStars=== "NaN" || tempStars>5) {
        stars = 5;
    } else if (tempStars < 1) {
        stars = 1;
    }

    $.ajax({
        url: '/api/reviews/' + agent_id + "/" + poster_id + "/" + stars + "/" + escapedReview,
        type: 'POST'
    }).then(function(response) {
        window.location.href="/dashboard";
    }).catch(function(err) {
        // If something goes wrong, send the message to the console to tell us what error was 
        // thrown.
        console.log(err);
    });
}

$( document ).ready(function() {
    // Read the user_id from session storage
    // If it isn't there, redirect to the login page to set it.
    generateDisplayName();
    generateLoginLogout();

});
