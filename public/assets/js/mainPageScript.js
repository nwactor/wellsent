//=============================================
//===============Page Load=====================
//=============================================

var currentPoolID;
var username;
var userPools = [];
var convoFilter = '';

// On load does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function(data) {
  username = data.username;
  $("#username-display").text("Welcome, " + username);
  loadPools();
});

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
      if (user.username != username) {
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
  if (confirm('Are you sure you want to start a conversation with ' + recipient + '?')) {
    //close modal
    $('#myModal').modal('toggle');
    startConversation(recipient);
  }
});

function startConversation(recipient) {
  $.post('/api/messagePool/', { username: username, receivername: recipient }).then(function(result) {
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

//load message pools
function loadPools() {
  //clear the pool UI
  $('#pool-list').empty();
  userPools = [];
  $.get("/api/messagePool/" + username).then(function(response) {

    response.forEach(function(pool) {
      var poolFrontEnd = createPoolUI(pool);
      userPools.push(poolFrontEnd);
    });

    orderPools();
  });
}

//orders the pools in the sidebar
function orderPools() {
  userPools.sort(function(a, b) {
    if (a.data('data-pool') != undefined && b.data('data-pool') != undefined) {
      return new Date(b.data('data-pool').updatedAt) - new Date(a.data('data-pool').updatedAt);
    }
  });

  $('#pool-list').empty();

  userPools.forEach(function(pool) {
    if (pool.text().startsWith(convoFilter) || convoFilter == '') {
      $('#pool-list').append(pool);
    }
  });
}

//creates the visual respresentation of a conversation for the sidebar
function createPoolUI(data) {
  var pool = $('<li>');
  pool.data('data-pool', data[0]);

  //get the usernames of all the members
  pool.data('data-members', data[1]);

  pool.addClass('conversation-tab');

  //do more stuff to make it look like something
  var poolTitle = '';
  for (var i = 0; i < data[1].length; i++) {
    if (data[1][i].UserUsername != username) {
      poolTitle += data[1][i].UserUsername;
    }
  }

  pool.text(poolTitle);

  pool.addClass('c-nav__item');
  pool.addClass('c-nav__item--success');

  return pool;
}

$(document).on('click', '.conversation-tab', function() {
  openPool($(this));
});

//open the given pool
function openPool(pool) {
  currentPoolID = pool.data('data-pool').id;
  console.log('Switched to ' + currentPoolID);
  $('#displayed-users').text(pool.text());
  loadMessages();
}

function getCurrentPoolKey() {
  var key;
  userPools.forEach(function(pool) {
    var poolData = $(pool).data('data-pool');
    console.log(poolData);

    if (poolData.id === currentPoolID) {
      key = poolData.key;
    }
  });
  return key;
}

//apply filter to conversations
$('#conversation-filter').on('input', function() {
  convoFilter = $(this).val();
  orderPools();
});


//=============================================
//===============Message Area==================
//=============================================

//load messages when a pool is opened
function loadMessages() {
  $('#displayed-messages').empty();

  var key = getCurrentPoolKey(); //must be placed here b/c asynchronicity or something

  $.get('/api/message/' + currentPoolID).then(function(result) {
    result.forEach(function(message) {
      $.post('/api/message/encode', { key: key, message: message.body }).then(function(decoded) {
        var bubble = $('<span>');
        bubble.addClass('c-bubble u-color-white u-display-block');
        bubble.text(decoded);
        if (message.UserUsername === username) {
          bubble.addClass('c-bubble--left');
        } else {
          bubble.addClass('c-bubble--right');
        }
        $('#displayed-messages').append(bubble);
      });
    });
  });
}

$('#send-btn').on('click', function() {
  if (currentPoolID == undefined) { return; }

  var message = $('#message-input').val().trim();
  key = getCurrentPoolKey();

  if (message != '') {
    $.post("/api/message/encode", { key: key, message: message }).then(function(encodedMessage) {
      console.log(encodedMessage);

      $.post("/api/message", {
        body: encodedMessage,
        UserUsername: username,
        MessagePoolID: currentPoolID
      }).then(function(result) {
        //display in UI
        loadMessages();
        //clear the message input
        $('#message-input').val('');
        //reorder the pools in sidebar
        orderPools();
      });
    });
  }
});

//update messages: use firebase? or sequelize triggers