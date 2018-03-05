
$( function(){
  /*
  var mode="signup";
  $("#signin").on("click",function(event){
    event.preventDefault();
      if(mode === 'login') {
        mode = 'signup';
        $('#content-title').text('Sign Up');
        $(this).text('Login');
      } else { //mode === 'signup'
        mode = 'login';
        $('#content-title').text('Login');
        $(this).text('Sign Up');
      }
  });
  */

  $("#signinButton").on("click", function(event){
    event.preventDefault();
    //get the login stuff
    var username = $("#signinUsername").val().trim();
    var pwd = $("#signinPwd").val().trim();
    console.log("username: "+ username);
    console.log("pwd: " + pwd);
  });

  $("#signupButton").on("click", function(event){
    event.preventDefault();
    //get the signup stuff
    var username = $("#signupUsername").val().trim();
    var pwd = $("#signupPwd").val().trim();
    console.log("username: "+ username);
    console.log("pwd: " + pwd);
  });
});
