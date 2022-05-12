$( document ).ready(function() {
    localStorage.setItem('k', 'k');
    addSelectDateItems();
   
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
                number: true
            },

            months:
            {
                required: true,
                number: true
            },

            years:
            {
                required: true,
                number: true
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
        submitHandler: function () {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            localStorage.setItem(username, password);
            let form = $("form[name='registerForm']");
            form[0].reset();
            show("login");
        }
    });

    $("form[name='loginForm']").validate({
		rules: 
		{
            username: 
		  {
			  required: true,
		  },

		  password: 
		  {
			required: true,
		  }
	    },

		submitHandler: function() {
            let form = $("form[name='loginForm']"); 
            let username = document.getElementsByName("usernameLogin")[0].value;
            let password = document.getElementsByName("passwordLogin")[0].value;
            let userPassword = localStorage.getItem(username);
            
            if (userPassword == null || userPassword != password){
                alert("wrong password!");
                form[0].reset();
            }
            else if(password == userPassword){
                show('Settings');
                //alert("yes");
            }
            else{
                form[0].reset();
                alert("no");
            }
		},
	  });
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

function  addSelectDateItems()
{
    var days = '<option value="days">Day</option>';
    for (var i=1;i <= 31 ;i++){
        days += '<option value="'+ i + '">' + i + '</option>';
    }
    
    var months = '<option value="months">Month</option>';
    for (var i=1; i <= 12 ;i++){
        months += '<option value="'+ i + '">' + i + '</option>';
    }
    
    var years = '<option value="years">Year</option>';
    for (var i=1950; i <= 2022 ;i++){
        years += '<option value="'+ i + '">' + i + '</option>';
    }
    
    $('#days').append(days);
    $('#months').append(months);
    $('#years').append(years);
}

