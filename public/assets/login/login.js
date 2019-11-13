function verifyPassword() {
    event.preventDefault();

    var username = $("#email_login_input").val().trim();
    var password = $("#password_login_input").val().trim();

    if (username != "" && password != "") {
        $.ajax({
            url: '/api/' + username + '/' + password,
            type: 'post',
            data: { id: username, password: password }
        }).then(function(response) {
            if (response.user_id === -1) {
                // Either email not found or password doesn't match
                $("#message").html("Invalid username and password.");
            } else {
                // Set the user's id in session storage because it's not
                // sensitive information. 
                sessionStorage.user_id=response.user_id;
                sessionStorage.agent_id=response.agent_id;
                window.location = "/dashboard";
            }
        }).catch(function(err) {
            // If something goes wrong, send the message to the console to tell us what error was 
            // thrown.
            console.log(err);
        });
    }
}