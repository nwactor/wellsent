
$( function(){

  $("#loginButton").on("click", function(event){
    event.preventDefault();
    //get the login stuff
    var username = $("#loginUsername").val().trim();
    var password = $("#loginPwd").val().trim();
    //clear input fields;
    $("#loginUsername").val("");
    $("#loginPwd").val("");
    //check if we have the usename and thee password
    
    if(!username || !password ){ return; }
    $.post("/api/login",{ 
      username: username, 
      password: password 
    }).then(function(data){
      console.log(data);
      window.location.replace(data);
    });
    /*
    .catch(function(err){
      console.log(err);
    });*/
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
        $.post("/api/signup", {username: username, password: password}).then(function(data) {
          console.log(data);
          window.location.replace(data);
        });
      }
    });
  });

});
