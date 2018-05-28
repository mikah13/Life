/*
if isset session
    direct to another page
else {
    check login
    if true
        open new session then direct
    else
        keep username
}
1 php to validate Login
1 php to validate session
*/
$(document).ready(function() {
    if (validateLocal()) {
        location.href = "user.html";
    } else {
        $('#login-btn').click(_ => {
            let username = $('#username').val();
            let password = $('#password').val();
            let data = {
                username,
                password
            };
            let url = 'https://mikah-life.azurewebsites.net/validateAccount.php';
            $.post(url, data, res => {
                if (res === 'success') {
                    setLocal();
                    location.href = "user.html";
                } else {
                    $('#password').val('');
                    $('.msg').html("Invalid username or password");
                }
            })
        })
    }
})
