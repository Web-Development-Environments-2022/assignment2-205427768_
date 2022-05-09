$( document ).ready(function() {
    localStorage.setItem('k', 'k');

    $("form[name='registerForm']").validate
    ({
        rules: 
        {
            username:
            {
                required: true,
                usernameAvailability: true
            },

            password:
            {
                required: true,
                validPassword: true,
                minlength: 6
            },

            email: 
            {
                required: true,
                email: true
            },

            firstname:
            {
                required: true,
                lettersonly: true
            },

            lastname:
            {
                required: true,
                lettersonly: true
            },

            days:
            {
                required: true,
                Number: true
            },

            months:
            {
                required: true,
                Number: true
            },

            years:
            {
                required: true,
                Number: true
            }
        }, 

        messages:
        {
            username:
            {
                usernameAvailability: "The Username You Entered Is Already Selected"
            },

            password:
            {
                validPassword: "Invalid Password! must contain at least one letter and one number",
                minlength: "Invalid Password! length must be at least 6"
            },

            email: 
            {
                email: "Please Enter A Valid E-mail"
            },

            firstname:
            {
                lettersonly: "Please Enter A Valid Name"
            },

            lastname:
            {
                lettersonly: "Please Enter A Valid Name"
            },

            days:
            {
                required: "Choose Day",
            },

            months:
            {
                required: "Choose month",
            },

            years:
            {
                required: "Choose Year",
            }
        },

        SubmitEvent: function()
        {
            let un = document.getElementById("username").value;
            let p = document.getElementById("password").value;
            localStorage.setItem(un, p);
            let form = $("form[name='register']");
            form[0].reset();
        }
    })
});


$(function() {
	// the username is available
	$.validator.addMethod('usernameAvailability', function (userName) {
		 var available = (localStorage.getItem(userName)==null);
         return available;
	});

	// the password contain at least 1 number and 1 letter
	$.validator.addMethod('validPassword', function (password) {
		var validPassword =  /[a-z].*[0-9]|[0-9].*[a-z]/i.test(password)
        return validPassword;
	});
});