'use strict';

$(function() {
  var App = App || {};

  App = {
    init: function() {
      this.login();
      this.register();
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
            localstorage.setItem('user', response.responseJSON.user);
          })
          .fail(function(response) {
            $('.helper-message').removeClass("bg-success").addClass("bg-danger").html(response.responseJSON.message);
          });
        }
        return false;
      })
    },
    register: function() {
      $('.tags-tokenizer').select2({
        tags: true,
        tokenSeparators: [',', ' ']
      });

      $('.register-organization').on('submit', function() {
        // remove all class
        $('.helper-message').removeClass("bg-danger").removeClass('bg-success').html("");

        var email = $('.register-organization').find('.email');
        var password = $('.register-organization').find('.password');
        var confirmPassword = $('.register-organization').find('.confirmPassword');
        var address = $('.register-organization').find('.address');
        var number = $('.register-organization').find('.number');
        var city = $('.register-organization').find('.city');
        var state = $('.register-organization').find('.state');
        var tags = $('.register-organization').find('.tags-tokenizer');
        var sendTags = tags.val().split(',');

        if( email.val() != "" || password.val() != "" || tags.val() != "") {
          $('.helper-message').addClass("bg-danger").html("Complete all fields");
        } else if (password.val() != confirmPassword.val()) {
          $('.helper-message').addClass("bg-danger").html("You password not match");
        } else {

          $.ajax({
            url: '/api/registration/organization',
            method: "POST",
            data: {
              email: email.val(),
              password: password.val(),
              organization: {
                address: address.val(),
                number: number.val(),
                city: city.val(),
                state: state.val(),
                tags: sendTags
              }
            }
          })
          .done(function(response) {
            window.location = "/register/organization/"+response.responseJSON.id;
          })
          .fail(function(response) {
            $('.helper-message').removeClass("bg-success").addClass("bg-danger").html(response.responseJSON.message);
          });

          return false;
        }

        return false;
      });

      $('.register-user').on('submit', function() {
        // remove all class
        $('.helper-message').removeClass("bg-danger").removeClass('bg-success').html("")

        var email = $(this).find('.email');
        var password = $(this).find('.password');
        var confirmPassword = $(this).find('.confirmPassword');

        if( email.val() != "" || password.val() != "") {
          $('.helper-message').addClass("bg-danger").html("Complete all data");
        } else if (password.val() != confirmPassword.val()) {
          $('.helper-message').addClass("bg-danger").html("You password not match");
        } else {
          $.ajax({
            url: '/api/registration/donator',
            method: "POST",
            data: {
              email: email.val(),
              password: password.val()
            }
          })
          .done(function(response) {
            $('.helper-message').removeClass("bg-danger").addClass("bg-success").html(response.responseJSON.message);
          })
          .fail(function(response) {
            $('.helper-message').removeClass("bg-success").addClass("bg-danger").html(response.responseJSON.message);
          });
        }
      });
    }
  };

  App.init();
});