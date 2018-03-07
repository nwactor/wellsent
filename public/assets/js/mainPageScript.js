var currentPoolID;
var username;
var userPools;

// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function(data) {
  username = data.username;
  $(".username").text(username);
  loadPools();
});
 
//link to locksmith in main.html before the link to this file


$('#search-user-btn').on('click', function() {
  
});

$('#send-btn').on('click', function() {
  var message = $('#message-input').val().trim();
  if(message != '') {
    var encodedMessage = locksmith(message);
    $.post("/api/message", {
      body: encodedMessage,
      UserUsername: username,
      MessagePoolID: currentPoolID
    }).then(function(result) {
      //display in UI
      
      //clear the message input
      $('#message-input').val('');
    });
  }
});

//load message pools in UI
function loadPools() {
  //clear the pool UI
  userPools = [];
  $.get("/api/messagePool/" + username).then(function(response) {
    response.forEach(function(pool) {
      //unoptimized push and sort
      var poolFrontend = createPoolUI();
      poolFrontEnd.data('data-pool', pool);
      
      userPools.push(poolFrontend);
      userPools.sort(function(a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    });
    console.log(userPools);
    
    //add pools to UI
  });
}

function createPoolUI() {
  var pool = $('<div>');
  //do more stuff to make it look like something
  return pool;
}

//filter message pools
//called when filterInput.val changes
function filterPools() {
  
}


//open search area
function displaySearchArea() {
  
}

//search for users
function searchUsers() {
  
}

function startConversation(recipient) {
  
}

//load messages when a pool is opened
function loadMessages() {
  
}

//update messages: use firebase? or sequelize triggers


//store key and update database when everyone has recieved it