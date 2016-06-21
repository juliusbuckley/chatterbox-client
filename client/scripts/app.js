var message1 = {
  username: 'Superman',
  text: 'Where is Lex Luthor?',
  roomname: 'Metropolis'
};

var getMessages = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages', 
    type: 'GET',
    contentType: 'application/JSON',
    success: function(result) {
      var messages = result['results'];
      displayMessages(messages);
    },
    error: function(data) {
      console.log('What the French, toast?! The messages didn\'t load!', data);
    }
  });
};

var postMessage = function(message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
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

var displayMessages = function(messageArray) {
  var $chats = $('#chats');

  // removes all messages before refresh
  $chats.empty();

  // add messages to #chats
  _.each(messageArray, function(message) {
    var text = 'Message: ' + message.text;
    var user = 'User: ' + message.username;
    var time = 'Time: ' + message.updatedAt;

    var $messageText = $('<div class="message"></div>');
    var $ul = $('<ul></ul>');
    var $lineUser = $('<li class="user"></li>').text(user).appendTo($ul);
    var $lineText = $('<li class="text"></li>').text(text).appendTo($ul);
    var $lineTime = $('<li class="time"></li>').text(time).appendTo($ul);

    $ul.appendTo($messageText);
    $messageText.prependTo($chats);
  });
};

var createMessage = function() {
  var $user = $('#user').val();
  var $text = $('#userMessage').val();

  var messageObject = {};
  messageObject['username'] = $user;
  messageObject['text'] = $text;
  messageObject['roomname'] = 'Gotham';

  postMessage(messageObject);
};

// var getRoomNames = function() {
//   $.ajax({
//     url: 'https://api.parse.com/1/classes/messages', 
//     type: 'GET',
//     contentType: 'application/JSON',
//     success: function(result) {
//       var messages = result['results'];
//       var roomnameObject = {};



//     },
//     error: function(data) {
//       console.log('What the French, toast?! The messages didn\'t load!', data);
//     }
//   });
// };






getMessages();

setInterval(function() {
  getMessages();
  console.log('refreshed!');  
}, 5000);

