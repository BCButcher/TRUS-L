
// adding new listing
function createListing(id) {
  try {
    console.log(id);

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
  // If the user profile is created, tell them it was successful
  // and show them the button to turn to the login page. 

  const confirmSection = $('#confirm').empty();
  let confirmRow = getConfirmRow();
  confirmSection.append(confirmRow);
}

function getConfirmRow() {
  let confirmRow = `
  <div class="row">
    <div class="col">
      <p>Your profile and listing were created. Please sign in.</p>
      <button type="button" id="goToDashboard" class="btn btn-primary" onClick="window.location.href='/dashboard'">Login</button>
   </div>
 </div>
 `;
//    console.log("biddetails " + rejectionReasonRow);
 return confirmRow;
}

function updateSlider() {
  var slider = document.getElementById("buyer_value_slider");
  var output = document.getElementById("value");
  output.innerHTML = buyer_value_slider.value; // Display the default slider value
}


