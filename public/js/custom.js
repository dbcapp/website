'use strict';

$(function() {
  $.ajaxSetup({
    contentType: "application/json; charset=UTF-8",
    dataType: "json"
  });


  function formatPeople (user) {
    console.log(user);
    var $template = $(
      '<span><img src="/assets/' + user.donator.picture.original.url + '" class="img-flag" /> ' + user.name + '</span>'
    );
    return $template;
  };

  $('.tags-tokenizer').select2({
    tags: true,
    tokenSeparators: [',', ' ']
  });

  $(".employeers-tokenizer").select2({
    ajax: {
      url: "/api/registration/donators",
      dataType: 'json',
      type: "GET",
      delay: 250,
      cache: true,
      processResults: function (data, params) {
        console.log(data, params);

        return {
          results: data.items
        };
      },
    },
    templateResult: formatPeople,
  });
});