$(function(){
  function buildHTML(message){
    let image = message.image ? `<img src= ${message.image}></img>` : ""

      let html = `<div class="message" data-id=${message.id}>

         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         ${image}
       </div>`
     return html;
   };
  $('#new_message').on('submit', function(e){
    e.preventDefault()
  let formData = new FormData(this);
  let url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $(".form__submit").prop("disabled", false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();

    })
    .fail(function(){
      alert('error');
    });
  });
  var reloadMessages = function() {
      let last_message_id = $(".message:last").data('id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        let insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function() {
        alert('error');
      });
  };
  setInterval(reloadMessages, 5000);
});