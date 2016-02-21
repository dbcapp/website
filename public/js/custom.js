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
});