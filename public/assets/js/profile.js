
// adding new listing
function createListing(id) {
  try {
    let newlisting = {
      poster_id: id,
      property_address: $("#buyer_location").val(),
      listing_status: "Active",
      estimated_value: $('#buyer_value_slider').val(),
      type_of_home: $('#propertyType option:selected').text()
    };

    $.ajax({
      url: "/api/listing/",
      method: "POST",
      data: newlisting
    }).then(function(newListing) {
      showConfirmation();
    }).catch(function(err) {
      console.log(err);
    });
  } catch(err) {
    console.log(err);
  }
}

function createUser() {
  event.preventDefault();

  try {
    let newConsumer = {
      display_name: $("#profileDisplayName").val(),
      first_name: $("#firstName").val(),
      last_name: $("#lastName").val(),
      email: $("#email").val(),
      password:$('#password').val()
    };

    if(newConsumer.display_name.trim() == "") {
      newConsumer.display_name = newConsumer.first_name;
    }

    // eslint-disable-next-line no-undef
    $.ajax({
      url: "/api/consumer/",
      method: "POST",
      data: newConsumer
    }).then(async function(newConsumer) {
      createListing(newConsumer.id);
    }).catch(function(err) {
      console.log(err);
    });
  } catch(err) {
    console.log(err);
  }
}

function showConfirmation() {
  // Redirect them to the login page
  window.location.href='/login';
}

function updateSlider() {
  var slider = document.getElementById("buyer_value_slider");
  var output = document.getElementById("value");
  output.innerHTML = buyer_value_slider.value; // Display the default slider value
}


$( document ).ready(function() {
  // Read the user_id from session storage
  // If it isn't there, redirect to the login page to set it.
  generateDisplayName();
  generateLoginLogout();

});
