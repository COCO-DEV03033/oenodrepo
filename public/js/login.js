
// var Base_URL = "http://localhost:300/api/"

const post_data = () => {

   var email = $("#email").val();
   var password = $("#password").val();

   if(((email.trim() != "") && (email.indexOf("@") !== -1)) && ((password.trim() != "") && (password.length >= 5)))
   {
    $.ajax({
        url: "api/account/login",
        data: {
             email, password
        },
        type: "POST",
        success: async function( res ) {    
         if(!res.success)     
           {
            $("#snackbar").html(res.message);
           $("#snackbar").addClass("show");
            setTimeout(function(){  $("#snackbar").removeClass("show"); }, 5000);
        }
        else {
            localStorage.setItem("this_token", res.token);
            localStorage.setItem('username',res.username);
            localStorage.setItem('useremail',res.email);
            await testapi(email, password);

            $.ajax({
                url: "api/token/role",
                type: "POST",
                data :{
                    me : localStorage.getItem("this_token")
                },
                success: function( res ) {    
                  if(!res.success)
                  {
                     window.location.href = '/login';
                  }
                  else{
                    if(res.role == "admin" )
                    {
                        window.location.href = '/admin_board';                     
                    }
                    else{
                        window.location.href = '/user_board';
                    }
                  }
                }
            });
          
        }
        }
    });

   }
   else{

    if((email.trim() == "") || (email.indexOf("@") === -1))
    { 
        $(".email_err").show();
        $("#email").css("borderColor", "red");
        $("#email").css("shadowColor", "red");
    }

    if((password.trim() == "") || (password.length < 5))
    { 
        $(".password_err").show();
        $("#password").css("borderColor", "red");
        $("#password").css("shadowColor", "red");
    }
   }
}


const email_val = (email) =>{
    if((email.trim() == "") || (email.indexOf("@") === -1))
    { 
        $(".email_err").show();
        $("#email").css("borderColor", "red");
        $("#email").css("shadowColor", "red");
    }
    else{
     $(".email_err").hide();
     $("#email").css("borderColor", "#ced4da");
    }
}

const password_val = (password) =>{
    if((password.trim() == "") || (password.length < 5))
    { 
        $(".password_err").show();
        $("#password").css("borderColor", "red");
        $("#password").css("shadowColor", "red");
    }
    else{
     $(".password_err").hide();
     $("#password").css("borderColor", "#ced4da");
    }
}


$(document).ready(function() {
    $.ajax({
        url: "api/token/role",
        type: "POST",
        data :{
            me : localStorage.getItem("this_token")
        },
        success: function( res ) {    
          if(!res.success)
          {
             window.location.href = '/login';
          }
          else{
            if(res.role == "admin" )
            {
                window.location.href = '/admin_board';                     
            }
            else{
                window.location.href = '/user_board';
            }
          }
        }
    });
    $("#submit").on("click" , post_data);
 });

