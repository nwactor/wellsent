//=============================================
//===============Page Load=====================
//=============================================

var currentPoolID;
var username;
var userPools;

// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function(data) {
  username = data.username;
  $("#username-display").text("Welcome, " + username);
  //loadPools();
});
 
//link to locksmith in main.html before the link to this file

//=============================================
//===============User Searching================
//=============================================

$('#open-search-btn').on('click', function() {
  //show the search modal
  $('#myModal').modal();
});

$('#search-users-btn').on('click', function() {
	$('#search-results').empty();

	var searchTerm = $('#search-input').val();
	$.get('/api/user/search/' + searchTerm).then(function(response) {
		response.forEach(function(user) {
			if(user.username != username) {
				var result = $('<div>');
				result.text(user.username);
				$('#search-results').append(result);
			}
		});
	});
});

function startConversation(recipient) {
  
}

//=============================================
//===============Message Pools=================
//=============================================

//store key and update database when everyone has recieved it

//load message pools in UI
function loadPools() {
  //clear the pool UI
  userPools = [];
  $.get("/api/messagePool/" + username).then(function(response) {
    getUserPools(response, 0);
    console.log(userPools);
    //add pools to UI
    userPools.forEach(function(pool) {
    	$('#pool-list').append(pool);
    });
  });
}

function getUserPools(response, index) {
	if(index < getUserPools.length) {
		var pool = response[index]
		var poolFrontEnd = createPoolUI(pool);
		poolFrontEnd.data('data-pool', pool);

		$.get('/api/messagePool/' + pool.id).then(function(users) {
			poolFrontEnd.data('data-memebers', users);

			userPools.push(poolFrontend);
      		userPools.sort(function(a, b) {
        		return new Date(b.data('data-pool').updatedAt) - new Date(a.data('data-pool').updatedAt);
      		});

      		getUserPools(response, index + 1);
		});
	}
}

function createPoolUI(data) {
  	var pool = $('<div>');
  	pool.addClass('conversation-tab')
	//do more stuff to make it look like something

  	return pool;
}

$(document).on('click', '.conversation-tab', function() {
	openPool($(this).data('data-pool').id);
});

function openPool(id) {
	currentPoolID = id;
	//open the pool

}

//filter message pools
//called when filterInput.val changes
function filterPools() {
  
}

//=============================================
//===============Message Area==================
//=============================================

//load messages when a pool is opened
function loadMessages() {
  
}

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

//update messages: use firebase? or sequelize triggers