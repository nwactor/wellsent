// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function(data) {
  $(".username").text(data.username);
});
/*
$('#send-btn').on('click', function() {
  var message = $('#message-input').val().trim();
  if(message != '') {
    var encodedMessage = locksmith(message);
    
  }
});
*/
$.post("/api/messagePool", {username: "denis", receivername: "hillary"}).then(function(res) {
	console.log(res);
});