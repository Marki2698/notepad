(function() {
    $(document).ready(function() {
        $('a').click(function() {
            if ($(this).attr('sign-type') == 'in') {
                SignIn();
            } else if ($(this).attr('sign-type') == 'up') {
                SignUp();
            }
        });

        $('.closeSign').click(function() {
            if ($(this).attr('data-sign') == 'in') {
                $('#signIn').attr('class', 'hidden-sign');
            } else if ($(this).attr('data-sign') == 'up') {
                $('#signUp').attr('class', 'hidden-sign');
            }
        });

        /*$('input').click(function() {
            if ($(this).attr('name') == 'in') {
                Enter();
            } else if ($(this).attr('name') == 'up') {
                UpAndEnter();
            }
        });*/
        /*$("#in").click(function() {
            //alert('clicked.');
            /*let email = $("#in_email").val();
            alert(email);
            let pass = $("#in_pass").val();
            alert(pass);
            $.ajax({
                type: "POST",
                url: "/signIn",
                data: {
                    email: email,
                    pass: pass
                },
                success: function(res) {
                    alert(res);
                },
                error: function(res) {
                    alert(res.message);
                }
            });
            //Enter();
        });*/
        $("#up").click(function(e) {
            //e.preventDefault();
            let name = $('#name').val();
            let surname = $('#surname').val();
            let email = $('#up_email').val();
            let pass = $('#up_pass').val();
            let repeat_pass = $('#repeat_pass').val();
            let word = $('#secret_word').val();
            if (name == "" || surname == "" || email == "" || repeat_pass == "" || pass == "" || word == "") {
                alert('All fields are required');
                return;
            }
            if (pass != repeat_pass) {
                alert('Passwords not match');
                e.preventDefault();
                return;
            }
            //$(this).click();
            //UpAndEnter();
        });
    });
})();