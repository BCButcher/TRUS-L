$(document).ready(function() {
    $("#consumer_login_login").click(function() {
        var username = $("email_login_input").val().trim();
        var password = $("password_login_input").val().trim();

        if (username != "" && password != "") {
            $.ajax({
                url: '/api/consumer/:id/:password',
                type: 'post',
                data: { username: username, password: password },
                success: function(response) {
                    var msg = "";
                    if (response == 1) {
                        window.location = "./profileC.html";
                    } else {
                        msg = "Invalid username and password.";
                    }
                    $("#message").html(msg);
                }
            });
        }
    });
});

$(document).ready(function() {
    $("#agent_login_login").click(function() {
        var username = $("email_login_input").val().trim();
        var password = $("password_login_input").val().trim();

        if (username != "" && password != "") {
            $.ajax({
                url: '/api/agent/:id/:password',
                type: 'post',
                data: { username: username, password: password },
                success: function(response) {
                    var msg = "";
                    if (response == 1) {
                        window.location = "./profileA.html";
                    } else {
                        msg = "Invalid username and password.";
                    }
                    $("#message").html(msg);
                }
            });
        }
    });
});