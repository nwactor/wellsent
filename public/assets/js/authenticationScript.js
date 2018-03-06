
$( function(){

  $("#signinButton").on("click", function(event){
    event.preventDefault();
    //get the login stuff
    var username = $("#signinUsername").val().trim();
    var password = $("#signinPwd").val().trim();
    //clear input fields;
    $("#signinUsename").val("");
    $("#signinPwd").val("");
    //check if we have the usename and thee password
    if(!usename || !password ){ return; }
    $.post("api/login",{ 
      username: username, 
      password: password 
    }).then(function(data){
      console.log(data);
      window.location.replace(data);
    }).catch(function(err){
      console.log(err);
    });
  });

  $("#signupButton").on("click", function(event){
    event.preventDefault();
    //get the signup stuff
    username = $("#signupUsername").val().trim(),
    password = $("#signupPwd").val().trim()
    if(!username || !password ){
      return;
    }
    $("#signupUsername").val("");
    $("#signupPwd").val("");

    $.get("/api/user/" + username).then(function(response) {
      //if null, username isn't taken
      //console.log(response);
      if(response != null) {
        //put in some red text that says user name already taken
        alert('too late');
      } else {
        $.post("/api/signup", {username: username, password: password}).then(function(response) {
          console.log(response);
        }).then(function(response) {
          $.get("/main").then(function(response) {
            window.location.href = "/main";
          });
        });
      }
    });

    // $.post("/api/signup",{
    //   username: username,
    //   password: password
    // }).then(function(data){
    //   window.location.replace(data);
    // }).catch(function(err){
    //   console.log(err);
    // });
  });

});
