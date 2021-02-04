$(function () {
  $('li img').on('click', function (event) {
    event.preventDefault();
    let $newImage = $(this).attr('src');

    $('figure img').fadeOut(300);
    $('figure img').fadeIn(300, function () {
      $('figure img').attr('src', $newImage);
    });

    $('li.show').removeClass('show');
    $(this.closest('li')).addClass('show');
  });
});