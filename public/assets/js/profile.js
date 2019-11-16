
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
      display_name: $("#displayName").val(),
      first_name: $("#firstName").val(),
      last_name: $("#lastName").val(),
      email: $("#email").val(),
      password:$('#password').val()
    };

    // eslint-disable-next-line no-undef
    $.ajax({
      url: "/api/consumer/",
      method: "POST",
      data: newConsumer
    }).then(async function(newConsumer) {
      createListing(newConsumer.user_id.id);
    }).catch(function(err) {
      console.log(err);
    });
  } catch(err) {
    console.log(err);
  }
}

function showConfirmation() {
  // Redirect them to the dashboard
  window.location.href='/dashboard';
}

function updateSlider() {
  var slider = document.getElementById("buyer_value_slider");
  var output = document.getElementById("value");
  output.innerHTML = buyer_value_slider.value; // Display the default slider value
}


