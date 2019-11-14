
function createAgent() {
    console.log("profileagent.js createAgent");

    let newAgent = {
      license: $('#licenseNumber').val(),
      first_name:$('#agentName').val(),
      last_name:$('#agentLast').val(),
      email:$('#agentEmail').val(),
      phone:$('#agentPhone').val(),
      web_site:$('#agentWebsite').val(),
      password:$('#agentPass').val(),
      title: $('#agentTitle').val(),
      display_name: $('#displayName').val()
    };

    $.ajax({
      url: "/api/agent/",
      method: "POST",
      data: newAgent
    }).then(function(newAgent) {
        console.log("profileagent.js after new agent created");
        console.log(newAgent);

        window.location.href = '/dashboard';
    });
  }