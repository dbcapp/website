'use strict';

$(function() {
  var App = App || {};

  App = {
    init: function() {
      this.login();
    },
    login: function() {
      var email = $('.login').find('.email');
      var password = $('.login').find('.password');

      $('.login').on('submit', function() {
        if(email.val() == "" || email.val() == "") {
          $('.helper-message').addClass("bg-danger").html("Check you email and password")
        } else {
          $.ajax({
            url: '/api/auth',
            method: "POST",
            data: {email: email.val(), password: password.val()}
          })
          .done(function(response) {
            $('.helper-message').removeClass("bg-danger").addClass("bg-success").html(response.responseJSON.message);
            localstorage.setItem('token', response.responseJSON.token);
            localstorage.setItem('user', response.responseJSON.user)
          })
          .fail(function(response) {
            $('.helper-message').removeClass("bg-success").addClass("bg-danger").html(response.responseJSON.message);
          });
        }
        return false;
      })
    }
  };

  App.init();
});