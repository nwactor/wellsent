
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
    //clear input fields;
    $("#signinUsename").val("");
    $("#signinPwd").val("");
    //check if we have the usename and thee password
    if(!usename || !pwd ){ return; }
    $.post("api/user/authenticate",{ username: username, password: pwd;
    }).then(function(response){
      $.get("/main").then(function(resp){
        window.location.href = "/main";
      });
    });

  });

  $("#signupButton").on("click", function(event){
    event.preventDefault();
    //get the signup stuff
    var username = $("#signupUsername").val().trim();
    var pwd = $("#signupPwd").val().trim();
    $.get("/api/user/" + username).then(function(response) {
      //if null, username isn't taken
      console.log(response);
      if(response != null) {
        //put in some red text that says user name already taken
        alert('too late');
      } else {
        $.post("/api/user", {username: username, password: pwd}).then(function(response) {
          console.log(response);
        }).then(function(response) {
          $.get("/main").then(function(response) {
            window.location.href = "/main";
          });
        });
      }
    });
  });


});
