function verifyPassword() {
    event.preventDefault();
    
    var username = $("#email_login_input").val().trim();
    var password = $("#password_login_input").val().trim();

    console.log("verifying");

    if (username != "" && password != "") {
        $.ajax({
            url: '/api/' + username + '/' + password,
            type: 'post',
            data: { id: username, password: password }
        }).then(function(response) {
            if (response == true) {
                console.log("verify password response true");
                window.location = "/dashboard";
            } else {
                console.log("verify password response false");
                $("#message").html("Invalid username and password.");
            }
        }).catch(function(err) {
            // If something goes wrong, send the message to the console to tell us what error was 
            // thrown.
            console.log(err);
        });
    }
}