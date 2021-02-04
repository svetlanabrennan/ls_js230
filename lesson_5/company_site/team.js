$(function () {
  $('li a').on("click", function (event) {
    event.preventDefault();

    var href = $(this).attr('href');
    $('#modal a').attr('href', href);

    let image = $(this).children('img').attr('src');
    $('#modal img').attr('src', image);

    let name = $(this).children('img').attr('alt');
    $('#modal h3').text(name);

    let parent = $(this).parent().attr('data-team');

    let about = $('p').filter('[data-about=' + parent + ']').text();
    $('#modal p').text(about);

    $('#modal').show(200)
    $('#modal-layer').show(200);
  });

  $('#modal-layer, a.close').on('click', function (event) {
    event.preventDefault();

    $('#modal').hide(200);
    $('#modal-layer').hide(200);
  });
});