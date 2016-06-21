var app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.messagesArray;

app.init = function() {
  this.fetch();
};

app.fetch = function() {
  $.ajax({
    url: this.server, 
    type: 'GET',
    contentType: 'application/JSON',
    success: function(result) {
      var messages = result['results'];
      app.messagesArray = messages;
      app.updateRooms();

      _.each(messages, message => {
        app.addMessage(message);
      });
    },
    error: function(data) {
      console.log('What the French, toast?! The messages didn\'t load!', data);
    }
  });
};

app.send = function(message) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.createMessage = function() {
  var $user = $('#user').val();
  var $text = $('#userMessage').val();
  var $room = $('#userRoom').val();

  var messageObject = {};
  messageObject['username'] = $user;
  messageObject['text'] = $text;
  messageObject['roomname'] = $room;
  this.send(messageObject);
};

app.addMessage = function(messageObject) {
  var message = `<div class="message">
                  <ul>
                    <li class="user">${messageObject.username}</li>
                    <li class="text">${messageObject.text}</li>
                    <li class="time">${messageObject.updatedAt}</li>
                  </ul>
                </div>`;

  $(message).appendTo('#chats');
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.updateRooms = function() {
  var roomsWithDups = _.pluck(this.messagesArray, 'roomname');
  var roomnameObject = {};
  var rooms = [];

  // removes duplicate rooms
  _.each(roomsWithDups, room => {
    if (roomnameObject[room] === undefined && room !== '' && room !== undefined) {
      roomnameObject[room] = true;
      rooms.push(room);
    }
  });

  // empty all rooms from dropdown
  $('#roomSelect').empty();

  // add rooms to dropdown menu
  _.each(rooms, room => {
    var $option = $(`<option class="room" value=${room}>${room}</option>`);
    $option.appendTo('#roomSelect');
  });
};

app.addRoom = function(roomName) {
  var $option = $(`<option class="room" value=${roomName}>${roomName}</option>`);
  $option.appendTo('#roomSelect');
};

setInterval(function() {
  app.init();
}, 5000);

////////////////////////////////////////////////////////////////////////////////

// var getMessages = function() {
//   $.ajax({
//     url: 'https://api.parse.com/1/classes/messages', 
//     type: 'GET',
//     contentType: 'application/JSON',
//     success: function(result) {
//       var messages = result['results'];
//       // displayMessages(messages);
//     },
//     error: function(data) {
//       console.log('What the French, toast?! The messages didn\'t load!', data);
//     }
//   });
// };

// var postMessage = function(message) {
//   $.ajax({
//     url: 'https://api.parse.com/1/classes/messages',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       console.error('chatterbox: Failed to send message', data);
//     }
//   });
// };

// var displayMessages = function(messageArray, roomName) {
//   var $chats = $('#chats');

//   // // removes all messages before refresh
//   // $chats.empty();

//   // // filter messages
//   // if (!roomName) {
//   //   messageArray = _.filter(messages, function(message) {
//   //     return message.roomname === roomName;
//   //   });
//   // }

//   // add messages to #chats
//   _.each(messageArray, function(message) {
//     var text = 'Message: ' + message.text;
//     var user = 'User: ' + message.username;
//     var time = 'Time: ' + message.updatedAt;

//     var $messageText = $('<div class="message"></div>');
//     var $ul = $('<ul></ul>');
//     var $lineUser = $('<li class="user"></li>').text(user).appendTo($ul);
//     var $lineText = $('<li class="text"></li>').text(text).appendTo($ul);
//     var $lineTime = $('<li class="time"></li>').text(time).appendTo($ul);

//     $ul.appendTo($messageText);
//     $messageText.prependTo($chats);
//   });
// };

// var createMessage = function() {
//   var $user = $('#user').val();
//   var $text = $('#userMessage').val();
//   var $room = $('roomname').val();

//   var messageObject = {};
//   messageObject['username'] = $user;
//   messageObject['text'] = $text;
//   messageObject['roomname'] = $room;

//   postMessage(messageObject);
// };

// var filterByRoom = function(messages, roomName) {
//   var filteredMessages = _.filter(messages, function(message) {
//     return message.roomname === roomName;
//   });

//   displayMessages(filteredMessages);
// };

// var getRoomNames = function() {
//   $.ajax({
//     url: 'https://api.parse.com/1/classes/messages', 
//     type: 'GET',
//     contentType: 'application/JSON',
//     success: function(result) {
//       var messages = result['results'];
//       createRoomDropdown(messages);
//     },
//     error: function(data) {
//       console.log('What the French, toast?! The messages didn\'t load!', data);
//     }
//   });
// };

// var createRoomDropdown = function(messages) {
//   var roomsWithDups = _.pluck(messages, 'roomname');
//   var roomnameObject = {};
//   var rooms = [];

//   _.each(roomsWithDups, function(room) {
//     if (roomnameObject[room] === undefined && room !== '' && room !== undefined) {
//       roomnameObject[room] = true;
//       rooms.push(room);
//     }
//   });

//   // empty all rooms from dropdown
//   $('#roomSelect').empty();

//   // add rooms to dropdown menu
//   _.each(rooms, (room) => {
//     var $option = $(`<option class="room" value=${room}>${room}</option>`);
//     $option.appendTo('#roomSelect');
//   });
// };

// $(document).ready(function() {
//   $('#roomSelect').click(function() {
//     // getRoomNames();
    // grab room
//     // call display messages with roomname as arg
//   });
// });

// getMessages();
// getRoomNames();

