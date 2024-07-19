$(function () {

    let $registerForm = $('#myvalidation')

    $registerForm.validate({
        rules: {
            user: {
                required: true,
                lettersOnly: true
            },
            phone: {
                required: true,
                numericonly: true,
                minlength:10,
                maxlength:12
            },
            password: {
                required: true,
                minlength: 6,
                
              
            },
            cpassword: {
                required: true,
                equalTo:"#password"
            },
            email: {
                required: true,
                email: true
            }

        },
        messages: {
            name: {
                required: "name must be required",
                lettersOnly: "invalid name"
            },
            mobile: {
                required: "Mobile must be required",
                numericonly: "Phone number Invalid",
                minlength: 'min 10 digit',
                maxlength: 'mx 12 digit'

            },
            password: {
                required: "Password must be required",
                minlength: 'min 6 digit',
                
               
                
            },
            cpassword: {
                required: "Confirm Password must be required",
                equalTo:"Password mismatch"
                
            },
            email: {
                required: "Email must be required",
                email: "invalid email"
            }
        },
        errorPlacement: function (error, element) {
            if (element.is(":radio")) {
                error.appendTo(element.parents(".gen"));
            } else {
                error.insertAfter(element)
            }
        }


    })


    jQuery.validator.addMethod("lettersOnly", function (value, element) {
        return  /^[a-z," "]+$/i.test(value);
    }, "Letters and spaces only please");

    jQuery.validator.addMethod("numericonly", function (value, element) {
        return /^[0-9]+$/i.test(value);
    }, "Please enternumber only.");

   
        
})