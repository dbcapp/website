'use strict';

$(function() {
  $.ajaxSetup({
    contentType: "application/json; charset=UTF-8",
    dataType: "json"
  });

  $('.tags-tokenizer').select2({
    tags: true,
    tokenSeparators: [',', ' ']
  });

  $(".employeers-tokenizer").select2();

  $('.summernote').summernote({
    height: 400,
    toolbar: [
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontsize']]
    ]
  });

  if($('.count-commits').length > 0) {
    $.ajax({
      url: 'https://api.github.com/repos/dbcapp/website',
      type: 'GET'
    })
    .done(function(data) {
      console.log()
      $('.counter-stars').html(data.stargazers_count);
      $('.counter-forks').html(data.watchers_count);
    });

    $.ajax({
      url: 'https://api.github.com/repos/dbcapp/website/stats/contributors',
      type: 'GET'
    })
    .done(function(data) {
      var total = 0;

      data.forEach(function(item) {
        total += item.total;
      });

      $('.count-commits').html(total);
    });
  }
});