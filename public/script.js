$(document).ready(function() {
  var chatbox = $('#chatbox');

  // Send user message on form submit
  $('#input-form').submit(function(event) {
    event.preventDefault();
    var inputBox = $('#input-box');
    var message = inputBox.val();
    sendMessage(message, true);
    inputBox.val('');
  });

  // Send message to OpenAI and display response
  function sendMessage(message, isUser) {
    if (isUser) {
      displayMessage(message, true);
    }
    $.ajax({
      url: '/api/openai',
      type: 'POST',
      dataType: 'json',
      data: {message: message},
      success: function(data) {
        var response = data.response;
        displayMessage(response, false);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus + ': ' + errorThrown);
      }
    });
  }

  // Display message in chatbox
  function displayMessage(message, isUser) {
    var messageClass = isUser ? 'user-message' : 'bot-message';
    var senderName = isUser ? 'You' : 'Bot';
    var messageHTML = '<div class="message"><strong>' + senderName + ': </strong><span class="' + messageClass + '">' + message + '</span></div>';
    chatbox.append(messageHTML);
    chatbox.scrollTop(chatbox.prop("scrollHeight"));
  }
});
