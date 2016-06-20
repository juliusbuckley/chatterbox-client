var getMessages = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages', 
    type: 'GET',
    contentType: 'application/JSON',
    success: function(result) {
      var messages = result['results'];

      displayMessages(messages);



      // console.log('Messages received.');
    },
    error: function(data) {
      console.log('failed message', data);
    }
  });
};

getMessages();

var displayMessages = function(messageArray) {
  _.each(messageArray, function(message) {
    var text = 'Message: ' + message.text;
    var user = 'User: ' + message.username;

    var $messageText = $('<div class="message"></div>');
    var $ul = $('<ul></ul>');
    var $lineUser = $('<li class="user"></li>').text(message.user).appendTo($ul);
    var $lineText = $('<li></li>').text(message.text).appendTo($ul);

    $ul.appendTo($messageText);
    $messageText.appendTo($('#chats'));
  });
};