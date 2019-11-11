// adding new listing
function createListing() {
  let listing = {
    typeofHome: $("#typeOfHome").val(),
    first_name: $("#address").val(),
    last_name: $("#estimatedVal").val()
  };

  $.ajax({
    url: "/api/listing/",
    method: "POST",
    data: newlisting
  }).then(function(newListing) {
    $("#listingConfirmation").appendTo(`
  
            <h3> PROFILE CREATED</h3>
            <li>Display name: ${newListing.typeofHome}</li>
            <li>First name: ${newListing.address}</li>
            <li>Last name: ${newListing.estimatedVal}</li>
  
          `);
    alert(confirmationMessage);
  });
}

function createConsumer() {
  let consumer = {
    display_name: $("#displayName").val(),
    first_name: $("#firstName").val(),
    last_name: $("#lastName").val(),
    email: $("#email").val()
  };

  // eslint-disable-next-line no-undef
  $.ajax({
    url: "/api/consumer/",
    method: "POST",
    data: consumer
  }).then(function(newConsumer) {
    let confirmationMessage = `
                 PROFILE CREATED
                 Display name: ${newConsumer.displayName}
                 First name: ${newConsumer.firstName}
                 Last name: ${newConsumer.lastName}
                 Email: ${newConsumer.email}
  
              `;
    alert(confirmationMessage);
  });
  createListing();
  window.location.href = "/confirm.html";
}
