
// adding new listing
function createListing(id) {
  let newlisting = {
    poster_id: id,
    property_address: $("#address").val(),
    listing_status: "Active",
    estimated_value: $('#buyer_value_slider').val(),
    type_of_home: $('#propertyType').val()
    
  };
console.log(newlisting);
  $.ajax({
    url: "/api/listing/",
    method: "POST",
    data: newlisting
  }).then(function(newlisting) {
   console.log(newlisting);
  });
}

function createUser() {
  let consumer = {
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
    data: consumer
  }).then(function(newConsumer) {
    let confirmationMessage = `
                 PROFILE CREATED
                 Display name: ${newConsumer.displayName}
                 First name: ${newConsumer.firstName}
                 Last name: ${newConsumer.lastName}
                 Email: ${newConsumer.email}
  
              `;
   
  });
  createListing(Consumer.id);
  window.location.href = "/confirm.html";
}

function createAgent() {
  let newAgent = {
    id: id,
    license: $('licenseNumber').val(),
    first_name:$('agentName').val(),
    last_name:$('agentLast').val(),
    email:$('agentEmail').val(),
    phone:$('agentPhone').val(),
    web_site:$('agentCompany').val(),
    password:$('agentPass').val()

  };

  $.ajax({
    url: "/api/agent/",
    method: "POST",
    data: newAgent
  }).then(function(newAgent) {
    console.log(newAgent)
  });
}

function createUserAndListing() {
  createUser();
  createListing();
}

function updateSlider() {
  var slider = document.getElementById("buyer_value_slider");
  var output = document.getElementById("value");
  output.innerHTML = buyer_value_slider.value; // Display the default slider value
}


