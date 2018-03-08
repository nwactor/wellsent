//=============================================
//===============Page Load=====================
//=============================================

var currentPoolID;
var username;
var userPools = [];

// On load does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function(data) {
  username = data.username;
  $("#username-display").text("Welcome, " + username);
  //loadPools();
});
 
//link to locksmith in main.

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
				result.addClass('search-result');
				$('#search-results').append(result);
			}
		});
	});
});

$(document).on('click', '.search-result', function() {
	var recipient = $(this).text();
	if(confirm('Are you sure you want to start a conversation with ' + recipient + '?')) {
		startConversation(recipient);
	}
});

function startConversation(recipient) {
  	$.post('/api/messagePool/', {username: username, receivername: recipient}).then(function(result) {
  		console.log(result);
  		var poolFrontEnd = createPoolUI(result);
  		userPools.unshift(poolFrontEnd);
  		$('#pool-list').prepend(poolFrontEnd);
  		openPool(poolFrontEnd);
  	});
}

//=============================================
//===============Message Pools=================
//=============================================

//store key and update database when everyone has recieved it

//load message pools in UI
function loadPools() {
  //clear the pool UI
  $('#pool-list').empty();
  userPools = [];
  $.get("/api/messagePool/" + username).then(function(response) {
    console.log(response);
    /*
    response.forEach(function(pool) {
    	var poolFrontEnd = createPoolUI(pool);
    	userPools.push(poolFrontEnd);
		userPools.sort(function(a, b) {
       		return new Date(b.data('data-pool').updatedAt) - new Date(a.data('data-pool').updatedAt);
       	});
    });

    userPools.forEach(function(pool) {
		$('#pool-list').append(pool);
    });
    */
  });
}

//takes an array of MessagePool JSON, makes a frontend for each index in the array,
//and adds the frontend to the global userPools array
// function getUserPools(response, index) {
// 	if(index < getUserPools.length) {
// 		//get the pool data
// 		var pool = response[index];
// 		//create a UI for it
// 		var poolFrontEnd = createPoolUI(pool);
// 		poolFrontEnd.data('data-pool', pool);

// 		$.get('/api/messagePool/' + pool.id).then(function(users) {
// 			poolFrontEnd.data('data-memebers', users);

// 			userPools.push(poolFrontEnd);
//       		userPools.sort(function(a, b) {
//         		return new Date(b.data('data-pool').updatedAt) - new Date(a.data('data-pool').updatedAt);
//       		});

//       		getUserPools(response, index + 1);
// 		});
// 	}
// }

function createPoolUI(data) {
  	var pool = $('<div>');
  	pool.data('data-pool', data[0]);

  	//get the usernames of all the members
  	var members = [];
  	for(var i = 1; i < data.length; i++) {
  		if(data[i].UserUsername != username) {
  			members.push(data[i].UserUsername);
  		}
  	}
  	pool.data('data-members', members);

  	pool.addClass('conversation-tab');
	//do more stuff to make it look like something

  	return pool;
}

$(document).on('click', '.conversation-tab', function() {
	openPool($(this).data('data-pool').id);
});

function openPool(pool) {
	currentPoolID = pool.data('data-pool').id;
	console.log(pool.data('data-pool'));
	console.log(pool.data('data-members'));
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