$(function () {
  let $images = $("#exotic_animals");
  $images.on("mouseover", "img", function () {
    let timer = setTimeout(function () {
      displayCaption($(this));
    }.bind(this), 2000);

    $images.on("mouseleave", "img", function () {
      if (timer) {
        clearTimeout(timer);
        $("figcaption").fadeOut(300);
      }

    })
  });

  let displayCaption = function ($image) {
    let $caption = $image.next("figcaption").fadeIn(300);
    $caption.css("position", "absolute");
  }

});