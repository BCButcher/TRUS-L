
function displayContactInfo() {
    const userId = getParam()[1];
    const listingsList = $('#contact').empty();

    // AJAX Get call
    $.ajax({
        url: "/api/consumer/" + userId,
        method: "GET"
    }).then(function(users) {
        let user = users[0];
        listingsList.append(
        `
        <div class="list-group pt-3">
            <div>
               <h3 class="mb-1">${user.first_name} ${user.last_name}</h3>
               <small><i><b>Display Name:</b> ${user.display_name}</i></small>
            </div>
            <p><b>Email:</b> ${user.email}</p>
        </div>
        `
        );
    }).catch(function(err) {
        console.log(err);
    })
}


$( document ).ready(function() {
    generateDisplayName();
    generateLoginLogout();
    displayContactInfo();
});
  