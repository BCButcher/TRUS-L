
function createAgent() {
    // console.log("profileagent.js createAgent");

    let newAgent = {
      license: $('#licenseNumber').val(),
      first_name:$('#agentName').val(),
      last_name:$('#agentLast').val(),
      email:$('#agentEmail').val(),
      phone:$('#agentPhone').val(),
      web_site:$('#agentWebsite').val(),
      password:$('#agentPass').val(),
      title: $('#agentTitle').val(),
      display_name: $('#profileDisplayName').val()
    };

    $.ajax({
      url: "/api/agent/",
      method: "POST",
      data: newAgent
    }).then(function(newAgent) {
        // console.log("profileagent.js after new agent created");
        // console.log(newAgent);

        window.location.href = '/login';
    });
  }

$( document ).ready(function() {
    // Read the user_id from session storage
    // If it isn't there, redirect to the login page to set it.
    generateDisplayName();
    generateLoginLogout();
});
