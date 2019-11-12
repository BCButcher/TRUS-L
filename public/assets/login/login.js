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

$("#consumer_login_login").click(function(e) {
    if ($("#email_input_login").val() == "")
        $("#email_label_login").text("Enter Username")
    else $("#email_label_login").text("");
    if ($("#password_input_login").val() == "")
        $("#password_label_login").text("Enter Password");
    else $("#password_label_login").text("");
    if (($("#email_input_login").val() != "") &&
        ($("#password_input_login").val() != ""))

        $.ajax({
        type: "POST",
        url: "api/consumer/:id/:password",
        contentType: "application/json; charset=utf-8",
        data: '{"username":"' + $("#email_input_login").val() +
            '","password":"' + $("#password_input_login").val() + '"}',
        dataType: "json",
        success: function(result, status, xhr) {
            if (result.d == "Success") {
                $("#loginSuccessful").text("Login Successful");
                setTimeout(function() { window.location = "profileC.html"; },
                    2000);
            } else
                $("#loginSuccessful").text("Login Failed");
        },
        error: function(xhr, status, error) {
            $("#dbData").html("Result: " + status + " " +
                xhr.status + " " + xhr.statusText)
        }
    });
});

$(document).ajazStart(function() {
    $("#loadingImg").show();
});

$(document).ajaxStop(function() {
    $("#loadingImg").hide();
});