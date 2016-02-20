'use strict';

$(function() {
  var App = App || {};

  $.ajaxSetup({
    contentType: "application/json; charset=UTF-8",
    dataType: "json"
  });

  App = {
    init: function() {
      this.login();
      this.register();
      this.updateOrganization();
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
            $('.helper-message').removeClass("bg-danger").addClass("bg-success").html(response.message);
            localstorage.setItem('token', response.token);
            localstorage.setItem('user', response.user);
          })
          .fail(function(response) {
            $('.helper-message').removeClass("bg-success").addClass("bg-danger").html(response.message);
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

        var name = $('.register-organization').find('.name');
        var email = $('.register-organization').find('.email');
        var password = $('.register-organization').find('.password');
        var confirmPassword = $('.register-organization').find('.confirmPassword');
        var nameOrganization = $('.register-organization').find('.name-organization');
        var address = $('.register-organization').find('.address');
        var number = $('.register-organization').find('.number');
        var city = $('.register-organization').find('.city');
        var state = $('.register-organization').find('.state');
        var tags = $('.register-organization').find('.tags-tokenizer');
        var sendTags = tags.val().split(',');

        if( email.val() == "" || password.val() == "" || tags.val() == "" || nameOrganization.val() == "") {
          $('.helper-message').addClass("bg-danger").html("Complete all fields");
        } else if (password.val() != confirmPassword.val()) {
          $('.helper-message').addClass("bg-danger").html("You password not match");
        } else {

          $.ajax({
            url: '/api/registration/organization',
            method: "POST",
            data: JSON.stringify({
              name: name.val(),
              email: email.val(),
              password: password.val(),
              organization: {
                name: nameOrganization.val(),
                address: address.val(),
                number: number.val(),
                city: city.val(),
                state: state.val(),
                tags: sendTags
              }
            })
          })
          .done(function(response) {
            window.location = "/register/organization/"+response.id;
          })
          .fail(function(response) {
            $('.helper-message').removeClass("bg-success").addClass("bg-danger").html(response.message);
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
            $('.helper-message').removeClass("bg-danger").addClass("bg-success").html(response.message);
          })
          .fail(function(response) {
            $('.helper-message').removeClass("bg-success").addClass("bg-danger").html(response.message);
          });
        }
      });
    },
    afterRegister: function() {

    }
  };

  App.init();
});