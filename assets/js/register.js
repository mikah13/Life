$(document).ready(function() {
    if (validateLocal()) {
        location.href = "user.html";
    } else {
        $('#register-btn').click(_ => {
            let username = $('#username').val();
            let password = $('#password').val();
            let data = {
                username,
                password
            };
            let url = 'https://mikah-life.azurewebsites.net/createAccount.php';
            $.post(url, data, res => {
                if (res === 'success') {
                    setLocal();
                    location.href = "user.html";
                } else {
                    $('#password').val('');
                    $('.msg').html("Invalid Username");
                }
            })
        })
    }
})
