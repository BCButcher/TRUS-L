
function displayContactInfoAndReviewButton(listingId) {
    const listingsList = $('#contact').empty();

    // AJAX Get call
    $.ajax({
        url: "/api/listing/agent/signed/" + listingId,
        method: "GET"
    }).then(function(users) {
        let user = users[0];

        if(user == undefined) {
            console.log("Should not happen. Signed listing but no agent. Listing id is " + listingId);
            listingsList.append(
                `
                <div class="list-group pt-3">
                    <div>
                       <h3 class="mb-1">No Agent is signed for this listing.</h3>
                    </div>
                    <p>Sign with an agent to see the agent's contact information on this page.</p>
                </div>
                `
            );
        } else {
            listingsList.append(
            `
            <div class="list-group pt-3">
                <div class="pb-3">
                   <h3 class="mb-1">${user.first_name} ${user.last_name}</h3>
                   <small><i><b>Display Name:</b> ${user.display_name}</i></small>
                </div>
                <p><b>Email:</b> ${user.email}</p>
                <p><b>Phone:</b> ${user.phone}</p>
                <p><b>Title:</b> ${user.title}</p>
                <p><b>Web site:</b> ${user.web_site}</p>
            </div>
            `
            );

            const reviewButton = $('#review').empty();
            const button = `
                <button type="button" class="btn btn-secondary" onClick="window.location.href='/submitreview?id=${user.id}'">Review agent</button>
            `;
            reviewButton.append(button);
        }
    }).catch(function(err) {
        console.log(err);
    })
}

$( document ).ready(function() {
    const listingId = getParam()[1];

    generateDisplayName();
    generateLoginLogout();
    displayContactInfoAndReviewButton(listingId);
});
  